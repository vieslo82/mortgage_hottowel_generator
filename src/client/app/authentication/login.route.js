(function() {
  'use strict';

  angular
    .module('app.authentication')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'login',
        config: {
          url: '/login',
          templateUrl: 'app/authentication/login-template.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          title: 'login'
        }
      }
    ];
  }
})();
