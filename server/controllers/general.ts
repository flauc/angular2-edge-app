import Mongo from '../config/mongo';

export default class GeneralController {
    static get(coll: any, query?: any, alwaysResolve?: boolean, preventParseId?: boolean): Promise<any> {
        return new Promise((resolve, reject) => {

            let search = {};

            if (!preventParseId) {
                Object.keys(query).forEach(a => {
                    if (a === '_id' || a.slice(-3) === '_id') query[a] = Mongo.createId(query[a])
                });
            }

            // Add criteria if any were sent
            if (query) search = query;

            return coll.find(search).toArray()
                .then(res => {
                    if (!res.length) {
                        if (alwaysResolve) return resolve(res);
                        else return reject(`Not found`)
                    }
                    return resolve(res)
                })
                .catch(err => reject(err))
        })
    }

    static create(coll: any, data: any, options?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            return coll.insertOne(data, options)
                .then(res => {
                    if (res.insertedCount !== 1) return reject('An error with righting to the database.');
                    return resolve(res.ops[0])
                })
                .catch(err => reject(err))
        })
    }

    static update(coll: any, query: any, data: any, options?: any): Promise<any> {
        return new Promise((resolve, reject) => {

            Object.keys(query).forEach(a => {
                if (a === '_id') query[a] = Mongo.createId(query[a])
            });

            // Make sure we don't try to set an empty object
            if (data.$set && Object.keys(data.$set).length === 0) return resolve();

            let defaultOptions = Object.assign({
                returnOriginal: false
            }, options);

            return coll.findOneAndUpdate(query, data, defaultOptions)
                .then(res => {
                    if (res.lastErrorObject.n !== 1) return reject('An error with edit.');
                    return resolve(res.value)
                })
                .catch(err => reject(err))
        })
    }

    static delete(coll: any, query: any, multi?: boolean): Promise<any> {
        return new Promise((resolve, reject) => {
            if (query.hasOwnProperty('_id')) {
                if (Array.isArray(query._id)) query._id.map(a => Mongo.createId(a));
                else query._id = Mongo.createId(query._id)
            }

            let toUse = multi ? coll.deleteMeny(query) : coll.deleteOne(query);

            toUse
                .then(res => {
                    if (!res.result.n) return reject(`Not all entries got deleted`);
                    return resolve({removed: query});
                })
                .catch(err => reject(err))
        })
    }
}