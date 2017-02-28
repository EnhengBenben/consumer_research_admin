(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, AuthService, toaster, $scope, CompanyService, FreelanceService) {
    var vm = this;
    vm.first = first;
    vm.choice = choice;
    vm.last = last;
    vm.more = more;
    vm.selectProvince = selectProvince;
    vm.selectCity = selectCity;
    vm.filterPage = filterPage;
    vm.searchMan = searchMan;
    vm.pageArr = [];

    return init();

    function init() {
      vm.filter = {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
        6: null,
        job: null
      };
      AuthService
        .findJob()
        .then(function(res){
          vm.mantyprsLists = res.data;
        });
      vm.mantyprs = {
        name: null
      };
      vm.dateOptions1 = {
        maxDate: moment()
      };
      vm.dateOptions2 = {
        minDate: moment()
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
      $scope.$watch('vm.filter', function (newValue, oldValue) {
        if (newValue != oldValue) {
          var data = {
            job: vm.filter.job || null,
            other: vm.filter.other || null,
            requesttype: vm.filter[1],
            price1: vm.filter.startPrice || null,
            price2: vm.filter.endPrice || null,
          };
          if(newValue.test === oldValue.test){
            vm.pageList.currentPage = 1;
          }
            angular.extend(data,vm.pageList);
          if((typeof vm.filter[3] === 'number' || vm.filter[3] === null)){
            data['publishTime'] = vm.filter[3];
            if(vm.dataTime && vm.dataTime.publishtime){
              delete  vm.dataTime.publishtime;
            }
          }else {
            data['zdPublishTime'] = vm.filter[3];
            //项目发布日期选择指定时间
          }
          if((typeof vm.filter[6] === 'number'  || vm.filter[6] === null)){
            data['startTime'] = vm.filter[6];
            if(vm.dataTime && vm.dataTime.starttime)
              delete  vm.dataTime.starttime;
          }else {
            data['zdStartTime'] = vm.filter[6];
            //项目开始日期选择指定时间
            //console.log(vm.filter[6]);
          }
          if(vm.filter[2] && vm.filter[2].flag){
            data['provinceid'] = vm.filter[2].id;
          }else if(vm.filter[2]){
            data['addrs'] = vm.filter[2];
          }
          if(vm.filter[1] != 0 && vm.filter[1] != null){
            data['ages'] = vm.filter[4];
            data['price'] = vm.filter[5];
          }
          CompanyService
            .list(data)
            .then(function (res) {
              vm.lists = res.data.jsonArray;
              vm.pageArr = [];
              for (var i = 1; i <= res.data.pageTotal; i++) {
                vm.pageArr.push(i);
              }
            })
        }
      }, true);
      $scope.$watch('vm.dataTime', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if(vm.dataTime.publishtime){
            vm.filter[3] = vm.dataTime.publishtime;
          }else {
          delete  vm.dataTime.publishtime;
          }
          if(vm.dataTime.starttime){
            vm.filter[6] = vm.dataTime.starttime;
          }else {
          delete  vm.dataTime.starttime ;
          }
        }
      }, true);
      $scope.$watch('vm.pageList.currentPage', function (newValue, oldValue) {
        if (newValue != oldValue) {
         vm.filter['test'] = vm.pageList.currentPage;
        }
      }, true);
      $scope.$watch('vm.manList.name', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if(vm.manList.name === '其他'){
            vm.searchTag = true;
            vm.filter.job = null;
          }else if(vm.manList.name === 'SAP'){
            vm.sapTag = true;

          } else {
            vm.searchTag = false;
            vm.sapTag = false;
            delete vm.filter.other;
            vm.filter.job = vm.manList.name;
          }
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
      vm.filter[index] = data;
      vm.active = data;
    }

    function more() {
      vm.tag = !vm.tag;
    }

    function selectCity(data) {
      vm.select = data;
      if(data.provinceId){
        vm.provinceId = data.provinceId;
      }
      vm.filter[2] = data.id;
      vm.tag = !vm.tag;
    }

    function selectProvince(data){
      vm.filter[2] = data;
      vm.tag = !vm.tag;
    }

    function searchMan(){
      if(vm.mantyprs.name)
      vm.filter['other'] = vm.mantyprs.name;
      else {
        toaster.pop('warning', '请输入工程师类型')
      }
    }

  }
})();
