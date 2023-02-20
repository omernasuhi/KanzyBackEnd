const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    playlistId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Playlist', PlaylistSchema);