import {Task} from './task.interface';
import {User} from './user.interface';

export interface Room {
    _id?: string
    createdBy?: string | User
    tasks?: Task[]
    name: string
    description: string
}