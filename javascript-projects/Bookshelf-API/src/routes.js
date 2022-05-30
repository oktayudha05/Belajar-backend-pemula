const {addBookHandler, getBookHandler, getBookHandlerById} = require('./handler');

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

    }
]

module.exports = routes;