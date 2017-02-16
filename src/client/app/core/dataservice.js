(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice)
    .config(function($httpProvider) {
      var config = {
          apiKey: 'AIzaSyA6b-K_LzG0Lt3OPmwbxlYe1FW67CXbrPY',
          authDomain: 'mortgage-calculator.firebaseapp.com',
          databaseURL: 'https://mortgage-calculator.firebaseio.com',
          storageBucket: 'firebase-mortgage-calculator.appspot.com',
          messagingSenderId: '978656105531'
        };

      //if (!firebase.getInstance('FirebaseAPP')) {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }
    });

  dataservice.$inject = ['$rootScope','$state','$window','$http', '$q',
                        'exception', 'logger','localStorageService'];
  /* @ngInject */
  function dataservice($rootScope,$state,$window, $http, $q,
                      exception, logger, localStorageService) {

    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount
    };

    return service;

    function getMessageCount() {
      var deferred = $q.defer();
      getPeople().then(function(peopleArray) {
         deferred.resolve(peopleArray.length);
       },function (err) {
         deferred.reject(err);
       });
      return deferred.promise;
    }
    //DEPRECATED
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
  }
})();
