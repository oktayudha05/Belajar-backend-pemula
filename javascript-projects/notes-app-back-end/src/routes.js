const {addNoteHandler, getNoteHandler,  getNoteByIdHandler, editNoteByIdHandler} = require ('./handler')

const routes = [
    {
        method : 'POST',
        path : '/notes',
        handler : addNoteHandler,
    },
    {
        method : 'GET',
        path : '/notes',
        handler : getNoteHandler,
    },
    {
        method : 'GET',
        path : '/notes/{id}',
        handler :  getNoteByIdHandler,
    },
    {
        method : 'PUT',
        path : '/notes/{id}',
        handler :  editNoteByIdHandler,
    },
    
]

module.exports = routes;