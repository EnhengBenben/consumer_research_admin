(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreelanceListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, FreelanceService) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.choice = choice;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    vm.more = more;
    vm.selectCity = selectCity;
    vm.tag = false;
    console.log();
    vm.filter = {
      1: null,
      2: null,
      3: null,
    };
    vm.pageArr = [];
    vm.pageList = {
      currentPage: 1, //当前页数
      pageSize: 10 //每页条数
    };


    return init();

    function init() {
      $scope.$watch('vm.filter', function (newValue, oldValue) {
        if (newValue != oldValue) {

        }
      }, true);
      FreelanceService
        .list(vm.pageList)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.totalPage; i++) {
            vm.pageArr.push(i);
          }
        })
      FreelanceService
        .province()
        .then(function (res) {
          vm.citys = res.data;
        })
    }

    function choice(index, data) {
      vm.filter[index] = data;
      vm.active = data;
    }

    function first() {

    }

    function last() {

    }

    function filterPage(data) {
      vm.nowPage = data;
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
