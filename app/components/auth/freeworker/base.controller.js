(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeBaseCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    vm.jobAges = [
      {
      id:0,
      name: '应届毕业生'
    },
      {
        id:1,
        name: '1-3年'
      },
      {
        id:2,
        name: '4-6年'
      },
      {
        id:3,
        name: '7-10年'
      },
      {
        id:4,
        name: '10年以上'
      }];
    vm.EnglishLevel = [{id: 0, name: '一般'},{id: 1, name:  '良好'}];


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
      angular.extend(vm.base,{unitaddr: vm.unitaddr.province + vm.unitaddr.city});
      $state.go('free.experience');
      toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
