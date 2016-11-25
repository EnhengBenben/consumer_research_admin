(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeSkillCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;
    vm.next = next;


    return init();

    function init(){

    }

    function next(){
      console.log(vm.chioce);
      $state.go('free.resume');
      toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
