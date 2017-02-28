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
    vm.nextBtn = 1;
    vm.levels = [{id: 0, name: '初级工程师'}, {id: 1, name: '中级工程师'}, {id: 2, name: '高级工程师'}];
    vm.certificates = [{id: 0, name: '微软证书'}, {id: 1, name: 'ORACLE DBA认证'}, {id: 2, name: '其它'}];
    vm.resume = {
      history: '',
      proexperience: '',
      educational: ''
    };
    return init();

    function init() {
      AuthService
        .findJob()
        .then(function (res) {
          vm.jobs = res.data;
        });
    }

    function next() {
      if(vm.resume.history === ""){
        toaster.pop('error', '请填写您的雇佣历史');
      }else if(vm.resume.history.length < 17){
        toaster.pop('error', '雇佣历史不得少于10个字');
      }else if(vm.resume.proexperience === ""){
        toaster.pop('error', '请填写您的项目履历');
      }else if(vm.resume.proexperience.length < 17){
        toaster.pop('error', '项目履历不得少于10个字');
      }else if(vm.resume.educational === ""){
        toaster.pop('error', '请填写您的教育背景');
      }else if(vm.resume.educational.length < 17){
        toaster.pop('error', '教育背景不得少于10个字');
      }else if(vm.nextBtn === 1){
        vm.nextBtn++;
        angular.extend(vm.resume, $localStorage.username);
        angular.extend(vm.resume, $localStorage.base);
        angular.extend(vm.resume, $localStorage.experience);
        angular.extend(vm.resume, $localStorage.skill);
        AuthService
          .personal(vm.resume)
          .then(function (res) {
            vm.nextBtn = 1;
            // delete $localStorage.username;
            delete $localStorage.base;
            delete $localStorage.experience;
            delete $localStorage.skill;
            $state.go('finish');
            toaster.pop('success', '已保存，请继续完成注册');
          });
      }

    }
    function back(){
      history.back(-1);
    }
  }
})();
