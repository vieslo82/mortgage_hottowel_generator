/* jshint -W117, -W030 */
describe('ContactController', function() {
  var controller;
  //  var people = mockData.getMockPeople();

  beforeEach(function() {
    bard.appModule('app.contact');
    bard.inject('$controller', '$log', '$q', '$rootScope');
  });

  beforeEach(function() {
    //sinon.stub(dataservice, 'getPeople').returns($q.when(people));
    controller = $controller('ContactController');
    //$rootScope.$apply();
  });

  //bard.verifyNoOutstandingHttpRequests();

  describe('Contact controller', function() {
    it('should be created successfully', function() {
      expect(controller).to.be.defined;
    });
  });
});
