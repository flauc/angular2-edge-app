import GeneralController from './general';
import DataValidationService from '../services/data-validation';
import {validateFormat} from '../services/data-validation';
import {required} from '../services/data-validation';
import {User, UserSignUp} from '../interfaces/user/user';
import {userValidation} from '../interfaces/user/user.validation';

export default class UsersController {

    constructor(private coll) {}

    get(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            GeneralController.get(this.coll, {}, true)
                .then(res => {
                    res.forEach(a => delete a.password);
                    return resolve(res)
                })
                .catch(err => reject(err))
        })
    }

    @validateFormat(userValidation.signUp, true)
    signUp(@required user: UserSignUp): Promise<User> {
        return new Promise((resolve, reject) => {
            GeneralController.get(this.coll, {email: user.email}, true)
                .then(res => {
                    if (res[0]) return reject(`This email is already in use.`);
                    return DataValidationService.hashPass(user.password);
                })
                .then(password => GeneralController.create(this.coll, Object.assign(user, {role: 'user', password: password})))
                .then(data => {
                    delete data.password;
                    return resolve(data);
                })
                .catch(err => reject(err || 'An error with righting to the database.'));
        })
    }

    @validateFormat(userValidation.create, true)
    create(@required user: User): Promise<User> {
        return GeneralController.create(this.coll, user)
    }

    @validateFormat(userValidation.update, false)
    update(@required user: any): Promise<User>  {
        let toSet = Object.assign({}, user);
        delete toSet['_id'];
        return GeneralController.update(this.coll, {_id: user._id}, {$set: toSet})
    }

    @validateFormat(userValidation.delete, true)
    delete(@required item: any): Promise<User> {
        return GeneralController.delete(this.coll, {_id: item._id}, false)
    }
}