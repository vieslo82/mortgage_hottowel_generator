(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice)
    .config(function() {
        var config = {
            apiKey: 'AIzaSyA6b-K_LzG0Lt3OPmwbxlYe1FW67CXbrPY',
            authDomain: 'mortgage-calculator.firebaseapp.com',
            databaseURL: 'https://mortgage-calculator.firebaseio.com',
            storageBucket: 'firebase-mortgage-calculator.appspot.com',
            messagingSenderId: '978656105531'
        };
        firebase.initializeApp(config);
    });

  dataservice.$inject = ['$http', '$q', 'exception', 'logger','localStorageService'];
  /* @ngInject */
  function dataservice($http, $q, exception, logger, localStorageService) {
    //var fbDatabase = getFirebaseDatabase();

    /*var hipotecasRef = fbDatabase.ref('hipotecas/');
    var hipotecas = {};
    hipotecasRef.once('value').then(function(snapshot) {
        hipotecas = snapshot.val();
    });*/


    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      getMortgages:getMortgages
      //addMortgage:addMortgage
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);

      function success(response) {
        return response.data;
      }

      function fail(e) {
        return exception.catcher('XHR Failed for getPeople')(e);
      }
    }
    function getMortgages(idHipoteca){
        var hipotecas=localStorageService.get('hipotecas') || [];
        if (idHipoteca){
            return hipotecas[idHipoteca];
        }else{
            return hipotecas;
        }
    }

    /*function addMortgage(mortgage){
        // Get a key for a new Hipoteca.
      var newMortgageKey = fbDatabase.ref().child('hipotecas').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/hipotecas/' + newMortgageKey] = mortgage;
      //updates['/user-hipotecas/' + uid + '/' + newHipotecaKey] = hipoteca;

      return fbDatabase.ref().update(updates);
    }*/

    /*function getMortgagesFB(idMortgage){
        if (idMortgage){
            return hipotecas[idMortgage];
        }else{
            return hipotecas;
        }
    }*/
  }

  /*function getFirebaseDatabase(){
      // Initialize Firebase
      var config = {
        apiKey: 'AIzaSyA6b-K_LzG0Lt3OPmwbxlYe1FW67CXbrPY',
        authDomain: 'mortgage-calculator.firebaseapp.com',
        databaseURL: 'https://mortgage-calculator.firebaseio.com',
        storageBucket: 'firebase-mortgage-calculator.appspot.com',
        messagingSenderId: '978656105531'
      };
      firebase.initializeApp(config);
      // Get a reference to the database service
      var database = firebase.database();
      return database;
  }*/
})();
