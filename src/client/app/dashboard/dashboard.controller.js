

(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$window','$q', 'dataservice', 'logger', '$firebaseArray'];
  /* @ngInject */
  function DashboardController($window, $q, dataservice, logger, $firebaseArray) {
    var vm = this;
    //Map centered on spain
    vm.map = { center: { latitude: 39.5770969, longitude: -3.5280415 }, zoom: 6 };

    /*uiGmapIsReady.then(function(maps) {
        vm.map = { center: { latitude: 39.5770969, longitude: -3.5280415 }, zoom: 6 };
        console.log('Google Maps loaded');
    });*/

    vm.mortgageInfo = {
      title: 'Mortgages List',
      description: 'Preparing list'
    };
    //vm.mortgagesList = [];
    var ref = firebase.database().ref().child("hipotecas");
    vm.mortgagesList = $firebaseArray(ref);
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      //var promises = [getMessageCount(), getPeople(),getMortgages()];
      var promises = [getMessageCount(), getPeople(),getGeoPosition()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    //Passar a factory
    function getGeoPosition(){
        return dataservice.getCurrentPosition().then(function(data) {
            /*vm.marker = {
              id: 0,
              coords: {
                latitude: data.coords.latitude,
                longitude: data.coords.longitude
            }};*/
            vm.randomMarkers = data;
             return vm.randomMarkers;
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
    function getMortgages() {
        vm.mortgagesList = dataservice.getMortgages();
        return vm.mortgagesList;
    }
  }
})();
