const Hapi = require('hapi');
const Home = require('./module/home');


const server = new Hapi.Server();
server.connection({port: 9000});

const rootHandler = function (request, reply) {

    reply.view('index', {
        title: 'examples/views/ejs/index.js | Hapi ' + request.server.version,
        message: 'Index - Hello World!'
    });
};

server.register([{register: Home, options: {}}, require('vision')], (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: { dust: require('hapi-dust') },
        relativeTo: __dirname,
        path: 'templates',
        partialsPath: 'templates/partials',
        // helpersPath: 'path/to/helpers',
    });

    server.route({method: 'GET', path: '/test', handler: rootHandler});

    server.start((err) => {
        console.log(`Server running at: ${server.info.uri}`);
    });
});

