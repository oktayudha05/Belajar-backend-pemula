const {addBookHandler, getBookHandler} = require('./handler');

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
    }
]

module.exports = routes;