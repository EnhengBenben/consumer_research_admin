(function () {
  'use strict';

  angular
    .module('app')
    .controller('MarketShareListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, MarketService, $state) {
    var vm = this;
    vm.getListData = getListData;
    vm.changeData = changeData;
    vm.goRegion = goRegion;
    vm.sort = $localStorage.sort;
    vm.sortName = $localStorage.sortName;
    vm.params = $localStorage.initDate;
    vm.provinceName = $localStorage.provinceName;
    return init();

    function init(){
      vm.params['sort'] = vm.sort;
      vm.params['province'] = $localStorage.province;
      vm.getListData(vm.params);
      $scope.$on('changeDate', function(d,data) {
        vm.params.date = data.date;
        vm.params.dateType = data.dateType;
        vm.getListData(vm.params);
      });
    }

    function getListData(data){
      MarketService
        .list(data)
        .then(function(res){
          vm.areaLists = res.data.result_data;
          vm.changeData(res.data.result_data);
        })
    }

    function changeData(listData){
      vm.datalists = [[],[],[],[],[],[],[]];
      if(listData.length){
        for(var i=0;i< listData.length;i++){
          for(var j=0; j<listData[i][0].length; j++){
            if(listData[i][0][j].lineall === 'all'){
              vm.datalists[0].push(listData[i][0][j]);
              break;
            }
          }
          for(var j=0; j<listData[i][0].length; j++){
            if(listData[i][0][j].lineall === 'up_up'){
              vm.datalists[1].push(listData[i][0][j]);
              break;
            }
          }
          for(var j=0; j<listData[i][0].length; j++) {
            if (listData[i][0][j].lineall === 'off_off') {
              vm.datalists[2].push(listData[i][0][j]);
              break;
            }
          }
            for(var j=0; j<listData[i][1].length; j++){
              if(listData[i][1][j].productType === 'guaji'){
                vm.datalists[3].push(listData[i][1][j]);
                break;
              }
          }
          for(var j=0; j<listData[i][1].length; j++){
            if(listData[i][1][j].productType === 'guiji'){
              vm.datalists[4].push(listData[i][1][j]);
              break;
            }
          }
          for(var j=0; j<listData[i][1].length; j++){
            if(listData[i][1][j].productType === 'bianpin'){
              vm.datalists[5].push(listData[i][1][j]);
              break;
            }
          }
          for(var j=0; j<listData[i][1].length; j++){
            if(listData[i][1][j].productType === 'dingpin'){
              vm.datalists[6].push(listData[i][1][j]);
              break;
            }
          }
        }


    /*    angular.forEach(listData,function(i,m){
          angular.forEach(i,function (j,k){
            if(k === 0){
              angular.forEach(j,function(data,index){
                if(data.lineall){
                  vm.datalists[0].push(data);
                }
              })
            }
          })
        })*/

      }
    }

    function goRegion(data){
      $state.go('app.market.region',{
        status: data
      })
    }

  }
})();
