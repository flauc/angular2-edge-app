# Developing an Angular 2 edge Application

This application serves as an example for creating an Angular 2 application. The repository also contains the server side code.
The app features:

* Token based authentication
* Authorization
* Simple routing
* Http and web socket communication
* CRUD operations
* "Real time" chat

## Requirements

To start the application you need the following installed:
 * Node
 * MongoDB

It's also easier if you have the following npm libraries installed globally:

* typescript
* typings
* gulp

## Server Documentation

You can find the documentation for the server here [here](https://github.com/flauc/angular2-edge-app/blob/master/serverDoc.md).

## Set Up

To build the application run the following commands:
```
npm install
gulp build-dev
```

Once built you can start the server and database with `npm start` or if you have a mongo server already running, just run `npm run server`