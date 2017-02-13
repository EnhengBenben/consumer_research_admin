/**
 * Created by Administrator on 2017/1/18.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ForgetPasswordCtrl', Controller);

  /* @ngInject */
  function Controller(toaster, AuthService, $state, $localStorage, $interval, ENDPOINT) {
    var vm = this;
    vm.register = {};
    vm.regist = regist;
    vm.read = true;
    vm.image = ENDPOINT + '/getSysManageLoginCode.action';
    return init();

    function init() {
      vm.paracont = "获取验证码";
      vm.paraevent = true;
      vm.getCode = function () {
        vm.image = ENDPOINT + '/getSysManageLoginCode.action?time=' + new Date();
      };
      /* AuthService
       .findImgCode()
       .then(function(res){
       vm.image = res.data;
       })*/
    }

  /*  function regist() {
      var params = angular.copy(vm.register);
      AuthService
        .register(params)
        .then(function (res) {
          if (vm.register.acctype === 1) {
            if (vm.register.Mcode && vm.obj === vm.register.username) {
              //验证验证码是否正确
              AuthService
                .compareCheckCode(vm.register)
                .then(function (res) {
                  if (res.data === '验证码正确') {
                    $localStorage.username = vm.register;
                    $state.go('resetpassword', {status: 'free', username: vm.register.username});
                  } else {
                    toaster.pop('error', '验证码错误');
                  }
                });
            } else {
              toaster.pop('warning', '请输入与手机号匹配的验证码');
            }
          } else if (vm.register.acctype === 0 || vm.register.acctype === 2) {
            if (res.data === 'true') {
              toaster.pop('error', '该账号未注册');
            } else {
              if (vm.register.validateCode) {
                AuthService
                  .checkImgCode({'validateCode': vm.register.validateCode})
                  .then(function (res) {
                    if (res.data == "ok") {
                      $state.go('resetpassword', {status: 'company', username: vm.register.username});
                    } else {
                      vm.getCode();
                      toaster.pop('error', '验证码错误');
                    }
                  })
              } else {
                toaster.pop('验证码不能为空');
              }
            }
          }
        });
    }*/
    function regist() {
      var params = angular.copy(vm.register);
      if (vm.register.validateCode) {
        AuthService
          .checkImgCode({'validateCode': vm.register.validateCode})
          .then(function (res) {
            if (res.data == "ok") {
              AuthService
                .register(params)
                .then(function (res) {
                   if (res.data === 'false') {
                     if(vm.register.acctype === 0){
                       $state.go('checkusername', {status: 'company', username: vm.register.username});
                     }else {
                       $state.go('checkusername', {status: 'freelance', username: vm.register.username});
                     }
                   } else {
                     toaster.pop('error', '该账号未注册');
                   }
                });
            } else {
              vm.getCode();
              toaster.pop('error', '验证码错误');
            }
          })
      } else {
        toaster.pop('验证码不能为空');
      }
    }


  }
})();
