(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeResumeCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    vm.back = back;
    vm.levels = [{id: 0, name: '初级工程师'}, {id: 1, name: '中级工程师'}, {id: 2, name: '高级工程师'}];
    vm.certificates = [{id: 0, name: '微软证书'}, {id: 1, name: 'ORACLE DBA认证'}, {id: 2, name: '其它'}];
    return init();

    function init() {
      AuthService
        .findJob()
        .then(function (res) {
          vm.jobs = res.data;
        });
    }

    function next() {
      angular.extend(vm.resume, $localStorage.username);
      angular.extend(vm.resume, $localStorage.base);
      angular.extend(vm.resume, $localStorage.experience);
      angular.extend(vm.resume, $localStorage.skill);
      AuthService
        .personal(vm.resume)
        .then(function (res) {
            $state.go('go.login');
            toaster.pop('success', '已保存，请继续完成注册');
        });
    }
    function back(){
      history.back(-1);
    }
  }
})();
