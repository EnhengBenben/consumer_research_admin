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
      AuthService
        .province()
        .then(function(res){
          console.log(res);
          vm.provinces = res.data;
        });

      $scope.$watch('vm.base.province',function(newValue, oldValue){
        if(newValue != oldValue){
          AuthService
            .city({provinceId:vm.base.province})
            .then(function(res){
              console.log(res);
              vm.cities = res.data;
            });
        }
      })
    }

    function next(){
      $state.go('company.experience');
      toaster.pop('success','已保存，请继续完成注册');
    }
  }
})();
