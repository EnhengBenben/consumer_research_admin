(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppController', Controller);

  /* @ngInject */
  function Controller( $state, $scope) {
    var vm = this;
    $scope.$state = $state;
  }
})();
