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


    $translateProvider.registerAvailableLanguageKeys(['ca','en'],{
      'ca-ES': 'ca',
      'en-US': 'en'
    });
    /*$translateProvider.useStaticFilesLoader({
      prefix: '/app/core/i18n/',
      suffix: '.json'
    });*/

    $translatePartialLoaderProvider.addPart('core');
    $translateProvider.useLoader('$translatePartialLoader', {
      urlTemplate: '/app/{part}/i18n/{lang}.json',
      loadFailureHandler: 'MyErrorHandler'
    });
    $translateProvider.useCookieStorage();

    $translateProvider
      .determinePreferredLanguage()
      .fallbackLanguage('en')
      .useSanitizeValueStrategy('sanitize');

    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    exceptionHandlerProvider.configure(config.appErrorPrefix);
    routerHelperProvider.configure({ docTitle: config.appTitle + ': ' });
  }

})();
