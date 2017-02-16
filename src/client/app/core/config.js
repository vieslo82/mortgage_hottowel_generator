(function() {
  'use strict';

  var core = angular.module('app.core');

  core.config(toastrConfig);

  toastrConfig.$inject = ['toastr'];
  /* @ngInject */
  function toastrConfig(toastr) {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';
  }

  var config = {
    appErrorPrefix: '[mortgageCalculator Error] ',
    appTitle: ' Mortgage Calculator'
  };

  core.value('config', config);

  core.config(configure);

  configure.$inject = ['$translatePartialLoaderProvider','$translateProvider','$logProvider',
                    'routerHelperProvider','exceptionHandlerProvider'];
  /* @ngInject */
  function configure($translatePartialLoaderProvider,$translateProvider,$logProvider, 
                    routerHelperProvider,exceptionHandlerProvider) {

    $translateProvider.registerAvailableLanguageKeys(['ca','es','en'],{
      'ca-ES': 'ca',
      'es-US': 'es',
      'es-ES': 'es',
      'en-US': 'en'
    });

    $translateProvider.determinePreferredLanguage();
    $translatePartialLoaderProvider.addPart('core');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/app/{part}/i18n/{lang}.json'
    });

    $translateProvider
      //.preferredLanguage('es')
      //.useStaticFilesLoader({
      //  prefix: '/app/i18n/',
      //  suffix: '.json'
      //})
      .useSanitizeValueStrategy('sanitize');

    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
  }

})();
