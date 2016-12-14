(function () {
  'use strict';

  angular
    .module('app')
    .controller('ContractorsListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, ContractorsService) {
    var vm = this;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    vm.page = {
      pageSize: 10,
      currentPage: 1
    };
    vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'}, {id: 2, name: '民办非企业单位'},
                      {id: 3, name: '个体工商户'}, {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];

    return init();

    function init(){
      vm.pageArr = [];
      vm.pageList = {
        currentPage: 1, //当前页数
        pageSize: 1 //每页条数
      };
      vm.nowPage = vm.pageList.nowPage;
      for (var i = 1; i <= vm.pageList.total; i++) {
        vm.pageArr.push(i);
      }
      ContractorsService
        .list(vm.page)
        .then(function(res){
          console.log(res);
          vm.lists = res.data.jsonArray;
          for (var i = 1; i <= res.data.total; i++) {
            vm.pageArr.push(i);
          }
          vm.lists.map(function(i){
             vm.flattypeArr.map(function(j){
               if(i.flattype === j.id){
                 return i.flattype = j.name;
               }
             })
          })
        })
      $scope.$watch('vm.pageList.currentPage', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          ManageService
            .more(vm.pageList)
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
