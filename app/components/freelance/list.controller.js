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
    console.log();
    vm.filter = {
      1:'全国',
      2: '不限',
      3: '不限',
      4: '推荐',
    };
    vm.pageArr = [];
    vm.pageList = {
      currentPage: 1, //当前页数
      pageSize: 10 //每页条数
    };


    return init();

    function init(){
      FreelanceService
        .list(vm.pageList)
        .then(function(res){
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.totalPage; i++) {
            vm.pageArr.push(i);
          }
        })
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
