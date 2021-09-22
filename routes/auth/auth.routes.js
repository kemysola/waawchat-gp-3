const express = require('express');
const router = express.Router();

const {
    register, 
    login, 
    postRegister, 
    postLogin,
    verify,
    forgotPassword} = require('../../controllers/auth/auth.controller');


router.route('/register')
    .get(register)
    .post(postRegister);

router.route('/login')
    .get(login)
    .post(postLogin);

router.route('/verify-token')
    .get(verify)
    .post();



module.exports = router;