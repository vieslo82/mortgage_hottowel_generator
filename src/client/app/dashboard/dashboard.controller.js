(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$injector','NgMap','$rootScope','$window','$q','dataservice',
                                'logger', '$firebaseArray'];
  /* @ngInject */
  function DashboardController($injector,NgMap, $rootScope,$window, $q,dataservice, logger, $firebaseArray) {
    var vm = this;
    //Map centered on spain
    //vm.map = { center: { latitude: 39.5770969, longitude: -3.5280415 }, zoom: 6 };
    vm.showDetailLawyer = showDetailLawyer;

    NgMap.getMap().then(function(map) {
      vm.map = map;
      vm.map.setZoom(7);
      dataservice.getPeople().then(function(people) {
        vm.lawyers = people;
      });
    });

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
      console.log('Injector has authservice service!')
    }catch (e) {
      console.log('Injector has NOT authservice service!')
    }

    if (authservice) {
      authservice.isLoggedin().then(function(data) {
        $rootScope.authUser = data;
        if ($rootScope.authUser && $rootScope.authUser.id) {
          var ref = firebase.database().ref().child('hipotecas/' + $rootScope.authUser.id);
          vm.mortgagesList = $firebaseArray(ref);
        }
      });
    }
    //var ref = firebase.database().ref().child("hipotecas");
    //vm.mortgagesList = $firebaseArray(ref);
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {

      var promises = [getMessageCount(), getPeople()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    //Passar a factory
    /*function getGeoPosition() {
      return dataservice.getCurrentPosition().then(function(data) {
        vm.randomMarkers = data;
        return vm.randomMarkers;
      });
    }*/

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
    function getMortgages() {
      vm.mortgagesList = dataservice.getMortgages();
      return vm.mortgagesList;
    }
  }
})();
