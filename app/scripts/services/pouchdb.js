'use strict';

/**
 * @ngdoc service
 * @name pouchTestApp.pouchdb
 * @description
 * # pouchdb
 * Factory in the pouchTestApp.
 */
angular.module('pouchTestApp')
  .factory('pouchdb', function () {
    /*globals PouchDB*/
    PouchDB.sync('todo', 'http://192.168.1.4:5984/todo');
    return new PouchDB('todo');
  });
