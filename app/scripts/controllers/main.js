'use strict';

/**
 * @ngdoc function
 * @name pouchTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pouchTestApp
 */
angular.module('pouchTestApp')
  .controller('MainCtrl', function ($scope, $rootScope, pouchdb) {
    $scope.todos = [];
    $scope.logs = [];

    $scope.add = function (todo) {
      var doc = {
        type: 'todo',
        title: todo.title,
        done: false,
        createdAt: new Date().getTime(),
        _id: new Date().toISOString()
      };
      pouchdb.put(doc)
      .then(function (todo) {
        pouchdb.get(todo.id)
        .then(function(todo){
          $scope.todos.push({doc: todo});
          $rootScope.$apply();
        });
      });
      todo.title = '';
    };

    $scope.delete = function (doc, index) {
      pouchdb.remove(doc)
      .catch(function (error) {
        return error;
      })
      .then(function () {
        $scope.todos.splice(index, 1);
        $rootScope.$apply();
      });
    };

    $scope.edit = function (todo) {
      var doc = {
        title : todo.doc.title,
        done : todo.doc.done,
        editedAt : new Date().getTime()
      };

      pouchdb.put(doc, todo.doc._id, todo.doc._rev)
      .then(function () {
        todo.editMode = false;
        $rootScope.$apply();
      });
    };

    $scope.getAll = function () {
      /*jshint camelcase: false*/
      pouchdb.allDocs({include_docs: true, descending: true})
      .then(function (todos){
        $scope.todos = todos.rows;
        $rootScope.$apply();
      });
    };

    $scope.logsListener = (function () {
      pouchdb.changes({
        live: true
      }).on('change', function(change) {
        $scope.logs.push(change);
        $rootScope.$apply();
      });
    })();

    $scope.getAll();
  });
