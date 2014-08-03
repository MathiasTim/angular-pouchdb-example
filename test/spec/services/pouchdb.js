'use strict';

describe('Service: pouchdb', function () {

  // load the service's module
  beforeEach(module('pouchTestApp'));

  // instantiate service
  var pouchdb;
  beforeEach(inject(function (_pouchdb_) {
    pouchdb = _pouchdb_;
  }));

  it('should do something', function () {
    expect(!!pouchdb).toBe(true);
  });

});
