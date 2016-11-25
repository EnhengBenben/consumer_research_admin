(function(){
  'use strict';

  angular.module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope', 'toaster', 'AuthService', '$state'];

  function RegisterController($scope, toaster, AuthService, $state) {
    var vm = this;
    vm.register = {
      type: '2'
    };
    vm.regist = regist;
    return init();

    function init() {

    }

    function regist(){
      if(vm.register.type === 1){
        $state.go('free.base');
      }else if(vm.register.type === 2){
        $state.go('company.base');
      }

      toaster.pop('success','请先填写信息，完成后即注册成功');
    }
  }

})();
