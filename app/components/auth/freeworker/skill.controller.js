(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeSkillCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;


    return init();

    function init(){
      AuthService
        .skill()
        .then(function (res) {
          vm.lists = res.data;
        });
    }

    function next(){
      for (var i in vm.skill) {
        if (!vm.skill[i].length) {
          delete vm.skill[i];
        } else {
          vm.skill[i] = vm.skill[i].filter(function(n){
            return n;
          })
        }
      }
      vm.data = {
        skills: []
      };
      console.log(vm.skill);
      for(var i in vm.skill){
        vm.data.skills.push({pid: i,ids: vm.skill[i].join(',')});
      }
      console.log(vm.data);
      $localStorage.skill = vm.data;
      $state.go('free.resume');
      toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
