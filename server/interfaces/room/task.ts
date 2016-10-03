import {ObjectID} from 'mongodb';

export interface Task {
    _id?: string | ObjectID
    name?: string
    complete: boolean
}