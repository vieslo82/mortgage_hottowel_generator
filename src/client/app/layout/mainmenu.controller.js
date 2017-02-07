(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MainMenuController', MainMenuController);

  //MainMenuController.$inject = ['$uibModal','$state', 'routerHelper', '$firebaseAuth'];
  MainMenuController.$inject = ['$rootScope','$q','logger','$uibModal','$state', 'routerHelper','dataservice'];

  /* @ngInject */
  //function MainMenuController($uibModal,$state, routerHelper,$firebaseAuth) {
  function MainMenuController($rootScope,$q, logger, $uibModal,$state, routerHelper,dataservice) {
    var vm = this;
    //vm.authObj = $firebaseAuth(firebase.database());
    // Get a reference to the root of the Firebase
    //vm.rootRef = new Firebase('https://mortgage-calculator.firebaseio.com');
    // Initialize the Firebase auth factory
    //vm.authObj = $firebaseAuth();
    vm.logout = logout;
     vm.login = login;

    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    //vm.singin = singin;
    //vm.logOut = logOut;
    //vm.openLoginModal = openLoginModal;

    activate();

    function activate() { 
      getNavRoutes(); 
      
      var promises = [getAuthUser()];
      return $q.all(promises).then(function() {
        logger.info('Activated layout View');
      }); 
   }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function getAuthUser(){
      return dataservice.isLoggedin().then(function(data) {
        $rootScope.authUser = data;
        return $rootScope.authUser;
      });
    }

    function logout(){
      return dataservice.logout().then(function(data) {
        $rootScope.authUser = undefined;
        return $rootScope.authUser;
      });
    }
     function login(){
      $state.go('login');
    }

    /*function openLoginModal(){
        var modalInstance = $uibModal.open({
            templateUrl: 'app/layout/login-template.html',
            controller: 'LoginController as vm'
        });

        modalInstance.result.then(function () {
            // Redirect to the logged-in area of your site
        }, function () {
            // optional function. Do something if the user cancels.
        });
        //$dialog.dialog({}).open('login-template.html');
    }*/

    /*function singin(provider){
        vm.authObj.$signInWithPopup(provider).then(function(authData) {
           vm.authData = authData;
           console.log(authData);
       }, function(error) {
          console.log("Login failed: ", error);
       });
   }*/

    /*function logOut(){
        vm.authObj.$signOut();
        vm.authData = null;
    }*/

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
  }
})();
