const fs = require('fs');
const youtubeMp3Converter = require('youtube-mp3-converter')

const downloadMp3Path = __dirname + '/..' + process.env.DOWNLOAD_MP3_PATH;

const downloadAsMp3 = async (videoId) => {
    if (fs.existsSync(`${downloadMp3Path}/${videoId}.mp3`)) {
        return `${downloadMp3Path}/${videoId}.mp3`
    }

    const convertLinkToMp3 = youtubeMp3Converter(downloadMp3Path)

    const pathToMp3 = await convertLinkToMp3(`https://www.youtube.com/watch?v=${videoId}`, {
        title: videoId
    })

    return pathToMp3
}

module.exports = {
    downloadAsMp3
}
