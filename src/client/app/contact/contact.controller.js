

(function() {
  'use strict';

  angular
    .module('app.contact')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['$translatePartialLoader','$q', 'logger'];
  /* @ngInject */
  function ContactController($translatePartialLoader,$q, logger) {
    var vm = this;
    $translatePartialLoader.addPart('contact');

    vm.title = 'Contact';

  }
})();
