(function () {
  'use strict';

  angular
    .module('app')
    .controller('AveragePriceChannelCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, $state, $stateParams, AverageService) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.runBack = runBack;
    vm.getOnLineListData = getOnLineListData;
    vm.getOffListData = getOffListData;
    vm.sortName = $localStorage.sortName;
    vm.topTen = topTen;
    vm.page = 0;
    vm.setPage = setPage;
    vm.params = $localStorage.initDate;
    vm.params['sort'] = $localStorage.sort;
    vm.params2 = $localStorage.initDate;
    vm.params2['sort'] = $localStorage.sort;
    vm.params2['sign'] = vm.page;
    return init();

    function init() {
      if (vm.status === 'up') {
        vm.getOnLineListData(vm.params);
      } else if (vm.status === 'off') {
        vm.getOffListData(vm.params);
      }
      vm.params2['line'] = vm.status;
      vm.topTen(vm.params2);

      $scope.$on('changeDate', function (d, data) {
        vm.page = 0;
        vm.params.date = data.date;
        vm.params.dateType = data.dateType;
        vm.params2.date = data.date;
        vm.params2.dateType = data.dateType;
        if (vm.status === 'up') {
          vm.getOnLineListData(vm.params);
        } else if (vm.status === 'off') {
          vm.getOffListData(vm.params);
        }
        vm.topTen(vm.params2);
      });
    }

    function getOnLineListData(data) {
      AverageService
        .onLine(data)
        .then(function (res) {
          vm.MarketshareChannel = res.data.result_data;
        })
    }

    function getOffListData(data) {
      AverageService
        .offLine(data)
        .then(function (res) {
          vm.MarketshareChannel = res.data.result_data;
        })
    }

    function topTen(data){
      AverageService
        .topTen(data)
        .then(function(res){
          vm.MarketshareRegion = res.data.result_data;
        })
    }

    function setPage(data) {
      vm.page = data;
      vm.params2.sign = data;
      vm.topTen(vm.params2);
    }

    function runBack() {
      $state.go('app.average.list');
    }

  }
})();
