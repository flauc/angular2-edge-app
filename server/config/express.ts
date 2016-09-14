import * as bodyParser from 'body-parser';
import * as express from 'express';
import {config} from './config';

export default class ExpressConfig {
    constructor(app) {
        app.use('/', express.static(config.staticPath));
        app.use('/node_modules', express.static(config.nodeModulesPath));
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    }
}