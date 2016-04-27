import * as bcrypt from 'bcrypt-nodejs'
import * as co from 'co'

// Creates Default
export function createDefaultDbDocs(db) {
    co(function *() {
        let users = yield db.collection('users').find({}).toArray();

        // If the users array is empty
        if (users.length === 0) {

            console.log('No users in the database. Creating default users now...');

            let users = [
                {username: 'filip.lauc93@gmail.com', password: 'Filip1!', status: 'offline'},
                {username: 'wojtek.kwiatek@gmail.com', password: 'Wojtek1!', status: 'offline'},
                {username: 'laco0416@gmail.com', password: 'Suguru!', status: 'offline'}
            ];
            
            users.forEach(a => {
                co(function *() {
                    a.password = yield  hashPass(a.password)
                });
            });

            let r = yield db.collection('users').insertMany(users);
            
            if (r.insertedCount === 3) console.log('...users created successfully.')

        }
    }).catch((err) => console.log(err))
}


// Hash a password
export function hashPass(pass) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pass, null, null, (err, hash) => {
            if (err) reject(err);
            else resolve(hash);
        });
    })
}

// Checks the user password with bcrypt
export function checkPassword(user) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(user.receivedPass, user.password, function (err, res) {
            if (err || !res) reject();
            else {
                delete user['receivedPass'];
                resolve(user)
            }
        });
    })
}
