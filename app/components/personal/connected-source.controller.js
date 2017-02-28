(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalConnectedSourceCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, PersonalService) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;

    return init();

    function init() {
     /* vm.lists = [{id: 1, name: '百度糯米', time: '2017-02-10', sourceType: '公司', connectStyle: '请求撮合沟通'},
        {id: 2, name: '郭涛', time: '2017-02-10', sourceType: '顾问', connectStyle: '付费查看'}];*/
      vm.pageList = {
        currentPage: 1,
        pageSize: 10
      };
      vm.params = {
        userid: vm.user.userid
      };
      angular.extend(vm.params, vm.pageList);
      PersonalService
        .toSearchFBHelperInfo(vm.params)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
          vm.pageArr = [];
          for (var i = 1; i <= res.data.pageTotal; i++) {
            vm.pageArr.push(i);
          }
        })
    }

    function first() {
      vm.pageList.currentPage = 1;
    }

    function last() {
      vm.pageList.currentPage = vm.pageArr.length;
    }

    function filterPage(data) {
      vm.pageList.currentPage = data;
      vm.params.currentPage = data;
      PersonalService
        .toSearchFBHelperInfo(vm.params)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
        })
    }

  }
})();
