const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/signUp', require('./signUp'));
router.use('/videos', require('./videos'));

module.exports = router;