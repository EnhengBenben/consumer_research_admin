(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyBaseCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService, $interval ) {
    var vm = this;
    vm.next = next;
    vm.sendCode = sendCode;
    vm.paracont = "获取验证码";
    vm.paraevent = true;
    vm.unitaddr = {
      province: null,
      city: null
    };
    vm.initDate = new Date();
    vm.initDate.setFullYear(2099,11,30);
    vm.registertype = $localStorage.registertype;
    return init();

    function init(){
      if($localStorage.base){
        vm.base = $localStorage.base;
        AuthService
          .city({provinceId: parseInt(vm.base.unitaddr.split(',')[0])})
          .then(function(res){
            vm.unitaddr = {
              province: parseInt(vm.base.unitaddr.split(',')[0]),
              city: parseInt(vm.base.unitaddr.split(',')[1])
            };
            vm.cities = res.data;
          });
      }else {
        vm.base = {};
      }
      vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'},
                        {id: 2, name: '民办非企业单位'}, {id: 3, name: '个体工商户'},
                        {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];
      AuthService
        .province()
        .then(function(res){
          vm.provinces = res.data;
        });
      $scope.$watch('vm.unitaddr.province',function(newValue, oldValue){
        if(newValue != oldValue){
          AuthService
            .city({provinceId:vm.unitaddr.province})
            .then(function(res){
              vm.cities = res.data;
            });
        }
      }, true)
    }

    function sendCode(){
      if(vm.base.telnum){
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
                  .toCheckCode({username: vm.base.telnum})
                  .then(function(res){
                    vm.base['Mcode'] = res.data[0].msg;
                    vm.obj = res.data[0].obj;
                  })
              }
            } else if (res.data === 'false') {
              toaster.pop('error', '该手机号已注册');
            }
          });
      }else {
        toaster.pop('error', '请输入正确的手机号');
      }
    }

    function next(){
      if(vm.base.Mcode && vm.obj === vm.base.telnum){
        //验证验证码是否正确
        AuthService
          .compareCheckCode({username: vm.base.telnum, Mcode: vm.base.Mcode, code: vm.base.code})
          .then(function (res) {
            if(res.data === '验证码正确'){
              angular.extend(vm.base,{unitaddr: vm.unitaddr.province + ',' + vm.unitaddr.city});
              $localStorage.base = vm.base;
              $state.go('company.experience');
              toaster.pop('success','已保存，请继续完成注册');
            }else {
              toaster.pop('error','验证码错误');
            }
          });
      }else {
        toaster.pop('warning','请输入与手机号匹配的验证码');
      }
    /*  $scope.base = function(isValid) {

        // check to make sure the form is completely valid
        if (isValid) {
          alert('请完善表单');
        }else {

        }
      };*/
    }
  }
})();
