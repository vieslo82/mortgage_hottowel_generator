(function() {
  'use strict';

  angular.module('app', [
    'app.core',
    'app.widgets',
    'app.authentication',
    'app.admin',
    'app.dashboard',
    'app.contact',
    'app.hipoteca',
    'app.layout'
  ])
  .run(function ($rootScope, $translate) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function () {
      console.log('TRANSLATE REFRESH');
      $translate.refresh();
    });
  });
})();
