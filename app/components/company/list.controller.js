(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, CompanyService, FreelanceService) {
    var vm = this;
    vm.first = first;
    vm.choice = choice;
    vm.last = last;
    vm.more = more;
    vm.selectCity = selectCity;
    vm.filterPage = filterPage;
    vm.pageArr = [];

    return init();

    function init() {
      vm.filter = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null
      };
      vm.pageArr = [];
      vm.pageList = {
        currentPage: 1, //当前页数
        pageSize: 10 //每页条数
      };
      FreelanceService
        .province()
        .then(function (res) {
          vm.citys = res.data;
        });
      CompanyService
        .list(vm.pageList)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.pageTotal; i++) {
            vm.pageArr.push(i);
          }
        });
      $scope.$watch('vm.filter', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          var data = {
            addr: vm.filter[2],
            requesttype: vm.filter[1],
            cycle: vm.filter[3],
          };
          angular.extend(data,vm.pageList);
          console.log(data);
          CompanyService
            .list(data)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
            })
        }
      }, true);
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

    function choice(index, data) {
      console.log(index);
      vm.filter[index] = data;
      vm.active = data;
    }

    function more() {
      vm.tag = !vm.tag;
    }

    function selectCity(data) {
      vm.select = data;
      vm.filter[1] = data.id;
      vm.tag = !vm.tag;
    }
  }
})();
