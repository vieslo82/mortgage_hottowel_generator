/* jshint -W117, -W030 */
describe('DashboardController', function() {
  var controller;
  var people = mockData.getMockPeople();
  var mortgages = mockData.getMockMortgages();
  var map = mockData.getMockMap();

  var authServFake;
  var dsFake;
  var ngmapFake;
  var injectFake;

  beforeEach(function() {
    //bard.appModule('app.dashboard');
    module('app.dashboard');
    bard.inject('$controller','$rootScope',
                '$q','$log');
    //sinon.stub(dataservice, 'getPeople').returns($q.when(people));
    dsFake = {
      getPeople: function() {
        return $q.when(people);
      },
      getMessageCount:function() {
        return $q.when(7);
      },
      getMortgageList: function(idUser) {
        //return $q.when(mortgages);
        return mortgages;
      }
    };

    ngmapFake = {
      getMap: function() {
        return $q.when(map);
      }
    };

    authServFake = {
      isLoggedin: function() {
        return $q.when({ 'id': '343242', 'displayName': 'admin' });
      }
    };

    injectFake = {
      get: function(serviceName) {
        if (serviceName === 'authservice') {
          return authServFake;
        }
      }
    };

    controller = $controller('DashboardController',{
      dataservice: dsFake,$injector: injectFake, NgMap: ngmapFake
    });

  });

  //bard.verifyNoOutstandingHttpRequests();

  describe('Dashboard controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('After activate dashboard', function() {
      beforeEach(function() {
        bard.inject('$state');
        $state.current = {};
        $rootScope.$apply();
      });

      it('should have title of Dashboard', function() {
        expect(controller.title).to.equal('Dashboard');
      });

      it('We expect dashboard $state', function() {
        $rootScope.$apply();
        expect($state.is('dashboard'));
        //expect($state.current.name).to.equal('Dashboard');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('controler.map (Google maps API) should be created successfully', function() {
        expect(controller.map).to.be.defined;
      });

      it('controler.map markers (Google maps API) equal people.length', function(done) {
        expect(controller.lawyers).to.not.be.empty;
        done();
      });

      it('should have mortgageInfo', function() {
        expect(controller.mortgageInfo).to.not.be.empty;
      });

      it('With authenticated user should have at least 1 mortgage', function() {
        expect(controller.mortgagesList).to.not.be.empty;
      });

      it('part loaded for i18n translations should be dashboard'), function() {
        expect($translatePartialLoader.getPart()).to.equal('dashboard');
      };

      it('With non authenticated user should have 0 mortgages', function() {
        //$rootScope.authUser = { 'id': '343242', 'displayName': 'admin' };
        authServFake.isLoggedin = function() {return $q.when('0'); };
        var controller2 = $controller('DashboardController',{
          dataservice: dsFake,$injector: injectFake, NgMap: ngmapFake
        });
        expect(controller2.mortgagesList).to.be.empty;
      });

      it('should have at least 1 person', function() {
        expect(controller.people).to.have.length.above(0);
      });

      it('should have people mock count of ' + people.length, function() {
        expect(controller.people).to.have.length(people.length);
      });
    });
  });
});
