import * as mongodb from 'mongodb'
import {config} from './config'
import {MongoError} from 'mongodb';
import DataValidationService from '../services/data-validation';
import UsersController from '../controllers/user';

export default class Mongo {
    static init(): Promise<MongoError | any> {
        return new Promise((resolve, reject) => {
            let server = new mongodb.Server(config.mongo.server, config.mongo.port, {});
            new mongodb.Db(config.appName, server, {w: 1}).open((err, client) => {
                if (err) return reject(err);

                const user = new UsersController(client.collection('users'));

                user.get()
                    .then(data => {
                        // If there are no users create initial
                        if (!data.length) {
                            console.log('Creating administrator');

                            return Promise.all([
                                user.signUp({email: 'filip.lauc93@gmail.com', profileImage: 1, password: 'filip'}),
                                user.signUp({email: 'wojtek.kwiatek@gmail.com', profileImage: 2, password: 'wojtek'}),
                                user.signUp({email: 'laco0416@gmail.com', profileImage: 3, password: 'suguru'}),
                                user.signUp({email: 'mgualtieri7@gmail.com', profileImage: 4, password: 'mary'}),
                                user.signUp({email: 'ran.wahle@gmail.com', profileImage: 5, password: 'ran'})
                            ])

                        }

                        return resolve(client)
                    })
                    .then(res => resolve(client))
                    .catch(err => reject(err));
            });
        })
    };

    static createId = (id?: string): any =>  new mongodb.ObjectID(id)
}