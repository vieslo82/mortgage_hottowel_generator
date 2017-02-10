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
    vm.loginTwitter = loginTwitter;
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
           vm.error = 'Authentication failed.';
           console.log('ERRRRROR: '+responseError);
           $state.go('login');
       });
    }

    function loginTwitter(){
       
       $http.get('/api/loginTwitter')
        .then(success)
        .catch(fail);

      function success(responseUser) {
        console.log(' USER TWITTER ANGULAR ',responseUser);
        /*$http.get('/api/auth/twitter/callback')
        .then(function(user){
            console.log ("USER CALLBACK",user);
            $rootScope.authUser = user.user
        })
        .catch(function(fail){})*/
      }

      function fail(e) {
         console.log('ERROR /api/loginTwitter: %j ',e);
      }
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
