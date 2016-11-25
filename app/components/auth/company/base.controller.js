(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyBaseCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;
    vm.next = next;

    return init();

    function init(){

    }

    function next(){
      $state.go('company.experience');
      toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
