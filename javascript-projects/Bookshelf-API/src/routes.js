const {addBookHandler, getBookHandler, getBookHandlerById, updateBook} = require('./handler') 

const routes = [
    {
        method : 'POST',
        path : '/books',
        handler : addBookHandler,
    },

    {
        method : 'GET',
        path : '/books',
        handler : getBookHandler,
    },

    {
        method : 'GET',
        path : '/books/{bookId}',
        handler : getBookHandlerById,

    },

    {
        method : 'PUT',
        path : '/books/{bookId}',
        handler : updateBook,
    }
]

module.exports = routes 