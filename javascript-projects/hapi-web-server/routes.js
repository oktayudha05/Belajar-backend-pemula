const { handler } = require("@hapi/hapi/lib/cors");

const routes = [
    {
        path : '/',
        method : 'GET',
        handler : (request, h) => {
            return 'Homepage';
        },
    },
    
    {
        path: '/',
        method: '*',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },

    {
        path : '/about',
        method : 'GET',
        handler : (request, h) => {
            return 'About Page';
        },
    },

    {
        path : '/about',
        method : `*`,
        handler : (request, h) => {
            return 'halaman tidak dapat di akses dengan method tersebut';
        },
    },
    
    {
        path : `/hello/{name?}`,
        method : 'GET',
        handler : (request, h) => {
            const { name = `stranger` } = request.params;
            const { lang } = request.query;
            if (lang === 'id') {
                return `Hai ${name}`;
        } else {
            return `Hallo ${name}`;
            }
        },
    }, 
    

    {
        path : `/{any}`,
        method : `*`,
        handler : (request, h) => {
            return 'halaman tidak di temukan';
        },
    },
]

module.exports = routes;