const base = 'http://46.101.114.89/';

export const urlValues = {
    login: `${base}api/login`,
    signUp: `${base}api/sign-up`,
    getUsers: `${base}api/users`,
    getRooms: `${base}api/rooms`
};

export const appValues = {
    name: 'angular2-edge-app'
};

export const socketValues = {
    url: base,
    
    // Commands
    roomCreate: 'roomCreate'
};