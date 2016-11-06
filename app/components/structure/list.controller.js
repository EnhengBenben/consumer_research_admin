(function () {
  'use strict';

  angular
    .module('app')
    .controller('StructureListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, StructureService) {
    var vm = this;

    vm.getListData = getListData;
    vm.sort = angular.copy( $localStorage.sort);
    vm.sortName =angular.copy($localStorage.sortName);
    vm.sort = '行业,' + vm.sort;
    vm.sortName.unshift('行业');
    vm.province = angular.copy($localStorage.province);
    vm.params = angular.copy($localStorage.initDate);
    vm.provinceName = angular.copy($localStorage.provinceName);
    return init();

    function init(){
      vm.params['sort'] = vm.sort;
      vm.params['province'] = vm.province;
      vm.getListData(vm.params);
      $scope.$on('changeDate', function(d,data) {
        vm.params.date = data.date;
        vm.params.dateType = data.dateType;
        vm.getListData(vm.params);
      });
    }

    function getListData(data){
      StructureService
        .list(data)
        .then(function(res){
          vm.MarketshareChannel = [[],[]];
          vm.MarketshareProducttype = [[],[]];
          vm.MarketshareRegion = [[],[],[],[],[]];
          for(var i= 0; i< res.data.result_data.length; i++){
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].line === 'up'){
                vm.MarketshareChannel[0].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].line === 'off'){
                vm.MarketshareChannel[1].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].productType === '柜机'){
                vm.MarketshareProducttype[0].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].productType === '变频'){
                vm.MarketshareProducttype[1].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].province === vm.provinceName[0]){
                vm.MarketshareRegion[0].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].province === vm.provinceName[1]){
                vm.MarketshareRegion[1].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].province === vm.provinceName[2]){
                vm.MarketshareRegion[2].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].province === vm.provinceName[3]){
                vm.MarketshareRegion[3].push(res.data.result_data[i][j]);
                break;
              }
            }
            for(var j= 0; j< res.data.result_data[i].length; j++){
              if(res.data.result_data[i][j].province === vm.provinceName[4]){
                vm.MarketshareRegion[4].push(res.data.result_data[i][j]);
                break;
              }
            }
          }
        })
    }
  }
})();
