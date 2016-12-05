(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyBaseCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    vm.base = {};

    return init();

    function init(){
      AuthService
        .province()
        .then(function(res){
          console.log(res);
          vm.provinces = res.data;
        });
      $scope.$watch('vm.unitaddr.province',function(newValue, oldValue){
        if(newValue != oldValue){
          AuthService
            .city({provinceId:vm.unitaddr.province})
            .then(function(res){
              vm.cities = res.data;
            });
        }
      }, true)
    }

    function next(){
      console.log(vm.base);
      angular.extend(vm.base,{unitaddr: vm.unitaddr.province + vm.unitaddr.city});
      $localStorage.base = vm.base;
      $state.go('company.experience');
      toaster.pop('success','已保存，请继续完成注册');
    /*  $scope.base = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
          alert('请完善表单');
        }else {

        }
      };*/
    }
  }
})();
