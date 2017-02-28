/**
 * Created by Administrator on 2017/1/19.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('CheckUsernameCtrl', Controller);

  /* @ngInject */
  function Controller(toaster, AuthService, $state, $localStorage, $stateParams, $interval) {
    var vm = this;
    vm.next = next;
    vm.paracont = "获取验证码";
    vm.paraevent = true;
    vm.sendCode = sendCode;
    vm.sendCodeDemo = sendCodeDemo; //发送验证码
    return init();

    function init() {

    }

    function next() {
      var params = angular.copy(vm.register);
      AuthService
        .register(params)
        .then(function (res) {
          if (vm.register.Mcode && vm.obj === vm.register.username) {
            //验证验证码是否正确
            AuthService
              .compareCheckCode(vm.register)
              .then(function (res) {
                if (res.data === '验证码正确') {
                  $state.go('resetpassword',$stateParams);
                } else {
                  toaster.pop('error', '验证码错误');
                }
              });
          } else {
            toaster.pop('warning', '请输入与手机号匹配的验证码');
          }
        });
    }

    function sendCode() {
      if (vm.register.username) {
        /*******************************检查手机号是否正确***************************************************/
        if ($stateParams.status === 'company') {
          var data = {
            phonenume: vm.register.username,
            username: $stateParams.username
          };
          AuthService
            .checkPhone(data)
            .then(function (res) {
              if (res.data) {
                vm.sendCodeDemo();
              }
            })
        } else {
          vm.sendCodeDemo();
        }
      } else {
        toaster.pop('error', '请输入正确的手机号');
      }
    }

    function sendCodeDemo() {
      AuthService
        .register(vm.register)
        .then(function (res) {
          if (($stateParams.status === 'company') || (res.data === 'false' && $stateParams.status === 'freelance')) {
            var second = 60,
              timePromise = undefined;
            if (vm.paraevent) {
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
                .then(function (res) {
                  vm.register['Mcode'] = res.data[0].msg;
                  vm.obj = res.data[0].obj;
                })
            }
          } else if ((res.data === 'false' && $stateParams.status === 'company') || (res.data === 'true' && $stateParams.status === 'freelance')) {
            toaster.pop('error', '该账号未注册');
          }
        });
    }


  }
})();
