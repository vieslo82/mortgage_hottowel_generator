var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'admin' && password === 'admin'){ // stupid example
      return done(null, {name: 'admin'});
    }

    return done(null, false, { message: 'Incorrect username.' });
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