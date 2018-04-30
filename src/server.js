const middleware = require('@localleague/middleware');

const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const serverConfig = require('./config/server-config');
const apiConfig = require('./config/api-config');
const corsConfig = require('./config/cors-config');

const cors = corsMiddleware(corsConfig);
const server = restify.createServer(serverConfig);

server.listen(process.env.SERVER_PORT);

server.pre(cors.preflight);
// validate JWT token before proceeding to any route.
server.pre(middleware.token);

server.use(cors.actual);
server.use(restify.plugins.queryParser({mapParams: true}));
server.use(restify.plugins.bodyParser({mapParams: true}));
server.use(restify.plugins.throttle(apiConfig.rateLimiter));
server.use(restify.plugins.authorizationParser());

// modify all error response
server.on('restifyError', middleware.error);
// server.on('uncaughtException', require('./handler/error-handler'));

module.exports = server;
