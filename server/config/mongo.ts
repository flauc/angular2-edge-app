import * as mongodb from 'mongodb'
import {config} from './config'
import {createDefaultDbDocs} from '../helpers/commonHelpers'

module.exports.createId = function (id?) {
    return new mongodb.ObjectID(id);
};

module.exports.init = function (callback) {
    let server = new mongodb.Server('127.0.0.1', 27017, {});
    new mongodb.Db(config.appName, server, {w: 1}).open(function (error, client) {

        createDefaultDbDocs(client);

        // export the client and maybe some collections as a shortcut
        module.exports.client = client;

        callback(error);
    });
};