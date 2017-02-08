var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

var auth = require('./authentication');
var passport = require('passport');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
//===== NEW PERE ===========================================================
// route to test if the user is logged in or not
router.get('/loggedin', function(req, res) {
  console.log('Logged in '+JSON.stringify(req.user));
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('login '+JSON.stringify(req.user));
  console.log('session '+JSON.stringify(req.session));
  res.send(req.user);
});

// route to log in twitter
router.post('/loginTwitter', passport.authenticate('twitter'), function(req, res) {
  console.log('login '+JSON.stringify(req.user));
  console.log('session '+JSON.stringify(req.session));
  res.send(req.user);
});

// route to log out
router.post('/logout', function(req, res){
  req.logOut();
  res.send(200);
});
//========= END NEW ====================================================

router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
  res.status(200).send(data.people);
}

function getPerson(req, res, next) {
  var id = +req.params.id;
  var person = data.people.filter(function(p) {
    return p.id === id;
  })[0];

  if (person) {
    res.status(200).send(person);
  } else {
    four0four.send404(req, res, 'person ' + id + ' not found');
  }
}
