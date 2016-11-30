(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeExperienceCtrl', Controller);

  /* @ngInject */
  function Controller(AuthService, $state, toaster, $scope, $localStorage) {
    var vm = this;
    vm.next = next;
    vm.experience = [];

    return init();

    function init(){
      AuthService
        .experience()
        .then(function(res){
          vm.lists = res.data;
        })
    }

    function next(){
      console.log(vm.experience);
      $localStorage.register = vm.experience;
      $state.go('free.skill');
      toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
