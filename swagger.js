import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'SIWE-AUTH API',
        description: 'A simple auth API using Sign In with Ethereum',
    },
    host: 'http://localhost:8000/api/v1/',
};

const outFile = './swagger-output.json';
const routes = ['./src/app.ts'];

swaggerAutogen()(outFile, routes, doc);
