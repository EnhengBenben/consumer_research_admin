(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyLayoutCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;
    vm.username = $localStorage.username.username;

    return init();

    function init(){

    }
  }
})();
