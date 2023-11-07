const express = require('express');
const router = express();

router.use('/api/user', require('../routes/router/userRoute'));

module.exports = router;
