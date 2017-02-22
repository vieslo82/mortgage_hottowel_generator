/* jshint -W117, -W030 */
describe('Dataservice (CORE)', function () {

  var $httpFlush;

  beforeEach(function () {
    module('app.core', bard.fakeToastr);
    bard.inject(this, '$httpBackend', '$rootScope', 'dataservice');
    $httpFlush = $httpBackend.flush;
  });

  bard.verifyNoOutstandingHttpRequests();

  it('should be registered', function() {
    expect(dataservice).not.to.equal(null);
  });

  describe('when call people (lawyers) and it returns 2xx', function () {
    var people;
    beforeEach(function() {
      people = mockData.getMockPeople();
      $httpBackend.when('GET', '/api/people')
                    .respond(200, people);
    });

    it('should return people (lawyers)', function () {
      dataservice.getPeople()
        .then(function(data) {
          expect(data.length).to.equal(people.length);
        });
      $httpFlush();
    });

    it('should contain Ward first name', function () {
      dataservice.getPeople()
        .then(function(data) {
          var hasWard = data.some(function (c) {
            return c.firstName === 'Ward';
          });
          expect(hasWard).to.be.true;
        });
      $httpFlush();
    });
  });

  describe('when call people (lawyers) and server fails', function () {
    var people;
    beforeEach(function() {
      people = mockData.getMockPeople();
      $httpBackend.when('GET', '/api/people')
                    .respond(500, {description:'you fail'});
    });

    it('getPeople (lawyers) reports error if server fails', function () {
      dataservice.getPeople()
        .catch(function(error) {
          expect(error).to.exist;
        });
      $httpFlush();
    });
  });

  /*describe('ready function', function () {

    it('should return a resolved promise with the dataservice itself', function () {
      dataservice.ready()
            .then(function(data) {
              expect(data).to.equal(dataservice);
            });
      $rootScope.$apply(); // no $http so just flush $q
    });
  });*/
});
