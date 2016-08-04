# Server

The server for the Angular 2 Edge application is built in node.js and uses mongoDb. Server - Client communication is done primarily via web sockets but the server also 
provides a couple of HTTP Routes for demonstrational purposes.     

## HTTP API 

Base Url: `localhost:1000`

Route | Method | Request | Description
------------ | ------------- | ------------- | -------------
/api/login | POST | {username: string, password: string} | Returns the user along with the generated token
/api/sign-up | POST | {username: string, password: string} | Creates a user and logs him in
/api/users | GET | null | Returns a list of all users in the database
/api/rooms | GET | null | Returns a list of all rooms in the database
