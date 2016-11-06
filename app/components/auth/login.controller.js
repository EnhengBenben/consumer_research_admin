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
    AuthService
      .login(vm.account)
      .success(function (response) {
        $localStorage.token = response.result_data[0].token;
        $localStorage.type = response.result_data[0].type;
        $state.go('app.overview.list');
      })
      .error(function (response) {
        toaster.pop('error', '登陆失败');
      });
  }
}
