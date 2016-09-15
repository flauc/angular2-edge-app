import {Room} from '../interfaces/room/room';
import {Task} from '../interfaces/room/task';
import GeneralController from './general';
import {roomValidation} from '../interfaces/room/room.validation';
import {validateFormat, required} from '../services/data-validation';
import Mongo from '../config/mongo';

export default class RoomsController {

    constructor(private coll) {}

    get(): Promise<Room[]> {
        return GeneralController.get(this.coll, {}, true)
    }

    @validateFormat(roomValidation.create, true)
    create(@required room: Room): Promise<Room> {
        return GeneralController.create(this.coll, room)
    }

    @validateFormat(roomValidation.delete, true)
    delete(@required item: any): Promise<Room> {
        return GeneralController.delete(this.coll, {_id: item._id}, false)
    }

    @validateFormat(roomValidation.addTask, true)
    addTask(@required task: Task): Promise<Room> {
        return GeneralController.update(this.coll, {_id: task._id}, {$push: {_id: Mongo.createId(), name: task.name}})
    }

    @validateFormat(roomValidation.removeTask, true)
    removeTask(@required item: any): Promise<Room> {
        return GeneralController.update(this.coll, {_id: item.roomId}, {$pull: {_id: item.taskId}})
    }

    @validateFormat(roomValidation.editTask)
    editTask(@required item: any): Promise<Room> {
        return GeneralController.update(this.coll, {_id: item.roomId, 'tasks._id': item.taskId}, { $set: { 'tasks.$.complete': item.complete }})
    }
}