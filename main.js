const express = require('express');
const mongoose = require('mongoose');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

require('dotenv').config();

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const PORT = process.env.PORT || 3000;
const app = express()

// connect to mongodb
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(err);
})

app.use(express.json()); 
app.use(express.static('storage'))
app.use('/api', require('./routers'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
