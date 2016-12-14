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
    vm.user = $localStorage.user;
    console.log();
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
      pageSize: 10 //每页条数
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
          console.log(res);
          vm.lists = res.data.jsonArray;
          console.log(vm.lists);
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


      /*   vm.lists = [{
       id: 1,
       proname: '项目名称项目名称项目名称',
       intro: '项目简介项目简介',
       addr: '北京',
       company: '北京科技有限责任公司',
       price: 1000,
       starttime: '2016-12-12',
       endtime: '2016-12-13'
       },
       {
       id: 2,
       proname: '项目名称项目名称项目名称',
       intro: '项目简介项目简介',
       addr: '北京',
       company: '北京科技有限责任公司',
       price: 1000,
       starttime: '2016-12-12',
       endtime: '2016-12-13'
       }]*/
    }

    function choice(index, data) {
      console.log(data);
      vm.filter[index] = data;
      console.log(vm.filter);
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
  }
})();
