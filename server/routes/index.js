const router = require('express').Router();

router.use(require('./servant'));
router.use(require('./item'));

module.exports = router;