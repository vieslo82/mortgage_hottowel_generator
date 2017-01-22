(function() {
  'use strict';

  angular
    .module('app.hipoteca')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
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
          }
        }
    },{
      state: 'hipotecaEdit',
      config: {
        url: '/hipoteca/edit/:idHipoteca',
        templateUrl: 'app/hipoteca/hipoteca.html',
        controller: 'HipotecaController',
        controllerAs: 'vm',
        title: 'hipoteca edit'
      }
    }
    ];
  }
})();
