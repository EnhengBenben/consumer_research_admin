(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, CompanyService) {
    var vm = this;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    vm.pageArr = [];

    return init();

    function init() {
      vm.pageArr = [];
      vm.pageList = {
        currentPage: 1, //当前页数
        pageSize: 10 //每页条数
      };
      CompanyService
        .list(vm.pageList)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.pageTotal; i++) {
            vm.pageArr.push(i);
          }
        });
      $scope.$watch('vm.pageList.currentPage', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          CompanyService
            .list(vm.pageList)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
            })
        }
      }, true);
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
  }
})();
