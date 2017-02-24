(function() {
'use strict';
angular
        .module('app.hipoteca')
        .controller('HipotecaController', HipotecaController);

HipotecaController.$inject = ['$injector','$rootScope','$firebaseArray','$q','$stateParams',
                                '$scope','$state','localStorageService','logger','dataservice'];

/* @ngInject */
function HipotecaController($injector,$rootScope,$firebaseArray,$q,$stateParams,
                                $scope,$state,localStorageService,logger,dataservice) {
  var vm = this;

  //vm.authData = $firebaseAuth().$getAuth();
  var hipotecaState = 'NEW';

  vm.hipoteca = {
    nif:'',
    nombre:'',
    ape1:'',
    ape2:'',
    edad:null,
    telefono:'',
    email:'',

    dadesEconomiques:{
      ingresosMensuals:null,
      capital:null,
      tipusInteres:'variable',
      euribor:null,
      diferencial:null,
      interesFixe:null,
      terminiAnys:null
    },
    dataConstitucioHipoteca:null,
    interesSol:null,
    quotaMensual:null,
    interesAplicat:null,
    totalInteresos:null
  };

  vm.calcularHipoteca = calcularHipoteca;
  vm.resetValues = resetValues;

  getEuribor(new Date());
  //vm.saveMortgage = saveMortgage;
  vm.submitAndSaveHipoteca = submitAndSaveHipoteca;

  activate();

  function activate() {
    var authservice;
    try {
      authservice = $injector.get('authservice');
      console.log('Injector has authservice service!');

      authservice.isLoggedin().then(function(data) {
        $rootScope.authUser = data;
        if ($rootScope.authUser && $rootScope.authUser.id) {
          var ref = firebase.database().ref().child('hipotecas/' + $rootScope.authUser.id);
          vm.hipotecas = $firebaseArray(ref);

          if ($stateParams.idHipoteca) {
            //UPDATE EXISTING MORTGAGE
            //promises=[getMortgagesFB($stateParams.idHipoteca)];
            vm.hipotecas.$loaded()
                      .then(function(hipotecas) {
                        vm.hipoteca = hipotecas.$getRecord($stateParams.idHipoteca); // true
                        hipotecaState = 'UPDATE';
                      })
                      .catch(function(error) {
                        console.log('Error:', error);
                      });
          }
        }
      });
    }catch (e) {
      console.log('Injector has NOT authservice service!');
    }
  }

  //Get closest euribor rate
  function getEuribor(dateStamp_) {
    try {
      var mes = dateStamp_.getMonth();
      var any = dateStamp_.getFullYear();
      if (mes === 0) {
        any = any - 1;
        mes = 12;
      }
      dataservice.getEuribor(any,mes)
      .then(function(euriborIr) {
        vm.euriborMonthYear = mes + '/' + any;
        vm.hipoteca.dadesEconomiques.euribor = euriborIr;
      });
    } catch (error) {
      vm.euriborMonthYear = '';
      vm.hipoteca.dadesEconomiques.euribor = 0;
    }
  }

  function calcularHipoteca() {
    var interesAplicat_ =  parseFloat(vm.hipoteca.dadesEconomiques.euribor) +
                           parseFloat(vm.hipoteca.dadesEconomiques.diferencial);

    if (vm.hipoteca.dadesEconomiques.tipusInteres === 'fixed') {
      interesAplicat_ = parseFloat(vm.hipoteca.dadesEconomiques.interesFixe);
    }

    vm.hipoteca.interesAplicat = interesAplicat_.toLocaleString() + ' %';

    var quota = ((vm.hipoteca.dadesEconomiques.capital * interesAplicat_) / 12) /
                        (100 * (1 - Math.pow(1 + ((interesAplicat_ / 12) / 100),
                        (-1) * vm.hipoteca.dadesEconomiques.terminiAnys * 12)));

    vm.hipoteca.quotaMensual = quota.toLocaleString() + ' €';
    vm.hipoteca.totalInteresos = ((quota * 12 * vm.hipoteca.dadesEconomiques.terminiAnys) -
                                  vm.hipoteca.dadesEconomiques.capital).toLocaleString() + ' €';
  }

  function resetValues() {
    vm.hipoteca.dadesEconomiques.interesFixe = null;
    vm.hipoteca.dadesEconomiques.euribor = null;
    vm.hipoteca.dadesEconomiques.diferencial = null;
  }

  /*function saveMortgage(){
            localStorageService.set('hipotecas', vm.hipotecas);
  }*/

  function calculateAmortizationPlan() {
    vm.hipoteca.plaAmortizatcio = [];
    var liniaAmortitzacio = {'numPago':0,'saldoInicial':0,'quotaMensual':0,'aportacioParcial':0,'capital':0,
                            'interes':0,'saldoFinal':0,'interesAcumulat':0};
  }

  function submitAndSaveHipoteca() {
    if (!$scope.mortgageForm.$valid) {
      angular.forEach($scope.mortgageForm.$error.required, function(field) {
        field.$setDirty();
      });
      return false;
    }else {
      if (hipotecaState === 'NEW') {
        vm.hipotecas.$add(vm.hipoteca);
      }else {
        vm.hipotecas.$save(vm.hipoteca);
      }
      //$window.location.href = '/';
      $state.go('dashboard');

      return true;
    }
  }
  $scope.$watch(
    'vm.hipoteca.dataConstitucioHipoteca',
    function(newValue,oldValue) {
      getEuribor(newValue);
    }
  );

  $scope.$watchCollection(
                   'vm.hipoteca.dadesEconomiques',
                   //function( newValue, oldValue ) {
                   function() {
                     if (vm.hipoteca.dadesEconomiques &&
                           vm.hipoteca.dadesEconomiques.capital  &&
                           vm.hipoteca.dadesEconomiques.terminiAnys &&
                           ((vm.hipoteca.dadesEconomiques.euribor &&
                               vm.hipoteca.dadesEconomiques.diferencial) ||
                               vm.hipoteca.dadesEconomiques.interesFixe)) {
                       vm.calcularHipoteca();
                     }else {
                       vm.hipoteca.quotaMensual = undefined;
                       vm.hipoteca.interesAplicat = undefined;
                       vm.hipoteca.totalInteresos = undefined;
                     }
                   }
         );

}
})();
