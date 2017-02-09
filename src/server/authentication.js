var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'admin' && password === 'admin'){ // stupid example
      return done(null, {displayName: 'admin'});
    }

    return done(null, false, { message: 'Incorrect username.' });
  }
));

passport.use(new TwitterStrategy({
    consumerKey: 'O7irwQHhR39bk5oWuYK7KgBK5',
    consumerSecret: 'brTcGHZI8SQPz1U08HAm5VeSnjatuASLF6EyD1hdpkmlMvk2Me',
    callbackURL: "http://127.0.0.1:3000/api/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {    
     return cb(null, profile);
  }
));

passport.use(new FacebookStrategy({
    clientID: '408509946157515',
    clientSecret: 'fbb3f995d1d03972cf56f6a825b395b0',
    callbackURL: "http://127.0.0.1:3000/api/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    /*User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return cb(err, user);
    });*/
    return cb(null, profile);
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
    console.log('SERIALIZE USER');
});

passport.deserializeUser(function(user, done) {
    console.log('DESERIALIZE USER');
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  console.log('Session: %j', req);
  if (!req.isAuthenticated()){
      res.send(401);
  }else{
      next();
  }
};

module.exports = auth;
