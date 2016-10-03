export const userValidation = {
    signUp: {
        email: {type: 'string', regEx: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')},
        password: {type: 'string'},
        profileImage: {type: 'number'}
    },

    logIn: {
        email: {type: 'string', regEx: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')},
        password: {type: 'string'},
    },

    update: {
        _id: {type: 'string'},
        email: {type: 'string', regEx: new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')},
        password: {type: 'string'}
    },

    delete: {
        _id: {type: 'string'}
    }
};