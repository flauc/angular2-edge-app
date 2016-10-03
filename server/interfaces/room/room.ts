import {ObjectID} from 'mongodb';
import {Task} from './task';

export interface Room {
    _id?: ObjectID | string
    createdBy: ObjectID | string
    name: string
    description: string
    tasks?: Task[]
}