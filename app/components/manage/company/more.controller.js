(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyMoreCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;
    vm.choice = choice;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    console.log();
    vm.filter = {
      1:'不限',
      2: '全国',
      3: '不限',
      4: '不限',
      5: '不限'
    };
    vm.pageArr = [];
    vm.pageList = {
      nowPage: 1,
      total: 12
    };
    vm.nowPage = vm.pageList.nowPage;
    for(var i =1;i<= vm.pageList.total; i++){
      vm.pageArr.push(i);
    }


    return init();

    function init(){

    }

    function choice(index,data){
      console.log(data);
      vm.filter[index] = data;
      console.log(vm.filter);
      vm.active = data;
    }

    function first(){

    }

    function last(){

    }

    function filterPage(data){
      vm.nowPage = data;
    }
  }
})();
