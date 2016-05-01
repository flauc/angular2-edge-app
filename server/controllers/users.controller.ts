import {hashPass} from '../helpers/commonHelpers';

const mongo = require('../config/mongo'),
    colName = 'users';

// Get one or more users
// If no search criteria is found the function fetches all of the users
export function getUsers(searchCriteria?: Object, sendPass?: boolean) {
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
                    if (!sendPass) delete a['password'];
                    delete a['__v'];
                });

                resolve(docs)
            }

        })
    })
}

// Create a single user
export function createUser(data) {
    return new Promise((resolve, reject) => {

        let coll = mongo.client.collection(colName);

        hashPass(data.password).then(
            res => {

                data.password = res;

                coll.insertOne(data, (err, r) => {
                    if (err) reject(err);
                    else if (r.insertedCount !== 1) reject('Error in user insert');
                    else {
                        delete r.ops[0].password;
                        resolve(r.ops[0])
                    }
                })
            },

            err => reject(err)
        )
    })
}

// Updates a single user
export function updateUser(sent) {
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
                    password: 0,
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

// Deletes a single user
export function delUser(id) {
    return new Promise((resolve, reject) => {

        let coll = mongo.client.collection(colName);


        coll.findOneAndDelete(
            {_id: id},
            {
                // Defines which fields should not be returned
                projection: {
                    password: 0,
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