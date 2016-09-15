import {unpackToken} from './auth'
import {updateUser} from '../controllers/user'
import {createRoom, delRoom, addTask, updateTask, deleteTask} from '../controllers/rooms.controller';

export default class SocketConfig {

    constructor(io) {
        io.on('connection', (socket) => {
            
            let user;

            socket.on('validate', (info, fn) => {
                unpackToken(info.token).then(
                    res => {
                        // Add the user to the list of validated users
                        updateUser({_id: res['_id'], status: 'online'}).then(
                            res => {

                                // Emit to other listeners that the user has come online
                                socket.broadcast.emit('client', {command: 'userStatus', data: {username: res['username'], status: 'online'}});
                                user = res;

                                fn({success: true, data: {username: res['username'], status: 'online'}})
                            }
                        )
                    },
                    err => fn({success: false, error: err})

                )
            });

            socket.on('server', (info, fn) => {
                if (user) {
                    switch (info.command) {
                        case 'roomCreate':

                            // Add the user
                            info.data.createdBy = user;

                            createRoom(info.data)
                                .then(res => {
                                    fn({success: true, data: res});
                                    socket.broadcast.emit('client', {
                                        success: true,
                                        command: 'roomCreated',
                                        by: user._id,
                                        data: res
                                    })
                                })
                                .catch(err => fn({success: false, error: err}));
                            break;
                        
                        case 'roomDelete':
                            if (info.data.createdBy.username === user.username) {
                                delRoom(info.data._id)
                                    .then(res => {
                                        fn({success: true, data: res});
                                        socket.broadcast.emit('client', {
                                            success: true,
                                            command: 'roomDeleted',
                                            by: user._id,
                                            data: res
                                        })
                                    })
                                    .catch(err => fn({success: false, error: err}));
                            }
                            
                            else fn({success: false, error: 'You dont have permission to do that'});
                            
                            break;    
                        
                        case 'taskCreate':

                            addTask(info.data.roomName, { name: info.data.name, createdBy: user})
                                .then(res => {
                                    fn({success: true, data: res});
                                    socket.broadcast.emit('client', {
                                        success: true,
                                        command: 'taskCreated',
                                        by: user._id,
                                        toRoom: info.data.roomName,
                                        data: res
                                    })
                                })
                                .catch(err => fn({success: false, error: err}));
                            break;

                        case 'taskUpdate':

                            updateTask(info.data.roomName, info.data.task)
                                .then(res => {
                                    fn({success: true, data: res});
                                    socket.broadcast.emit('client', {
                                        success: true,
                                        command: 'taskUpdated',
                                        by: user._id,
                                        toRoom: info.data.roomName,
                                        data: res
                                    })
                                })
                                .catch(err => fn({success: false, error: err}));
                            break;
                        case 'taskDelete':
                            deleteTask(info.data.roomName, info.data.taskId)
                                .then(res => {
                                    fn({success: true, data: res});
                                    socket.broadcast.emit('client', {
                                        success: true,
                                        command: 'taskDeleted',
                                        by: user._id,
                                        toRoom: info.data.roomName,
                                        data: res
                                    })
                                })
                                .catch(err => fn({success: false, error: err}));
                            break;

                    }   
                }

                else fn({success: false, error: 'You dont have permission to do that.'})
            });

            socket.on('disconnect', () => {
                if (user)
                    updateUser({_id: user._id, status: 'offline'})
                        .then(res => socket.broadcast.emit('client', {command: 'userStatus', data: {username: res['username'], status: 'offline'}}))
            });


        });
    }
}