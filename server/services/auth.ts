import * as jwt from 'jsonwebtoken';
import * as co from 'co';
import {validateFormat, required, default as DataValidationService} from './data-validation';
import {UserSignUp} from '../interfaces/user/user-sign-up';
import GeneralController from '../controllers/general';
import {config} from '../config/values.const';
import {userValidation} from '../interfaces/user/user.validation';

export default class AuthService {

    constructor(
        private coll
    ) {}

    @validateFormat(userValidation.signUp, true)
    generateToken(@required data: UserSignUp) {

        return new Promise((resolve, reject) => {

            let self = this;

            co(function *() {

                // Find the user
                let user;
                try {
                    user = yield GeneralController.get(self.coll, {email: data.email}, false);
                } catch (err) {
                    throw new Error('Wrong email and password combination.');
                }

                try {
                    yield DataValidationService.checkPassword(user[0].password, data.password)
                } catch (err) {
                    throw new Error('Wrong email and password combination.');
                }

                let token;

                try {
                    token = yield ywtSignPromise({email: user[0].email, _id: user[0]._id, role: user[0].role}, {expiresIn: '100d'})
                } catch (err) {
                    throw new Error('Wrong email and password combination.');
                }

                delete user[0].password;

                return resolve({user: user, token: token});

            })
                .catch(err => reject(err))
        })
    }

    hasRole(role: string, token: string) {
        return new Promise((resolve, reject) => {
            jwtVerifyPromise(token)
                .then(data => {
                    if (role === '*') return resolve();
                    return data.role === role ? resolve() : reject()
                })

                .catch(err => reject(err))
        })
    }

    isCurrentUser(id: string, token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            jwtVerifyPromise(token)
                .then(data => id === data._id ? resolve() : reject())
                .catch(err => reject(err))
        })
    }
}

export function ywtSignPromise(data: any, settings: any): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.sign(data, config.authSecret, settings, (err, token) => {
            if (err) return reject(err);
            return resolve(token)
        });
    })
}

export function jwtVerifyPromise(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.authSecret, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded)
        })
    })
}