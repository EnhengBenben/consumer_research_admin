(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyQualificationCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;
    vm.next = next;


    return init();

    function init(){

    }

    function next(){
      $state.go('go.login');
      toaster.pop('success','恭喜！注册已完成');
    }
  }
})();
