(function() {
  'use strict';

  angular
    .module('app.authentication')
    .factory('authservice', authservice)
    .config(function($httpProvider) {
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
                   $location.url('/login');
                 }
                 return $q.reject(response);
               }
        };
      });
    });

  authservice.$inject = ['$rootScope','$state','$window','$http', '$q',
                        'exception', 'logger','localStorageService'];
  /* @ngInject */
  function authservice($rootScope,$state,$window, $http, $q,
                      exception, logger, localStorageService) {

    var service = {
      checkLoggedin: checkLoggedin,
      isLoggedin: isLoggedin,
      logout: logout
    };

    return service;

    //================================================
    // Check if the user is connected
    //================================================
    function checkLoggedin() {
      isLoggedin()
        .then(function(responseUser) {
          if (!responseUser) {
            $rootScope.authUser = false;
            $state.go('login');
          }else {
            $rootScope.authUser = responseUser;
          }
        })
        .catch(function(e) {
          return exception.catcher('XHR Failed for /api/loggedin')(e);
        });
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
  }
})();
