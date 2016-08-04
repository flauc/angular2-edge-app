import * as express from 'express'
import * as bodyParser from 'body-parser'


export default class ExpressConfig {
    constructor(app, config) {
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        app.use('/', express.static(config.staticPath));
        app.use('/node_modules', express.static(config.nodeModulesPath));

        app.use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', `${config.domain}:${config.port}`);

                res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                next();
            }
        );
    }
}