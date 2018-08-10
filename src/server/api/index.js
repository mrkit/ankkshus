const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/signUp', require('./signUp'));
router.use('/videos', require('./videos'));
router.use('/quizzes', require('./quizzes'));

module.exports = router;