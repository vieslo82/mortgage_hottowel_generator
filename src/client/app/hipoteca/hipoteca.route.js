(function() {
  'use strict';

  angular
    .module('app.hipoteca')
    .run(appRun);

  appRun.$inject = ['routerHelper','dataservice'];
  /* @ngInject */
  function appRun(routerHelper,dataservice) {
    routerHelper.configureStates(getStates(dataservice));
  }

  function getStates(dataservice) {
    return [
      {
        state: 'hipoteca',
        config: {
          url: '/hipoteca/nova',
          templateUrl: 'app/hipoteca/hipoteca.html',
          controller: 'HipotecaController',
          controllerAs: 'vm',
          title: 'hipoteca',
          settings: {
            nav: 2,
            content: '<i class="fa fa-file"></i>New mortgage'
          },
          resolve:{
            loggedin: dataservice.checkLoggedin
          }
        }
      },{
      state: 'hipotecaEdit',
      config: {
        url: '/hipoteca/edit/:idHipoteca',
        templateUrl: 'app/hipoteca/hipoteca.html',
        controller: 'HipotecaController',
        controllerAs: 'vm',
        title: 'hipoteca edit',
        resolve:{
          loggedin: dataservice.checkLoggedin
        }
      }
    }
    ];
  }
})();
