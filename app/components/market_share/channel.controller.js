(function () {
  'use strict';

  angular
    .module('app')
    .controller('MarketChannelCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, $state, $stateParams, MarketService) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.runBack = runBack;
    vm.getUpListTop = getUpListTop;
    vm.getOffListTop = getOffListTop;
    vm.lineBottom = lineBottom;
    vm.setPage = setPage;
    vm.sort = $localStorage.sort;
    vm.sortName = $localStorage.sortName;
    vm.page = 0;
    vm.date = angular.copy($localStorage.initDate);
    angular.extend(vm.date,{sort:vm.sort});
    vm.params = angular.copy($localStorage.initDate);
    angular.extend(vm.params,{sort:vm.sort});
    return init();

    function init() {
      if ($stateParams.status === 'online') {
        vm.date['line'] = 'up_model';
        vm.params['line'] = 'up'
        vm.date['sign'] = vm.page;
        vm.getUpListTop(vm.params);
        vm.lineBottom(vm.date)
      }
      if ($stateParams.status === 'line') {
        vm.date['line'] = 'off_model';
        vm.params['line'] = 'off';
        vm.date['sign'] = vm.page;
        vm.getOffListTop(vm.params);
        vm.lineBottom(vm.date);
      }

      $scope.$on('changeDate', function (d, data) {
        vm.page = 0;
        vm.date = angular.copy(data);
        angular.extend(vm.date,{sort:vm.sort});
        vm.params = angular.copy(data);
        angular.extend(vm.params,{sort:vm.sort});
        vm.date['sign'] = vm.page;
       //获取父页面的dateType,data
        if ($stateParams.status === 'online') {
          vm.date['line'] = 'up_model';
          vm.params['line'] = 'up';
          vm.getUpListTop(vm.params);
          vm.lineBottom(vm.date);
        } else if ($stateParams.status === 'line') {
          vm.date['line'] = 'off_model';
          vm.params['line'] = 'off';
          vm.getOffListTop(vm.params);
          vm.lineBottom(vm.date);
        }
      });
    }

    function getUpListTop(data) {
      MarketService
        .onLineTop(data)
        .then(function (res) {
          vm.listdatas = [[],[],[]];
         for(var i=0;i<res.data.result_data.length;i++){
           for(var j=0;j<res.data.result_data[i].length;j++){
             if(res.data.result_data[i][j].line === 'up_up'){
               vm.listdatas[0].push(res.data.result_data[i][j]);
               break;
             }
           }
           for(var j=0;j<res.data.result_data[i].length;j++){
             if(res.data.result_data[i][j].line === '专业电商'){
               vm.listdatas[1].push(res.data.result_data[i][j]);
               break
             }
           }
           for(var j=0;j<res.data.result_data[i].length;j++){
             if(res.data.result_data[i][j].line === '平台电商'){
               vm.listdatas[2].push(res.data.result_data[i][j]);
               break;
             }
           }
         }
    })
    }

    function getOffListTop(data) {
      MarketService
        .offLineTop(data)
        .then(function (res) {
          vm.listdatas = [[],[],[]];
          for(var i=0;i<res.data.result_data.length;i++){
            for(var j=0;j<res.data.result_data[i].length;j++){
              if(res.data.result_data[i][j].line === 'off_off'){
                vm.listdatas[0].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j=0;j<res.data.result_data[i].length;j++){
              if(res.data.result_data[i][j].line === 'off_KA'){
                vm.listdatas[1].push(res.data.result_data[i][j]);
                break
              }
            }
            for(var j=0;j<res.data.result_data[i].length;j++){
              if(res.data.result_data[i][j].line === 'off_other'){
                vm.listdatas[2].push(res.data.result_data[i][j]);
                break;
              }
            }
          }
        })
    }

    function lineBottom(data) {
      vm.MarketshareRegion = [[], [], [], [], []];
      MarketService
        .lineBottom(data)
        .then(function (res) {
         vm.topTenLists = res.data.result_data;
        });

    }

    function runBack() {
      $state.go('app.market.list');
    }

    function setPage(data) {
      vm.page = data;
      vm.date.sign = data;
      vm.lineBottom(vm.date);
    }

  }
})();
