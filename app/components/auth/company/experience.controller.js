(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyExperienceCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;


    return init();

    function init(){
      AuthService
        .experience()
        .then(function(res){
          vm.lists = res.data;
        })
    }

    function next(){
      if(vm.experience){
        var str = '';
       angular.forEach(vm.experience,function(i){
         if(i){
           str += i + ',';
         }
       });
        str = str.slice(0,str.length - 1);
        $localStorage.experience = {
          experience: str
        };
        $state.go('company.skill');
        toaster.pop('success','已保存，请继续完成注册');
      }


     // $localStorage.experience = vm.experience;
     // $state.go('company.skill');
    //  toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
