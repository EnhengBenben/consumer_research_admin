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
          //$state.go('app.overview.list');
        })
        .error(function (response) {
          toaster.pop('error', '登陆失败');
        });
    }
  }

})();
