(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalLetterListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $stateParams) {
    var vm = this;
    vm.status = $stateParams.status;

    return init();

    function init(){

    }
  }
})();
