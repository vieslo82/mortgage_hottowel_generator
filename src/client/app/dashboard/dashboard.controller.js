(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$translatePartialLoader','$injector','NgMap','$rootScope',
                            '$window','$q','dataservice','logger'];
  /* @ngInject */
  function DashboardController($translatePartialLoader,$injector,NgMap, $rootScope,$window,
                                $q,dataservice,logger) {
    var vm = this;
    vm.showDetailLawyer = showDetailLawyer;

    $translatePartialLoader.addPart('dashboard');

    function showDetailLawyer(e, lawyer) {
      vm.lawyer = lawyer;
      vm.map.showInfoWindow('foo-iw', lawyer.id);
    }

    vm.clicked = function() {
      console.log('Clicked a link inside infoWindow');
    };

    vm.mortgageInfo = {
      title: 'Your Mortgages List simulations',
      description: 'Preparing list'
    };

    var authservice;
    try {
      authservice = $injector.get('authservice');
      console.log('Injector has authservice service!');
    }catch (e) {
      console.log('Injector has NOT authservice service!');
    }

    vm.messageCount = 0;
    vm.people = [];
    vm.mortgagesList = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      getMortgageList();
      var promises = [getMessageCount(), getPeople(),getLawyersMap()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    function getLawyersMap() {
      return NgMap.getMap().then(function(map) {
        vm.map = map;
        vm.map.setZoom(7);
        vm.lawyers = vm.people;
      });
    }

    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      return dataservice.getPeople().then(function(data) {
        vm.people = data;
        return vm.people;
      });
    }
    function getMortgageList() {
      if (authservice) {
        authservice.isLoggedin().then(function(data) {
          $rootScope.authUser = data;
          if ($rootScope.authUser && $rootScope.authUser.id) {
            vm.mortgagesList = dataservice.getMortgageList($rootScope.authUser.id);
          }
        });
      }
    }
  }
})();
