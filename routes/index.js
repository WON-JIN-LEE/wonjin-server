const { Router } = require('express');
const router = Router();

router.use('/', require('./users'));
router.use('/post', require('./board'));

module.exports = router;
