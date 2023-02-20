const router = require('express').Router();

const { getPlaylist, getAllPlaylists, createPlaylist, deletePlaylist, updatePlaylist } = require('../controllers/playlist');

router.get('/', getAllPlaylists);
router.get('/:id', getPlaylist);
router.post('/', createPlaylist);
router.delete('/:id', deletePlaylist);
router.patch('/:id', updatePlaylist);

module.exports = router;
