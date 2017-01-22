(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MainMenuController', MainMenuController);

  MainMenuController.$inject = ['$state', 'routerHelper', '$firebaseAuth'];
  /* @ngInject */
  function MainMenuController($state, routerHelper,$firebaseAuth) {
    var vm = this;
    //vm.authObj = $firebaseAuth(firebase.database());
    // Get a reference to the root of the Firebase
    //vm.rootRef = new Firebase('https://mortgage-calculator.firebaseio.com');
    // Initialize the Firebase auth factory
    vm.authObj = $firebaseAuth();
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.singin = singin;
    vm.logOut = logOut;

    activate();

    function activate() { getNavRoutes(); }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function(r) {
        return r.settings && r.settings.nav;
      }).sort(function(r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function singin(provider){
        vm.authObj.$signInWithPopup(provider).then(function(authData) {
           vm.authData = authData;
           console.log(authData);
       }, function(error) {
          console.log("Login failed: ", error);
       });
    }
    function logOut(){
        vm.authObj.$signOut();
        vm.authData = null;
    }

    function isCurrent(route) {
      if (!route.title || !$state.current || !$state.current.title) {
        return '';
      }
      var menuName = route.title;
      return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
    }
  }
})();
