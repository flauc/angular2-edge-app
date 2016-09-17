import {Task} from './task.interface';

export interface Room {
    _id: string
    createdBy: string
    name: string
    description: string
    tasks: Task
}