(function () {
  'use strict';

  angular
    .module('app')
    .controller('ContractorsPayCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;


    return init();

    function init(){

    }
  }
})();
