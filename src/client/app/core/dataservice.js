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
      firebase.initializeApp(config);

      //================================================
      // Add an interceptor for AJAX errors
      //================================================

      $httpProvider.interceptors.push(function($q,$location) {
        return {
          response: function(response) {
                 // do something on success
                 return response;
               },
          responseError: function(response) {
                 if (response.status === 401) {
                   console.log('TETETETETETET');
                   $location.url('/login');

                   //$state.go('login');
                 }
                 return $q.reject(response);
               }
        };
      });
    });

  dataservice.$inject = ['$rootScope','$state','$window','$http', '$q',
                        'exception', 'logger','localStorageService'];
  /* @ngInject */
  function dataservice($rootScope,$state,$window, $http, $q,
                      exception, logger, localStorageService) {

    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      //getCurrentPosition: getCurrentPosition,
      checkLoggedin: checkLoggedin,
      isLoggedin: isLoggedin,
      logout: logout
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

    //================================================
    // Check if the user is connected
    //================================================
    function checkLoggedin() {

      return $http.get('/api/loggedin')
        .then(success)
        .catch(fail);

      function success(responseUser) {
        if (responseUser.data === '0') {
          $rootScope.authUser = false;
          $state.go('login');
        }else {
          $rootScope.authUser = responseUser.data;
        }
      }

      function fail(e) {
        return exception.catcher('XHR Failed for /api/loggedin')(e);
      }
    }

    function isLoggedin() {
      return $http.get('/api/loggedin')
        .then(success)
        .catch(fail);

      function success(responseUser) {
        if (responseUser.data === '0') {
          $rootScope.authUser = false;
          return false;
        }else {
          $rootScope.authUser = responseUser.data;
          return responseUser.data;
        }
      }

      function fail(e) {
        return exception.catcher('XHR Failed for /api/loggedin')(e);
      }
    }

    function logout() {
      return $http({
        url: '/api/logout',
        method: 'POST'
      })
        .then(function(responseUser) {
          console.log('OKKK:' + responseUser);
          $rootScope.authUser = false;
          $state.go('/');
        },
       function(responseError) {
         // optional
         console.log('ERRRRROR: ' + responseError);
         //$state.go('login');
       });
    }

    /*function getCurrentPosition() {
      var deferred = $q.defer();

      if (!$window.navigator.geolocation) {
        deferred.reject('Geolocation not supported.');
      }else {
        $window.navigator.geolocation.getCurrentPosition(
               function (position) {
                 
                 deferred.resolve({lat:position.coords.latitude,
                                  lng:position.coords.longitude});
               },
               function (err) {
                 deferred.reject(err);
               });
      }
      return deferred.promise;
    }*/
  }
})();
