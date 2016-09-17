import {User} from './user.interface';

export interface Message {
    _id: string
    createdBy: string | User
    message: string
}