(function() {
  'use strict';

  angular
    .module('app.admin')
    .run(appRun);

  appRun.$inject = ['routerHelper','dataservice'];
  /* @ngInject */
  function appRun(routerHelper,dataservice) {
    routerHelper.configureStates(getStates(dataservice));
  }

  function getStates(dataservice) {
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
            loggedin: dataservice.checkLoggedin
          }
        }
      }
    ];
  }
})();
