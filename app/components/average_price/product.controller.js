(function () {
  'use strict';

  angular
    .module('app')
    .controller('AveragePriceProductCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, AverageService, $stateParams, $state) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.getListData = getListData;
    vm.page = 0;
    vm.setPage = setPage;
    vm.getTopTenData = getTopTenData;
    vm.sort = $localStorage.sort;
    vm.sortName = $localStorage.sortName;
    vm.lines = [{id: 'online', name: '线上'}, {id: 'line', name: '线下'}];
    vm.products = [{id: 'guaji', name: '挂机'}, {id: 'guiji', name: '柜机'}, {id: 'bianpin', name: '变频'}, {
      id: 'dingpin',
      name: '定频'
    }];
    vm.date = $localStorage.initDate;
    vm.filter = {
      line:'online',
      product:  vm.status
    };
    vm.params2 = {};
    if(vm.filter.product === 'guaji'){
      vm.params = {
        parmone: 'guaji,guaji',
        parmtwo: 'bianpin,bianpin',
        parmthree: 'dingpin,dingpin'
      };
      vm.params2.productType = 'guaji';
    }
    if(vm.filter.product === 'guiji'){
      vm.params = {
        parmone: 'guiji,guiji',
        parmtwo: 'bianpin,bianpin',
        parmthree: 'dingpin,dingpin'
      };
      vm.params2.productType = 'guiji';
    }
    if(vm.filter.product === 'bianpin'){
      vm.params = {
        parmone: 'bianpin,guaji_bianpin',
        parmtwo: 'guaji,guaji',
        parmthree: 'guiji,guiji'
      };
      vm.params2.productType = 'bianpin';
    }
    if(vm.filter.product === 'dingpin'){
      vm.params = {
        parmone: 'dingpin,guaji_dingpin',
        parmtwo: 'guaji,guaji',
        parmthree: 'guiji,guiji'
      };
      vm.params2.productType = 'dingpin';
    }
    angular.extend(vm.params,vm.date);
    angular.extend(vm.params2,vm.date);
    angular.extend(vm.params,{line:vm.filter.line});
    if(vm.filter.line === 'online'){
      vm.params2['line'] = 'up';
    }
    if(vm.filter.line === 'line'){
      vm.params2['line'] = 'off';
    }
    vm.params2['sign'] = 0;
    vm.params2['sort'] = $localStorage.sort;
    vm.params['sort'] = vm.sort;
    vm.params2['sort'] = vm.sort;
    vm.getListData(vm.params);
    vm.getTopTenData(vm.params2);

    $scope.$watch('vm.filter',function(newValue,oldValue){
      if(newValue != oldValue){
        vm.params2['sign'] = 0;
        if(vm.filter.product === 'guaji'){
          vm.params = {
            parmone: 'guaji,guaji',
            parmtwo: 'bianpin,bianpin',
            parmthree: 'dingpin,dingpin'
          };
          vm.params2.productType = 'guaji';
        }
        if(vm.filter.product === 'guiji'){
          vm.params = {
            parmone: 'guiji,guiji',
            parmtwo: 'bianpin,bianpin',
            parmthree: 'dingpin,dingpin'
          };
          vm.params2.productType = 'guiji';
        }
        if(vm.filter.product === 'bianpin'){
          vm.params = {
            parmone: 'bianpin,guaji_bianpin',
            parmtwo: 'guaji,guaji',
            parmthree: 'guiji,guiji'
          };
          vm.params2.productType = 'bianpin';
        }
        if(vm.filter.product === 'dingpin'){
          vm.params = {
            parmone: 'dingpin,guaji_dingpin',
            parmtwo: 'guaji,guaji',
            parmthree: 'guiji,guiji'
          };
          vm.params2.productType = 'dingpin';
        }
        if(vm.filter.line === 'online'){
          vm.params['line'] = 'up';
          vm.params2['line'] = 'up';
        }
        if(vm.filter.line === 'line'){
          vm.params['line'] = 'off';
          vm.params2['line'] = 'off';
        }
        angular.extend(vm.params,vm.date);
        angular.extend(vm.params2,vm.date);
        angular.extend(vm.params,{line:vm.filter.line});
        vm.params2['sort'] = vm.sort;
        vm.params['sort'] = vm.sort;
        vm.getListData(vm.params);
        vm.getTopTenData(vm.params2);
      }
    },true);
    vm.runBack = runBack;

    return init();

    function init() {
      $scope.$on('changeDate', function (d, data) {
                 //获取父页面的dateType,data
        vm.date = data;
        vm.params.date = data.date;
        vm.params2['sign'] = 0;
        vm.params2.date = data.date;
        vm.params2.dateType = data.dateType;
        vm.params.dateType = data.dateType;
        vm.getListData(vm.params);
        vm.getTopTenData(vm.params2);
      });
    }

    function getListData(data){
      AverageService
        .productTop(data)
        .then(function(res){
         vm.listTop = res.data.result_data;
        })
    }
    function setPage(data) {
      vm.page = data;
      vm.params2.sign = vm.page;
      vm.getTopTenData(vm.params2);
    }

    function getTopTenData(data){
      AverageService
        .productTopTen(data)
        .then(function(res){
          vm.topTenLists = res.data.result_data;
        });
    }

    function runBack() {
      $state.go('app.average.list');
    }
  }
})();
