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
                {username: 'filip.lauc93@gmail.com', password: 'filip', status: 'offline', profileImage: 0},
                {username: 'wojtek.kwiatek@gmail.com', password: 'wojtek', status: 'offline', profileImage: 0},
                {username: 'laco0416@gmail.com', password: 'suguru', status: 'offline', profileImage: 0},
                {username: 'mgualtieri7@gmail.com', password: 'mary', status: 'offline', profileImage: 0},
                {username: 'ran.wahle@gmail.com', password: 'ran', status: 'offline', profileImage: 0}
            ];

            for (let i = 0; i < users.length; i++) {
                users[i].profileImage = generateRandomInt(1, 49);
                users[i].password = yield hashPass(users[i].password);
            }

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

export function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
