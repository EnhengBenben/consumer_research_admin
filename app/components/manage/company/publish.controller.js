(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyPublishCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;
    vm.sort = {
      type: 1
    };


    return init();

    function init(){

    }
  }
})();
