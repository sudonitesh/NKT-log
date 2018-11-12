const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;

const secret = require('../config/database')

const User = require('../models/user')

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user)
    })
})

passport.use(new FacebookStrategy(secret.facebook, function(req, token, refreshToken, profile, done) {
    User.findOne({ facebook: profile.id}, function(err, user) {
        if(err) return done(err);

        if(user) {
            return done(null, user)
        } else {
            let newUSer = new User();
            newUSer.email = profile._json.email; 
        }

    })
}))