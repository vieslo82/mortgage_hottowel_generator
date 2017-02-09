(function() {
  'use strict';

  angular
    .module('app.layout')
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
          templateUrl: 'app/login/login-template.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          title: 'login'
          /*settings: {
            nav: 5,
            content: '<i class="fa fa-sign-in"></i> Sign in'
          }*/
        }
      }
     /* {
        state: 'loginTwitter',
        config: {
          url: '/loginTwitter',
          templateUrl: 'app/login/login-template.html',
          controller: 'LoginController',
          controllerAs: 'vm',
          title: 'loginTwitter'
       
        }
      }*/
    ];
  }
})();
