import {Task} from './task.interface';

export interface Room {
    _id?: string
    createdBy?: string
    tasks?: Task
    name: string
    description: string
}