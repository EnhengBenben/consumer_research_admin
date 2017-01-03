(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyBaseCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;

    return init();

    function init(){

      if($localStorage.base){
        vm.base = $localStorage.base;
        AuthService
          .city({provinceId: parseInt(vm.base.unitaddr.split(',')[0])})
          .then(function(res){
            vm.unitaddr = {
              province: parseInt(vm.base.unitaddr.split(',')[0]),
              city: parseInt(vm.base.unitaddr.split(',')[1]),
            }
            vm.cities = res.data;
          });

      }else {
        vm.base = {};
      }
      vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'},
                        {id: 2, name: '民办非企业单位'}, {id: 3, name: '个体工商户'},
                        {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];
      AuthService
        .province()
        .then(function(res){
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
      angular.extend(vm.base,{unitaddr: vm.unitaddr.province + ',' + vm.unitaddr.city});
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
