(function(){
  'use strict';

  angular.module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope', 'toaster', 'AuthService', '$state'];

  function RegisterController($scope, toaster, AuthService, $state) {
    var vm = this;
    vm.register = {

    };
    vm.regist = regist;
    return init();

    function init() {

    }

    function regist(){
      AuthService
        .register(vm.register)
        .then(function(res){
          if(res.data === 'false'){
            toaster.pop('success','请先填写信息，完成后即注册成功');
             if(vm.register.type === 0){
             $state.go('free.base');
             }else if(vm.register.type === 1){
             $state.go('company.base');
             }
          }else if(res.data === 'true'){
            toaster.pop('error','该账号已注册');
          }
        });


    }
  }

})();
