require('dotenv').config({path: process.env.npm_package_config_envFilePath});

// this is only used for the endpoint development server
const config = {
    dev: {
        preflightMaxAge: 5, //Optional
        origins: ['http://localhost:4200'],
        allowHeaders: ['*'],
        exposeHeaders: ['*'],
    },
    test: {
        preflightMaxAge: 5, //Optional
        origins: ['http://localhost'],
        allowHeaders: ['*'],
        exposeHeaders: ['*'],
    },
    prod: {
        preflightMaxAge: 5, //Optional
        origins: ['http://localhost'],
        allowHeaders: ['*'],
        exposeHeaders: ['*'],
    },
};

module.exports = config[process.env.NODE_ENV];
