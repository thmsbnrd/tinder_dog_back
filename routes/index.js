const express = require("express");
const users = require('./users');
const matchs = require('./matchs');
const likes = require('./likes');
const messages = require('./messages');

const router = express.Router();

router.use('/users', users);
router.use('/matchs', matchs);
router.use('/likes', likes);
router.use('/messages', messages);

module.exports = router;