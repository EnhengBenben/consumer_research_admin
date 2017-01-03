(function () {
  'use strict';

  angular.module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope', 'toaster', 'AuthService', '$state', '$localStorage', '$interval'];

  function RegisterController($scope, toaster, AuthService, $state, $localStorage, $interval) {
    var vm = this;
    vm.register = {};
    vm.regist = regist;
    vm.sendCode = sendCode;
    return init();

    function init() {
      vm.paracont = "获取验证码";
      vm.paraevent = true;
    }

    function regist() {
      AuthService
        .register(vm.register)
        .then(function (res) {
          if (vm.register.acctype === 1) {
            if(vm.register.Mcode && vm.obj === vm.register.username){
              //验证验证码是否正确
              AuthService
                .compareCheckCode(vm.register)
                .then(function (res) {
                  if(res.data === '验证码正确'){
                    $localStorage.username = vm.register;
                    $state.go('free.base');
                  }else {
                    toaster.pop('error','验证码错误');
                  }
                });
            }else {
              toaster.pop('warning','请输入与手机号匹配的验证码');
            }
          } else if (vm.register.acctype === 0) {
            if (res.data === 'false') {
              toaster.pop('error', '该账号已注册');
            }else {
              $localStorage.username = vm.register;
              $state.go('company.base');
            }
          }
        });
    }

    function sendCode(){
      AuthService
        .register(vm.register)
        .then(function (res) {
          if (res.data === 'true') {
            var second = 60,
              timePromise = undefined;
            if(vm.paraevent){
              vm.paraevent = false;
              timePromise = $interval(function () {
                if (second <= 0) {
                  $interval.cancel(timePromise);
                  timePromise = undefined;
                  second = 60;
                  vm.paracont = "重发验证码";
                  vm.paraclass = "but_null";
                  vm.paraevent = true;
                } else {
                  vm.paracont = second + "秒后可重发";
                  vm.paraclass = "not but_null";
                  second--;
                }
              }, 1000, 100);
              AuthService
                .toCheckCode(vm.register)
                .then(function(res){
                  vm.register['Mcode'] = res.data[0].msg;
                  vm.obj = res.data[0].obj;
                })
            }
          } else if (res.data === 'false') {
            toaster.pop('error', '该账号已注册');
          }
        });
    }
  }

})();
