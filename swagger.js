const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routers/index.js']

swaggerAutogen(outputFile, endpointsFiles, {
    basePath: '/api',
})