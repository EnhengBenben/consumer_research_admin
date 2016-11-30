(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanySkillCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    console.log(1);

    return init();

    function init(){
      console.log(2);
      AuthService
        .skill()
        .then(function(res){
          console.log(res);
        });

    }

    function next(){
      $state.go('company.qualifications');
      toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
