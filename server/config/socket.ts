import {unpackToken} from './auth'
import {updateUser} from '../controllers/users.controller'
import {createRoom} from '../controllers/rooms.controller';

export default class SocketConfig {

    constructor(io) {
        io.on('connection', (socket) => {

            let user;

            socket.on('validate', (info, fn) => {
                unpackToken(info.token).then(
                    res => {
                        // Add the user to the list of validated users
                        updateUser({_id: res._id, status: 'online'}).then(
                            res => {

                                // Emit to other listeners that the user has come online
                                socket.broadcast.emit('client', {command: 'userStatus', data: {username: res.username, status: 'online'}});
                                user = res;

                                fn({username: res.username, status: 'online'})
                            }
                        )
                    },
                    err => fn(err)

                )
            });

            socket.on('server', (info, fn) => {
                if (user) {
                    switch (info.command) {
                        case 'roomCreate':

                            // Add the user
                            info.data.createdBy = user;

                            createRoom(info.data).then(
                                res => {
                                    fn({success: true, data: res});
                                    socket.broadcast.emit('client', {
                                        success: true,
                                        command: 'projectCreated',
                                        by: user._id,
                                        data: res
                                    })
                                },

                                err => fn({success: false, error: err})
                            );
                            break;
                    }   
                }

                else fn({success: false, error: 'You dont have permission to do that.'})
            });

            socket.on('disconnect', () => {
                updateUser({_id: user._id, status: 'offline'}).then(
                    res => socket.broadcast.emit('client', {command: 'userStatus', data: {username: res.username, status: 'offline'}})
                )
            });


        });
    }
}