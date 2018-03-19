const router = require('express').Router();

router.use('/servant', require('./servant'));
router.use('/item', require('./item'));
router.use('/data', require('./data'));
router.use('/authentication', require('./authentication'));

module.exports = router;