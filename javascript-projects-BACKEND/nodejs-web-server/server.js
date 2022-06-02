const http = require('http');

const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'Node.js')
    
    const {method, url} = request;

    if (url === '/') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message : 'ini adalah homepage',
            }))
        } 
        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message : `halaman tidak dapat dakses dengan ${method} request`,
            }))
        }
    }

    else if(url === '/about') {
        if (method === 'GET') {
            response.statusCode = 200;
            response.end(JSON.stringify({
                message : 'Hallo ini adalah halaman about',
            }))
        }
        else if (method === 'POST') {
            let body = [];

            request.on('data', (chunk) => {
                body.push(chunk);
            })

            request.on('end', () => {
                body = Buffer.concat(body).toString();
                const {name} = JSON.parse(body)

                response.statusCode = 200;
                response.end(JSON.stringify({
                    message : `Halo, ${name}! Ini adalah halaman about`,
                }))
            })
        }
        else {
            response.statusCode = 400;
            response.end(JSON.stringify({
                message : `halaman tidak dapat di akses dengan ${method} request`,
            }))
        }
    }

    else {
        response.statusCode = 404;
        response.end(JSON.stringify({
            message : `Halaman tidak ditemukan`,
        }))
    }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server sedang berjalan di http://${host}:${port}`);
});