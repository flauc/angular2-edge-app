import {ObjectID} from 'mongodb';

export interface User {
    _id?: ObjectID | string
    email: string
    password?: string
}

export interface UserSignUp {
    email: string
    password: string
}