(function(){
  'use strict';

  angular.module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$location', '$localStorage', 'toaster', 'AuthService', '$state'];

  function LoginController($scope, $location, $localStorage, toaster, AuthService, $state) {
    var vm = this;
    vm.account = {
      username: '',
      password: '',
    };
    vm.login = login;
    vm.errorMessage = null;
    return init();

    function init() {

    }

    function login() {
      //alert(1);
     // $state.go('app.company.manage');
      AuthService
        .login(vm.account)
        .success(function (response) {
         if(response === '密码错误' || response === '用户名不存在'){
           toaster.pop('error',response)
         }else if(response.type === 0) {
           if(response.basetype === 0){
             toaster.pop('success','欢迎您' + response.username);
             $state.go('app.freelance.list');
           }else if(response.basetype === 1){
             toaster.pop('success','欢迎您' + response.username);
             $state.go('app.company.list');
           }
           $localStorage.user = response;
         }else if(response.type === 1){
           toaster.pop('success','欢迎您' + response.username);
           $state.go('app.company.list');
           $localStorage.user = response;
         }
          //$state.go('app.overview.list');
        })
        .error(function (response) {
          toaster.pop('error', '登陆失败');
        });
    }
  }

})();
