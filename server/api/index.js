const router = require('express').Router();

router.use('/login', require('./login'));
router.use('/signUp', require('./signUp'));

module.exports = router;