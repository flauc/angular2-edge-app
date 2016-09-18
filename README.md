# Developing an Angular 2 edge Application

This application serves as an example for creating a basic Angular 2 application. The application was built as an example application for the Developing an Angular 2 Edge book.

The repository also contains the server side code.

## Features

* Token based authentication
* Authorization
* Simple routing
* Http and web socket communication
* CRUD operations
* "Real time" chat

## Requirements

To start the application you need the following installed on your machine:

 * Node
 * MongoDB

You should also have the following npm libraries installed globally:

* typescript
* typings
* tslint
* gulp

## Set Up

To build the application run the following command in your console window when in the root of the project:  
```
npm install
```

This installs all of the application dependencies from `npm`.
Now we need to compile `.ts` and `.styl` files. To do this run the following command: 

```
gulp dev-build
```

**note:** You might get a lot of errors and warnings depending on your development environment, but the compilation tasks most likely finished successfully.  

Once built you can start the server and database with `npm start` or if you have a mongo server already running ( if you're running linux or a mac machine this might be the case ), just run `npm run server`.

## Server

The server for the Angular 2 Edge application is built in node.js and uses mongoDb. Server - Client communication is done primarily via web sockets but the server also 
provides a couple of HTTP Routes for demonstrational purposes.     

### HTTP API 

The API primarily handles JSON data.

**Base Url:** `localhost:2000`

Route | Method | Request | Description
------------ | ------------- | ------------- | -------------
/api/authorize | POST | {email: string, password: string} | Returns the user along with the generated token
/api/sign-up | POST | {email: string, password: string, profileImage: number} | Registers a new user
/api/users | GET | null | Returns a list of all users in the database
/api/rooms | GET | null | Returns a list of all rooms in the database
