import * as jwt from 'jsonwebtoken'
import {getUsers} from '../controllers/users.controller'
import {config} from './config'
import {checkPassword} from '../helpers/commonHelpers';

export function login(req, res) {
    getUsers({username: req.body.username}, true)
        // Check if the user has a valid password
        .then(user => {
            return {
                username: user[0].username,
                password: user[0].password,
                profileImage: user[0].profileImage,
                _id: user[0]._id,
                receivedPass: req.body.password
            }
        })
        .catch(() => {
            res.status(401).send({
                success: false,
                error: 'Authentication failed. User not found.'
            });
        })
        .then(user => checkPassword(user))
        .then((user) => {
            // create the jwt token and add the username and _id
            let token = jwt.sign({username: user['username'], _id: user['_id']}, config.appSecret, {expiresIn: '1y'});
            // return the information including token as JSON
            res.json({
                success: true,
                data: {username: user['username'], _id: user['_id'], profileImg: user['profileImage']},
                token: token
            });
        })
        // Return error if a bad password was sent
        .catch(() => { res.status(401).send({ success: false, error: 'Wrong username and password combination.' })})
}

export function loginAfterReg(data) {
    return new Promise((resolve, reject) => {
        // Only done to check that everything works properly
        getUsers({_id: data._id}, true)
            .catch((err) => reject(err))
            .then(() => {
                resolve({
                    success: true,
                    data: {username: data.username, _id: data._id},
                    token: jwt.sign({username: data.username, _id: data._id}, config.appSecret, {expiresIn: '1y'})
                })
            })
    })
}

// Unpack token
export function unpackToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.appSecret, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded)
        })  
    })
}