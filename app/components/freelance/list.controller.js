(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreelanceListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, FreelanceService, AuthService) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.choice = choice;
    vm.first = first;
    vm.last = last;
    vm.filterPage = filterPage;
    vm.more = more;
    vm.selectCity = selectCity;
    vm.selectProvince = selectProvince;
    vm.tag = false;
    vm.params = {
      address: '',
      jobage: '',
      money: ''
    };
    vm.filter = {
      1: null,
      2: null,
      3: null,
    };
    vm.jobAges = [
      {
        id:0,
        name: '应届毕业生'
      },
      {
        id:1,
        name: '1-3年'
      },
      {
        id:2,
        name: '4-6年'
      },
      {
        id:3,
        name: '7-10年'
      },
      {
        id:4,
        name: '10年以上'
      }];
    vm.pageArr = [];
    vm.pageList = {
      currentPage: 1, //当前页数
      pageSize: 10 //每页条数
    };
    angular.extend(vm.params, vm.pageList);


    return init();

    function init() {
      $scope.$watch('vm.filter', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if(vm.filter[1] && vm.filter[1].flag){
            vm.params['provinceid'] = vm.filter[1].id;
            if(vm.params.address){
              delete vm.params.address;
            }
          }else {
            vm.params.address = vm.filter[1];
            delete vm.params.provinceid;
          }
          vm.params.jobage = vm.filter[2];
          vm.params.money = vm.filter[3];
          vm.params['currentPage'] = 1;
          vm.params['pageSize'] = 10;
          vm.pageList.currentPage = 1;
          vm.pageList.pageSize = 10;
          FreelanceService
            .list(vm.params)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
              vm.pageArr = [];
              for (var i = 1; i <= res.data.totalPage; i++) {
                vm.pageArr.push(i);
              }
              angular.forEach(vm.lists,function(data){
                data.jobage = vm.jobAges.filter(function(i){
                  return data.jobage === i.id;
                })
              });
            })
        }
      }, true);
      $scope.$watch('vm.pageList.currentPage', function (newValue, oldValue, scope) {
        if (newValue != oldValue) {
          vm.params.currentPage = vm.pageList.currentPage;
          FreelanceService
            .list(vm.params)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
              angular.forEach(vm.lists,function(data){
                data.jobage = vm.jobAges.filter(function(i){
                  return data.jobage === i.id;
                })
              });
            })
        }
      }, true);
      FreelanceService
        .list(vm.pageList)
        .then(function (res) {
          vm.lists = res.data.jsonArray;
          angular.forEach(vm.lists,function(data){
            data.jobage = vm.jobAges.filter(function(i){
              return data.jobage === i.id;
            })
          });
          for (var i = 1; i <= res.data.totalPage; i++) {
            vm.pageArr.push(i);
          }
        });
      FreelanceService
        .province()
        .then(function (res) {
          vm.citys = res.data;
        });
      AuthService
        .experience()
        .then(function(res){
          vm.experiences = res.data;
        });
      AuthService
        .skill()
        .then(function(res){
          vm.skills = res.data;
        });
    }

    function choice(index, data) {
      //筛选条件选择活动项
      vm.filter[index] = data;
      vm.active = data;
    }

    function first() {
      //第一页
      vm.pageList.currentPage = 1;
    }

    function last() {
      //最后一页
      vm.pageList.currentPage = vm.pageArr.length;
    }

    function filterPage(data) {
      //分页选择
      vm.pageList.currentPage = data;
    }

    function more() {
      //更多省市按钮
      vm.tag = !vm.tag;
    }

    function selectCity(data) {
      vm.select = data;
      vm.filter[1] = data.id;
      vm.tag = !vm.tag;
    }

    function selectProvince(data){
      console.log(data);
      vm.filter[1] = data;
      vm.tag = !vm.tag;
    }
  }
})();
