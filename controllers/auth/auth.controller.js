const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const verifyEmail = require('../../utils/verifyEmail');
const randomstring = require('randomstring');

const passport = require('passport');
const LocalStraregy = require('passport-local').Strategy;

//local strategy setup
passport.use(new LocalStraregy({
    usernameField: 'username',
    passReqToCallback: true
}, async (req, username, password, done) => {
    await User.findOne({$or: [{username: username}, {email: username}]})
    .then(async (user) => { 
        console.log(">>>>>>::: ", user);
        if (!user) return done(null, false,req.flash('error-message', 'User not found'));

        bcrypt.compare(password, user.password, (err, passwordMatch) => { 
            if (err) {
                return err;
            }
            if (!passwordMatch) return done(null, false, req.flash('error-message', 'Password Incorrect'));

            return done(null, user, req.flash('success-message', 'Login Successful'))

        });


    })

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

module.exports = {
    register: async (req, res) => {
        res.render('auth/register', {pageTitle: 'Register'});
    },

    login: async (req, res) => {
        res.render('auth/login', {pageTitle: 'Login'});
    },

    verify: async (req, res) => {
        res.render('auth/verify-token', {pageTitle: 'Account Verification'});
    },

    postRegister: async (req, res) => {
        console.log(req.body);
        try {
            let {username, email, password, confirmPassword} = req.body;

        if(password.length < 6) {
            req.flash('error-message', 'Please enter a valid password');
            res.redirect('back');
        }

        if (password != confirmPassword) {
            req.flash('error-message', 'Passwords do not match');
            return res.redirect('back');
        }

        let usernameExists = await User.findOne({ username });
        let emailExists = await User.findOne({ email });

        if (usernameExists) {
            req.flash('error-message', 'Username already exist');
            return res.redirect('back');
        }

        if (emailExists) {
                req.flash('error-message', 'Email already exist');
                return res.redirect('back');
        }

        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        const secretToken = randomstring.generate();

        let newUser = new User({
            username,
            email,
            secretToken,
            password: hashedpassword
        });

        await verifyEmail(req, username, email, secretToken);

        await newUser.save();
    
        if (!newUser) {
            req.flash('error-messagee', 'Something went wrong, please try again')
            return res.redirect('back');
        }
    
        req.flash('success-message', 'Please check your email to verify your account');
        return res.redirect('/auth/verify-token');
        } catch (err) {
            console.log(err);
        }
    },

    postLogin: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
        seccessFlash: true,
        session: true,
    }),



}