const axios = require('axios')

const suggestQueries = async function (req, res) {
    try {
        let { data } = await axios.get(`https://suggestqueries-clients6.youtube.com/complete/search?client=youtube&hl=en&gl=tr&gs_rn=64&gs_ri=youtube&q=${req.params.search}`, { responseEncoding: 'binary' })

        let parsedData = await JSON.parse(data.split('(')[1].split(')')[0])[1].map(word => word[0]).map(video => video.duration.seconds < (60 * 4))

        res.status(200).json(parsedData)
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    suggestQueries
}
