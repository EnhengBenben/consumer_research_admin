(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeExperienceCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;
    vm.next = next;


    return init();

    function init(){

    }

    function next(){
      console.log(vm.chioce);
      //$state.go('free.experience');
      //toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
