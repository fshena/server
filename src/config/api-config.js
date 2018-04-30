require('dotenv').config({path: process.env.npm_package_config_envFilePath});

const config = {
    dev: {
        query: {
            maxLimit: 100, // max results returned with the response
        },
        rateLimiter: {
            burst: 5, // Concurrent requests
            rate: 0.5, // Steady state: 1 request / 2 seconds
            ip: true,
            setHeaders: true,
        },
    },
    test: {
        query: {
            maxLimit: 100, // max results returned with the response
        },
        rateLimiter: {
            burst: 0, // Concurrent requests
            rate: 0, // Steady state: 1 request / 2 seconds
            ip: true,
            setHeaders: true,
        },
    },
    prod: {
        query: {
            maxLimit: 100, // max results returned with the response
        },
        rateLimiter: {
            burst: 5, // Concurrent requests
            rate: 0.5, // Steady state: 1 request / 2 seconds
            ip: true,
            setHeaders: true,
        },
    },
};

module.exports = config[process.env.NODE_ENV];
