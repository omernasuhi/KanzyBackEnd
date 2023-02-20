const yts = require('yt-search')
const Playlist = require('../models/Playlist')

// const searchPlaylist = async function (req, res) {

//     const playlistId = req.params.id

//     const result = await yts({ listId: playlistId })
//     res.json(result.videos)
// }

const getPlaylist = async function (req, res) {
    const { id } = req.params

    try {
        const playlist = await Playlist
            .findById(id)
            .exec()

        const result = await yts({ listId: playlist.playlistId })
        res.status(200).json(result.videos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAllPlaylists = async function (req, res) {
    try {
        const playlists = await Playlist.find()
        res.status(200).json(playlists)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const createPlaylist = async function (req, res) {
    const { name, playlistId } = req.body

    const playlist = new Playlist({
        name,
        playlistId
    })

    try {
        const newPlaylist = await playlist.save()
        res.status(201).json(newPlaylist)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const deletePlaylist = async function (req, res) {
    const { id } = req.params

    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(id)
        res.status(200).json(deletedPlaylist)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const updatePlaylist = async function (req, res) {
    const { id } = req.params
    const { name, playlistId } = req.body

    try {
        const updatedPlaylist = await Playlist.findByIdAndUpdate(id, {
            name,
            playlistId
        }, { new: true })
        res.status(200).json(updatedPlaylist)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getPlaylist,
    getAllPlaylists,
    createPlaylist,
    deletePlaylist,
    updatePlaylist
}
