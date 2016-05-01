const mongo = require('../config/mongo'),
    colName = 'rooms';

export function getRooms(searchCriteria?: Object) {
    return new Promise((resolve, reject) => {

        let coll = mongo.client.collection(colName),
            search = {};

        // Add criteria if any were sent
        if (searchCriteria) search = searchCriteria;


        coll.find(search).toArray(function(err, docs) {
            if (err) reject(err);
            else if (docs.length === 0) resolve([]);
            else {

                // Remove the fields that should not be sent
                docs.forEach(a => {
                    delete a['__v'];
                });

                resolve(docs)
            }

        })
    })
}

export function createRoom(data) {
    return new Promise((resolve, reject) => {

        let coll = mongo.client.collection(colName);

        // Create empty field for tasks and users
        data.tasks = [];
        data.users = [];

        coll.insertOne(data, function(err, r) {
            if (err) reject(err);
            else if (r.insertedCount !== 1) reject('Error in mongo insert');
            else resolve(r.ops[0])
        })
    })
}

export function updateRoom(sent) {
    return new Promise((resolve, reject) => {

        let coll = mongo.client.collection(colName),
            id = mongo.createId(sent._id),
            toSet = sent;

        // Remove the id from the setter
        delete toSet['_id'];

        coll.findOneAndUpdate(
            {_id: id},
            {$set: toSet}, {
                // This makes sure that the updated document is returned
                returnOriginal: false,

                // Defines which fields should not be returned
                projection: {
                    __v: 0
                }
            },
            (err, r) => {
                if (err) reject(err);
                else if (r.lastErrorObject.n !== 1) reject('An error with edit.');
                else resolve(r.value)
            }
        );
    })
}


export function delRoom(id: string) {
    return new Promise((resolve, reject) => {
        let coll = mongo.client.collection(colName),
            mongoId = mongo.createId(id);

        coll.findOneAndDelete(
            {_id: mongoId},
            {
                // Defines which fields should not be returned
                projection: {
                    __v: 0
                }
            },
            (err, r) => {
                if (err) reject(err);
                else resolve(r.value)
            }
        );
    })
}

export function addUser(roomName: string, user: any) {
    return new Promise((resolve, reject) => {

        let coll = mongo.client.collection(colName);

        coll.findOneAndUpdate(
            {name: roomName},
            {$push: {users: user}},
            {
                // This makes sure that the updated document is returned
                returnOriginal: false,
            },
            (err, r) => {
                if (err) reject(err);
                else if (r.lastErrorObject.n !== 1) reject('An error with adding the user to the room.');
                else resolve(r.value.users)
            }
        )

    })
}

export function addTask(roomName: string, task: any) {
    return new Promise((resolve, reject) => {

        let coll = mongo.client.collection(colName);

        task._id = mongo.createId();
        task.complete = false;

        coll.findOneAndUpdate(
            {name: roomName},
            {$push: {tasks: task}},
            {
                // This makes sure that the updated document is returned
                returnOriginal: false,
            },
            (err, r) => {
                if (err) reject(err);
                else if (r.lastErrorObject.n !== 1) reject('An error with adding the user to the room.');
                else resolve(r.value.tasks.find(a => a._id.equals(task._id)))
            }
        )

    })
}

export function updateTask(roomName: string, data) {
    return new Promise((resolve, reject) => {
        let coll = mongo.client.collection(colName),
            keys = Object.keys(data),
            setObj = {};

        keys.forEach(a => {
            if (a !== '_id') setObj[`tasks.$.${a}`] = data[a];
        });

        coll.findOneAndUpdate(
            {name: roomName, 'tasks._id': mongo.createId(data._id)},
            {$set: setObj},
            {
                // This makes sure that the updated document is returned
                returnOriginal: false,

                // Defines which fields should not be returned
                projection: {
                    __v: 0
                }
            },
            (err, r) => {
                if (err) reject(err);
                else if (r.lastErrorObject.n !== 1) reject('An error with task edit.');
                else resolve(r.value.tasks.find(a => a._id.equals(mongo.createId(data._id))))
            }
        );
    })
}