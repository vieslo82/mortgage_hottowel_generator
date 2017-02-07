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
    //vm.logout = logout;
    // Register the login() function
    function login(){

        $http({
            url: '/api/login',
            method: 'POST',
            data: { 'username' :vm.user.username, 'password':vm.user.password }
        })
        .then(function(responseUser) {
            vm.message = 'Authentication successful!';
            console.log('OKKK:'+responseUser);
            
            $rootScope.authUser = responseUser.user;
            $state.go('admin');
            //$location.url('/admin   ');
       },
       function(responseError) { // optional
           vm.message = 'Authentication failed.';
           console.log('ERRRRROR: '+responseError);
           $state.go('login');
       });
    }
    /*function logout(){

        $http({
            url: '/api/logout',
            method: 'POST'
        })
        .then(function(responseUser) {
            vm.message = 'Logout successful!';
            console.log('OKKK:'+responseUser);
            $state.go('/');

       },
       function(responseError) { // optional
           vm.message = 'Logout failed.';
           console.log('ERRRRROR: '+responseError);
           //$state.go('login');
       });
    }*/


  }
})();
