const router = require('express').Router();

const { searchVideo, downloadVideoAsMp3, streamVideoAsMp3 } = require('../controllers/video');

router.get('/search', searchVideo);
router.get('/download/:id', downloadVideoAsMp3);
router.get('/stream/:id', streamVideoAsMp3);

module.exports = router;
