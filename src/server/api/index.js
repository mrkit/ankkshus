const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/signUp', require('./signUp'));
router.use('/videos', require('./videos'));
router.use('/videochannels', require('./videoChannels'));
router.use('/quizzes', require('./quizzes'));
router.use('/ankkshusposts', require('./post'));

module.exports = router;