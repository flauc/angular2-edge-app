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

                            Promise.all([
                                DataValidationService.hashPass('filip'),
                                DataValidationService.hashPass('wojtek'),
                                DataValidationService.hashPass('suguru'),
                                DataValidationService.hashPass('mary'),
                                DataValidationService.hashPass('ran')
                            ])
                                .then(res => Promise.all([
                                    user.create({email: 'filip.lauc93@gmail.com', profileImage: 0, password: res[0]}),
                                    user.create({email: 'wojtek.kwiatek@gmail.com', profileImage: 1, password: res[1]}),
                                    user.create({email: 'laco0416@gmail.com', profileImage: 2, password: res[3]}),
                                    user.create({email: 'mgualtieri7@gmail.com', profileImage: 3, password: res[4]}),
                                    user.create({email: 'ran.wahle@gmail.com', profileImage: 4, password: res[5]})
                                ]))
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