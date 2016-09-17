export const roomValidation = {
    create: {
        name: {type: 'string'},
        description: {type: 'string'},
        createdBy: {type: 'string'}
    },

    addTask: {
        name: {type: 'string'}
    },

    editTask: {
        roomId: {type: 'string'},
        taskId: {type: 'string'},
        complete: {type: 'boolean'}
    },

    removeTask: {
        roomId: {type: 'string'},
        taskId: {type: 'string'}
    },

    delete: {
        _id: {type: 'string'}
    }
};