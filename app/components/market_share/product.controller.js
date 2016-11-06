(function () {
  'use strict';

  angular
    .module('app')
    .controller('MarketProductCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, MarketService, $stateParams, $state) {
    var vm = this;
    vm.$stateParams = $stateParams;
    vm.sortName = $localStorage.sortName;
    vm.status = $stateParams.status;
    vm.productTopTen = productTopTen;//top10数据
    vm.page = 0; //页码值
    vm.sortName = $localStorage.sortName; //显示顺序
    vm.sort = $localStorage.sort; //名称参数顺序
    vm.setPage = setPage; //页码按钮
    vm.line = 'up'; //线上线下值
    vm.setline = setline; //线上线下按钮
    vm.runBack = runBack; // 返回按钮
    vm.listData = listData; //获取数据
    if(vm.status === '挂机' || vm.status === '柜机'){
      vm.status = vm.status + ',变频,定频'
    }
    if(vm.status === '变频' || vm.status === '定频'){
      vm.status = vm.status + ',挂机,柜机'
    }
    vm.params = {
      productTypeDetails: vm.status,
      productType: $stateParams.status,
      sort: vm.sort
    };
    vm.params2 = {
      productType: $stateParams.status,
      sort: vm.sort,
    };
    angular.extend(vm.params,$localStorage.initDate);
    angular.extend(vm.params2,$localStorage.initDate);


    return init();

    function init(){
      vm.params['line'] = vm.line;
      vm.params2['line'] = vm.line;
      vm.params2['sign'] = vm.page;
      vm.listData(vm.params);
      vm.productTopTen(vm.params2);
      $scope.$on('changeDate', function(d,data) {
          vm.params = {
          productTypeDetails: vm.status,
          productType: $stateParams.status,
          sort: vm.sort
        };
        vm.params2 = {
          productType: $stateParams.status,
          sort: vm.sort,
          sign: 0
        };
        angular.extend(vm.params,data);
        angular.extend(vm.params2,data);
        vm.params['line'] = vm.line;
        vm.params2['line'] = vm.line;
        vm.params2['sign'] = vm.page;
        vm.listData(vm.params);
        vm.productTopTen(vm.params2);
      });
    }

    function setPage(data) {
      vm.page = data;
      vm.params2.sign = vm.page;
     vm.productTopTen(vm.params2);
    }

    function setline(data){
      vm.line = data;
      vm.params.line = vm.line;
      vm.params2.line = vm.line;
      vm.listData(vm.params);
      vm.productTopTen(vm.params2);
    }

    function listData(data){
      MarketService
        .productList(data)
        .then(function(res){
          vm.listTop = res.data.result_data;
        })
    }

    function productTopTen(data){
      MarketService
        .productTopTen(data)
        .then(function(res){
            vm.topTenLists = res.data.result_data;
        });
    }

    function runBack(){
      $state.go('app.market.list');
    }
  }
})();
