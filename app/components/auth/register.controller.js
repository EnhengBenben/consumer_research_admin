(function () {
  'use strict';

  angular.module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['$scope', 'toaster', 'AuthService', '$state', '$localStorage', '$interval', 'ENDPOINT'];

  function RegisterController($scope, toaster, AuthService, $state, $localStorage, $interval, ENDPOINT) {
    var vm = this;
    vm.register = {};
    vm.regist = regist;
    vm.sendCode = sendCode;
    vm.read = true;
    vm.image = ENDPOINT + '/getSysManageLoginCode.action?time=' + new Date() ;
    return init();

    function init() {
      vm.paracont = "获取验证码";
      vm.paraevent = true;
      vm.getCode = function(){
        vm.image = ENDPOINT + '/getSysManageLoginCode.action?time=' + new Date() ;
      };
     /* AuthService
        .findImgCode()
        .then(function(res){
          vm.image = res.data;
        })*/
    }

    function regist() {
     if(vm.read){
       var params = angular.copy(vm.register);
       if(params.acctype === 2){
         params.acctype = 0;
         $localStorage.registertype = 1;
       }else if(params.acctype === 1){
         delete $localStorage.registertype;
       }else if(params.acctype === 0){
         $localStorage.registertype = 0;
       }
       AuthService
         .register(params)
         .then(function (res) {
           if (vm.register.acctype === 1) {
             if(vm.register.Mcode && vm.obj === vm.register.username){
               //验证验证码是否正确
               AuthService
                 .compareCheckCode(vm.register)
                 .then(function (res) {
                   if(res.data === '验证码正确'){
                     delete $localStorage.base;
                     delete $localStorage.experience;
                     delete $localStorage.skill;
                     $localStorage.username = vm.register;
                     $state.go('free.base');
                   }else {
                     toaster.pop('error','验证码错误');
                   }
                 });
             }else {
               toaster.pop('warning','请输入与手机号匹配的验证码');
             }
           } else if (vm.register.acctype === 0 || vm.register.acctype === 2) {
             if (res.data === 'false') {
               toaster.pop('error', '该账号已注册');
             }else {
               if(vm.register.validateCode){
                 AuthService
                   .checkImgCode({'validateCode': vm.register.validateCode})
                   .then(function(res){
                     if(res.data=="ok"){
                       delete $localStorage.base;
                       delete $localStorage.experience;
                       delete $localStorage.skill;
                       $localStorage.username = params;
                       $state.go('company.base');
                     }else{
                       vm.getCode();
                       toaster.pop('error', '验证码错误');
                     }
                   })
               }else {
                 toaster.pop('验证码不能为空');
               }
             }
           }
         });
     }else {
       alert('请选择同意用户协议后再注册');
     }
    }

    function sendCode(){
     if(vm.register.username){
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
     }else {
       toaster.pop('error', '请输入正确的手机号');
     }
    }
  }

})();
