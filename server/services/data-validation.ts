import * as bcrypt from 'bcrypt-nodejs';
import 'reflect-metadata';

export default class DataValidationService {

    static isRightFormat(receivedObject, expectedFormat, hasAll: boolean): boolean | string {

        let acum = [];

        function validate(object, format, containsAll) {
            for (let key in format) {
                acum.push(key);
                if ((object[key] === undefined || object[key] === null) && !format[key].optional && containsAll) return `${key} is missing.`;
                else if (object[key] !== undefined && object[key] !== null && format[key]['type'] !== 'any') {

                    if (format[key]['type'] === 'array') {

                        if (typeof format[key].arrayType === 'object') {
                            if (typeof object[key] !== 'object') return `${key} is not an array.`;

                            for (let i = 0; i < object[key].length; i++) {
                                let temp = validate(object[key][i], format[key].arrayType, containsAll);
                                if (temp !== true) return temp

                            }
                        }
                        else if (!Array.isArray(object[key]) && typeof object[key] !== format[key].arrayType) return `${key} is in the wrong format. It's a ${typeof object[key]} but should be a ${format[key].arrayType}`;
                        else for (let i = 0; i < object[key].length; i++) if (typeof object[key][i] !== format[key].arrayType) return `${key} should be an array of ${format[key].arrayType}s.`
                    }

                    else if (typeof object[key] === 'object') {
                        let temp = validate(object[key], format[key], containsAll);
                        if (temp !== true) return temp
                    }

                    else if (format[key].type === 'enum') {
                        let valid = false;
                        format[key].valid.forEach(a => {
                            if (object[key] === a) valid = true;
                        });
                        if (!valid) return `${key} should have one of the following values: ${format[key].valid}`
                    }

                    else if (typeof object[key] !== format[key].type) return `${key} is in the wrong format. It's a ${typeof object[key]} but should be a ${format[key].type}`;
                    else if (format[key].regEx && !format[key].regEx.test(object[key])) return `${key} is in the wrong format. It doesn't match this regular expression test ${format[key].regEx}`;
                }

            }

            return true;
        }

        function checkExtra(obj): boolean | string {
            for (let key in obj) {
                if (typeof obj[key] === 'object') checkExtra(obj[key]);
                else if (acum.indexOf(key) === -1) return `${key} is not allowed.`;
            }

            return true;
        }

        let validationTest = validate(receivedObject, expectedFormat, hasAll);

        if (validationTest !== true) return validationTest;

        let noExtras = checkExtra(receivedObject);

        if (noExtras !== true) return noExtras;

        return true;
    };

    static hashPass(pass): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(pass, null, null, (err, hash) => {
                if (err) return reject(err);
                return resolve(hash);
            });
        })
    };

    static checkPassword(userPassword, receivedPassword: string): Promise<any> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(receivedPassword, userPassword, function (err, res) {
                if (err || !res) return reject();
                return resolve()
            });
        })
    }
}

const requiredMetadataKey = Symbol('required');

export function validateFormat(format: any, all?: boolean) {
    return function (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
        let method = descriptor.value;
        descriptor.value = function () {
            let test = DataValidationService.isRightFormat(arguments['0'], format, all);
            if (test !== true) return Promise.reject(test);
            return method.apply(this, arguments);
        }
    }
}

export function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}