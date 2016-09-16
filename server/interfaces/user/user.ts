import {ObjectID} from 'mongodb';

export interface User {
    _id?: ObjectID | string
    email: string
    password?: string
    profileImage: number
}

export interface UserSignUp {
    email: string
    password: string
    profileImage: number
}