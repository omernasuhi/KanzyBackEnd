const router = require('express').Router();

const { suggestQueries } = require('../controllers');
const video = require('./video');
const playlist = require('./playlist');

router.use('/videos', video);
router.use('/playlists', playlist);
router.get('/suggestqueries/:search', suggestQueries);

module.exports = router;
