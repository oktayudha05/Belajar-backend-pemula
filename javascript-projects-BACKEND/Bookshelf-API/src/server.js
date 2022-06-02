const Hapi = require('@hapi/hapi') 
const routes = require('./routes') 

const init = async () => {
    const server = Hapi.Server({
        port : 5000,
        host : "localhost",
        routes : {
            cors : {
                origin :  ['*'],
            }
        }
    }) 

    server.route(routes) 

    await server.start() 
    console.log(`Server telah berjalan pada ${server.info.uri}`) 
} 
init() 
