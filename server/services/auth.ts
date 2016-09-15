import * as jwt from 'jsonwebtoken';
import {validateFormat, required, default as DataValidationService} from './data-validation';
import GeneralController from '../controllers/general';
import {userValidation} from '../interfaces/user/user.validation';
import {UserSignUp} from '../interfaces/user/user';
import {config} from '../config/config';

export default class AuthService {

    constructor(
        private coll
    ) {}

    @validateFormat(userValidation.signUp, true)
    generateToken(@required data: UserSignUp) {

        return new Promise((resolve, reject) => {
            let user;

            // Find the user
            return GeneralController.get(this.coll, {email: data.email}, false)
                .then(res => {
                    user = res[0];
                    return DataValidationService.checkPassword(user.password, data.password)
                })
                .catch(err => reject('Wrong email and password combination.'))
                .then(res => {
                    // Remove the password
                    delete user.password;
                    return ywtSignPromise({email: user.email, _id: user._id, role: user.role}, {expiresIn: '100d'})
                })
                .then(res => resolve({user: user, token: res}))
                .catch(err => reject(err));
        })
    }
}

export function ywtSignPromise(data: any, settings: any): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.sign(data, config.appSecret, settings, (err, token) => {
            if (err) return reject(err);
            return resolve(token)
        });
    })
}

export function jwtVerifyPromise(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.appSecret, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded)
        })
    })
}