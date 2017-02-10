(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope','$http','$state','$location'];
  /* @ngInject */
  function LoginController($rootScope,$http,$state,$location) {
    var vm = this;

    vm.login = login;
    // Register the login() function
    function login() {

      $http({
        url: '/api/login',
        method: 'POST',
        data: { 'username' :vm.user.username, 'password':vm.user.password }
      })
        .then(function(responseUser) {
          vm.message = 'Authentication successful!';
          console.log('OKKK:' + responseUser);

          $rootScope.authUser = responseUser.user;
          $state.go('admin');
          //$location.url('/admin   ');
        },
       function(responseError) { // optional
         vm.error = 'Authentication failed.';
         console.log('ERRRRROR: ' + responseError);
         $state.go('login');
       });
    }

  }
})();
