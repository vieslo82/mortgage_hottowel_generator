/* jshint -W117, -W030 */
describe('core dataservice', function () {

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

  describe('when call people (lawyers)', function () {
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

  describe('ready function', function () {

    it('should return a resolved promise with the dataservice itself', function () {
      dataservice.ready()
            .then(function(data) {
              expect(data).to.equal(dataservice);
            });
      $rootScope.$apply(); // no $http so just flush $q
    });
  });
});
