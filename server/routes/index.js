const router = require('express').Router();

router.use(require('./servant'));
router.use(require('./item'));
router.use(require('./data'));

module.exports = router;