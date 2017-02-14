(function() {
  'use strict';

  angular
    .module('app.admin')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates(routerHelper));
  }

  function getStates(routerHelper) {
    return [
      {
        state: 'admin',
        config: {
          url: '/admin',
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminController',
          controllerAs: 'vm',
          title: 'Admin',
          settings: {
            nav: 3,
            content: '<i class="fa fa-lock"></i> Admin'
          },

          resolve:{
            //loggedin: authservice.checkLoggedin
            loggedin: routerHelper.checkLoggedin
          }
        }
      }
    ];
  }
})();
