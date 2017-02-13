(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeBaseCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    vm.jobAges = [{id: 1, name: '1年'}, {id: 2, name: '2年'}, {id: 3, name: '3年'}, {id: 4, name: '4年'}, {id: 5, name: '5年'}
      , {id: 6, name: '6年'}, {id: 7, name: '7年'}, {id: 8, name: '8年'}, {id: 9, name: '9年'}, {id: 4, name: '10年及以上'}];
    vm.EnglishLevel = [{id: 0, name: '一般'},{id: 1, name:  '良好'}];
    if($localStorage.base){
      vm.base = $localStorage.base;
      AuthService
        .city({provinceId: parseInt(vm.base.address.split(',')[0])})
        .then(function(res){
          vm.unitaddr = {
            province: parseInt(vm.base.address.split(',')[0]),
            city: parseInt(vm.base.address.split(',')[1]),
          }
          vm.cities = res.data;
        });
    }

    return init();

    function init(){
      AuthService
        .province()
        .then(function(res){
          vm.provinces = res.data;
        });
      AuthService
        .findJob()
        .then(function(res){
          vm.jobs = res.data;
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
      if(vm.unitaddr.province && vm.unitaddr.city){
        angular.extend(vm.base,{address: vm.unitaddr.province + ',' + vm.unitaddr.city});
        $localStorage.base = vm.base;
        $state.go('free.experience');
        toaster.pop('success','已保存，请继续完成注册');
      }else {
        toaster.pop('error','请选择地址');
      }
    }
  }
})();
