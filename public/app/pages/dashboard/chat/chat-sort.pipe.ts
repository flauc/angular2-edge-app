import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../../../common/interfaces/user.interface';

@Pipe({name: 'chatSort'})
export class ChatSortPipe implements PipeTransform {
    transform(value: User[]): User[] {
        return value.sort((a, b) => {
            if (a.status === 'online' && b.status === 'offline') return -1;
            else if (a.status === 'offline' && b.status === 'online') return 1;
            else return 0;
        })
    }
}