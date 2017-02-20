(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('MainMenuController', MainMenuController);

  //MainMenuController.$inject = ['$uibModal','$state', 'routerHelper', '$firebaseAuth'];
  MainMenuController.$inject = ['$translate','$injector','$rootScope','$q','logger','$uibModal',
                               '$translatePartialLoader','$state', 'routerHelper','dataservice'];

  /* @ngInject */
  //function MainMenuController($uibModal,$state, routerHelper,$firebaseAuth) {
  function MainMenuController($translate,$injector,$rootScope,$q, logger, $uibModal,
                               $translatePartialLoader,$state, routerHelper,dataservice) {
    var vm = this;
    $translatePartialLoader.addPart('layout');
    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;
    vm.setLang = setLang;
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

    function getAuthUser() {

      var authservice;
      try {
        authservice = $injector.get('authservice');
        console.log('Injector has authservice service!');
        vm.isAuthservicePresent = true;
      }catch (e) {
        vm.isAuthservicePresent = false;
        console.log('Injector has NOT authservice service!');
      }
      if (authservice) {
        return authservice.isLoggedin().then(function(data) {
          $rootScope.authUser = data;
          return $rootScope.authUser;
        });
      }else {
        return undefined;
      }
    }

    function setLang(langKey) {
      // You can change the language during runtime
      $translate.use(langKey);
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
