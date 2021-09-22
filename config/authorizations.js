module.exports = {
    isLoggedIn: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        }else{
            req.flash('error-message', 'Please login to continue');
            res.redirect('/auth/login');
        }
    }
}

module.exports = {
    isVerified: (req, res, next) => {
        if (req.isVerified()){
            verified = True;
            next();
        }else{
            req.flash('error-message', 'Account not yet verified. Please go to your e-mail and verify your account through the link');
            res.redirect('/auth/login');
        }
    }
}