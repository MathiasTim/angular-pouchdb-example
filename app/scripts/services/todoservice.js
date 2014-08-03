'use strict';

/**
 * @ngdoc service
 * @name pouchTestApp.todoService
 * @description
 * # todoService
 * Factory in the pouchTestApp.
 */
angular.module('pouchTestApp')
  .factory('todoService', function ($q, $rootScope, pouchdb) {
    return {
      add: function (todo) {
        var doc = {
          type: 'todo',
          title: todo.title,
          done: false,
          createdAt: new Date().getTime(),
          _id: new Date().toISOString()
        };
        return pouchdb.put(doc)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          return error;
        });
      },
      getAllTodos: function() {
        /*jshint camelcase: false*/
        var deferred = $q.defer();
        pouchdb.allDocs({include_docs: true, descending: true}, function(err, res) {
          $rootScope.$apply(function() {
            if (err) {
              deferred.reject(err);
            } else {
              deferred.resolve(res);
            }
          });
        });
        return deferred.promise;
      }
    };
  });
