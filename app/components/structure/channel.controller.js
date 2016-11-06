(function () {
  'use strict';

  angular
    .module('app')
    .controller('StructureChannelCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, StructureService, $stateParams, $state) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.runBack = runBack;
    vm.page = '整体';
    vm.setPage = setPage;
    vm.sort = angular.copy($localStorage.sort);
    vm.sortName = $localStorage.sortName;
    vm.getListData = getListData;
    vm.params = {
      line: vm.status, //线上线下
      sort: vm.sort
    };
    angular.extend(vm.params, {channelType: vm.page}); //菜单
    angular.extend(vm.params,$localStorage.initDate); //时间参数

    return init();

    function init() {
      if (vm.status === 'up') {
        vm.line = '线上';
      } else if (vm.status === 'off') {
        vm.line = '线下';
      }
      vm.getListData(vm.params);
      $scope.$on('changeDate', function (d, data) {
        vm.params.date = data.date;
        vm.params.dateType = data.dateType;
        vm.getListData(vm.params);
      });
    }

    function runBack() {
      $state.go('app.structure.list');
    }

    function getListData(data) {
      StructureService
        .line(data)
        .then(function (res) {
          vm.lists = [[],[],[],[],[],[],[]];
          angular.forEach(res.data.result_data,function(i){
            if(i.brand === '美的'){
              vm.lists[0].push(i);
            }
            if(i.brand === '格力'){
              vm.lists[1].push(i);
            }
            if(i.brand === '海尔'){
              vm.lists[2].push(i);
            }
            if(i.brand === '奥克斯'){
              vm.lists[3].push(i);
            }
            if(i.brand === '志高'){
              vm.lists[4].push(i);
            }
            if(i.brand === '海信'){
              vm.lists[5].push(i);
            }
            if(i.brand === 'TCL'){
              vm.lists[6].push(i);
            }
          })
        })
    }

    function setPage(data) {
      vm.page = data;
      vm.params.channelType = vm.page;
      vm.getListData(vm.params);
    }
  }
})();
