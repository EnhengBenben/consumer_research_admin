(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanySkillCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    vm.back = back;
    vm.skill = {};
    if($localStorage.skill){
      var array = $localStorage.skill.skills.split(',');
      for(var i=0;i<array.length;i++){
        vm.skill[array[i]] = parseInt(array[i]);
      }
    }


    return init();

    function init() {
      AuthService
        .skill()
        .then(function (res) {
          vm.skills = res.data;
        });
    }

    function next() {
      var str = [];
      for (var i in vm.skill) {
        if (vm.skill[i] != false) {
          str.push(i);
        }
      }
      str = str.join(',');
      if (str.length && str.split(',').length > 0) {
        $localStorage.skill = {skills: str};
        $state.go('company.qualifications');
        toaster.pop('success', '已保存，请继续完成注册');
      } else {
        toaster.pop('error', '请至少选择一项技能');
      }
    }

    function back(){
      history.back(-1);
    }
  }
})();
