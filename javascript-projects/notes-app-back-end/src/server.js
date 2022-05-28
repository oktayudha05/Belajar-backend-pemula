const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port : 5000,
        // eslint-disable-next-line no-undef
        host : process.env.NODE_ENV !== 'production'?'localhost':'0.0.0.0',
        routes : {
            cors : {
                origin: ['*'],
            }
        }
    })

    server.route(routes)

    await server.start();
    console.log(`server sedang berjalan di ${server.info.uri}`);
}
init();