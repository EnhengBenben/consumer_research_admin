/**
 * Created by Administrator on 2017/1/19.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ResetPasswordCtrl', Controller);

  /* @ngInject */
  function Controller( toaster, AuthService, $state, $localStorage, $interval, $stateParams) {
    var vm = this;
    vm.reset = reset;
    vm.base = {
      username: $stateParams.username,
      password: '',
      passwordagin: ''
    };
    return init();

    function init() {

    }

    function reset(){
      AuthService
        .updatePassword(vm.base)
        .then(function(res){
          if(res.data === '密码修改成功'){
            toaster.pop('success', '密码修改成功');
            $state.go('go.login');
          }else {
            toaster.pop('error', '密码修改失败')
          }
        })
    }



  }
})();
