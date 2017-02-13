(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyMoreCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, ManageService) {
    var vm = this;
    vm.choice = choice;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    vm.openStatus = openStatus;
    vm.user = $localStorage.user;
    vm.filter = {
      1: '不限',
      2: '全国',
      3: '不限',
      4: '不限',
      5: '不限'
    };
    vm.pageArr = [];
    vm.pageList = {
      currentPage: 1, //当前页数
      pageSize: 5 //每页条数
    };
    vm.nowPage = vm.pageList.nowPage;
    for (var i = 1; i <= vm.pageList.total; i++) {
      vm.pageArr.push(i);
    }
    return init();

    function init() {
      vm.params = {};
      angular.extend(vm.params,vm.user);
      angular.extend(vm.params,vm.pageList);
      ManageService
        .more(vm.params)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.total; i++) {
            vm.pageArr.push(i);
          }
        })

      $scope.$watch('vm.pageList.currentPage', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          vm.params.currentPage = vm.pageList.currentPage;
          ManageService
            .more(vm.params)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
            })
        }
      }, true);
    }

    function choice(index, data) {
      vm.filter[index] = data;
      vm.active = data;
    }

    function first() {
      vm.pageList.currentPage = 1;
    }

    function last() {
      vm.pageList.currentPage = vm.pageArr.length;
    }

    function filterPage(data) {
      vm.pageList.currentPage = data;
    }

    function openStatus(data){
      if(data.cstatus === 1){
        data.cstatus = 2;
      }else if(data.cstatus === 2){
        data.cstatus = 1;
      }
      var params = {
        cstatus: data.cstatus,
        id: data.id
      };
      ManageService
        .updateCstatus(params)
        .then(function(res){
          if(params.cstatus === 1){
            toaster.pop('success','该项目已开启');
          }else {
            toaster.pop('error','该项目已关闭');
          }

        });
      return data;
    }
  }
})();
