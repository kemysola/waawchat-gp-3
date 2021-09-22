const express = require('express');
const router = express.Router();
const {home, postHome} = require('../../controllers/default/default.controller');

// router.get('/index', home);
router.route('/')
    .get(home)
    .post(postHome);

module.exports = router;