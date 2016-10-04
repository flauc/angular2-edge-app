import {appValues} from './app.values';
const base = 'http://localhost:5000/';

export const urlValues = {
    login: `${appValues.base}api/authorize`,
    signUp: `${appValues.base}api/sign-up`,
    getUsers: `${appValues.base}api/users`,
    getRooms: `${appValues.base}api/rooms`
};
