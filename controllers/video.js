const fs = require('fs');
const yts = require('yt-search')
const { downloadAsMp3 } = require('../helpers');

const searchVideo = async function (req, res) {

    const searchParam = req.query.q
    const maxDurationMinutes = req.query.maxDurationMinutes || 7

    let result = await yts(searchParam)

    // remove videos longer than 7 minutes
    result = result.videos.filter(video => video.seconds < (60 * maxDurationMinutes))

    res.json(result)
}

const downloadVideoAsMp3 = async function (req, res) {
    const videoId = req.params.id

    await downloadAsMp3(videoId)

    res.json({
        path: `${process.env.HOST}/downloads/${videoId}.mp3`
    })
}

const streamVideoAsMp3 = async function (req, res) {
    const videoId = req.params.id

    const filePath = await downloadAsMp3(videoId);
    const stat = fs.statSync(filePath);
    const total = stat.size;
    if (req.headers.range) {
        const range = req.headers.range;
        const parts = range.replace(/bytes=/, "").split("-");
        const partialstart = parts[0];
        const partialend = parts[1];

        const start = parseInt(partialstart, 10);
        const end = partialend ? parseInt(partialend, 10) : total - 1;
        const chunksize = (end - start) + 1;
        const readStream = fs.createReadStream(filePath, { start: start, end: end });
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
            'Content-Type': 'audio/mpeg'
        });
        readStream.pipe(res);
    } else {
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
        fs.createReadStream(filePath).pipe(res);
    }
}

module.exports = {
    searchVideo,
    downloadVideoAsMp3,
    streamVideoAsMp3
}
