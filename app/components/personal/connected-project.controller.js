(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalConnectedProjectCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, PersonalService) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    vm.pageList = {
      currentPage: 1,
      pageSize: 10
    };
    vm.params = {
      userid: vm.user.userid,
    };
    angular.extend(vm.params, vm.pageList);

    return init();

    function init() {
     /* vm.lists = [{id: 1, name: '移动端App开发项目', time: '2017-02-10', connectStyle: '请求撮合沟通'},
        {id: 2, name: '移动端App开发项目2', time: '2017-02-10', connectStyle: '请求撮合沟通'}];*/
      vm.pageList = {
        currentPage: 1,
        pageSize: 10
      };
      //vm.pageArr = [1, 2, 3];
      PersonalService
        .toSearchHelpInfo(vm.params)
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
    }

  }
})();
