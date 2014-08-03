'use strict';

/**
 * @ngdoc function
 * @name pouchTestApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the pouchTestApp
 */
angular.module('pouchTestApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
