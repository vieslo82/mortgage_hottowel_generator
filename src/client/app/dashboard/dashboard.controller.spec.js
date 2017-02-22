/* jshint -W117, -W030 */
describe('DashboardController', function() {
  var controller;
  var people = mockData.getMockPeople();
  var mortgages = mockData.getMockMortgages();

  var thereisAuth = true;
  beforeEach(function() {
    bard.appModule('app.dashboard');
    bard.inject('$controller','$translatePartialLoader','$injector','NgMap','$rootScope','$window',
                '$q','$log','$firebaseArray','$rootScope');
  });

  beforeEach(function() {
    //sinon.stub(dataservice, 'getPeople').returns($q.when(people));
    var ds = {
      getPeople: function() {
        return $q.when(people);
      },
      getMessageCount:function() {
        return $q.when(7);
      },
      getMortgageList: function(idUser) {
        //return $q.when(mortgages);
        return mortgages;
      },
      getFake: function() {}
    };

    var authServ = {
      isLoggedin: function() {
        return $q.when({ 'id': '343242', 'displayName': 'admin' });
      },
      popopo: function() {

      }
    };

    var inject = {
      get: function(serviceName) {
        if (serviceName === 'authservice') {
          return authServ;
        }
      }
    };

    controller = $controller('DashboardController',{
      dataservice: ds,$injector: inject
    });
    $rootScope.$apply();
  });

  //bard.verifyNoOutstandingHttpRequests();

  describe('Dashboard controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });

    describe('after activate', function() {
      it('should have title of Dashboard', function() {
        expect(controller.title).to.equal('Dashboard');
      });

      it('should have logged "Activated"', function() {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('controler.map (Google maps API) should be created successfully', function() {
        expect(controller.map).to.be.defined;
      });

      it('controler.map markers (Google maps API) equal people.length', function(done) {
        expect(controller.map.markers).to.not.be.empty;
      });

      it('should have mortgageInfo', function() {
        expect(controller.mortgageInfo).to.not.be.empty;
      });

      it('With authenticated user should have at least 1 mortgage', function() {
        //$rootScope.authUser = { 'id': '343242', 'displayName': 'admin' };
        expect(controller.mortgagesList).to.not.be.empty;
      });

      it('should have at least 1 person', function() {
        expect(controller.people).to.have.length.above(0);
      });

      it('should have people count of 5', function() {
        expect(controller.people).to.have.length(9);
      });
    });
  });
});
