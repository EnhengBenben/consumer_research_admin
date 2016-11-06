(function () {
  'use strict';

  angular
    .module('app')
    .controller('AveragePriceListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, AverageService, $interval, $state) {
    var vm = this;
    vm.getListData = getListData;
    vm.params = $localStorage.initDate;
    vm.initCharts = initCharts;
    vm.sort = $localStorage.sort;
    vm.sortName = $localStorage.sortName;
    vm.params['sort'] = vm.sort;
    vm.params['province'] = $localStorage.province;
    vm.provinceArrayName = $localStorage.province.split(',');
    console.log(vm.provinceArray);
    return init();

    function init() {

      vm.getListData(vm.params);
      $scope.$on('changeDate', function (d, data) {
        vm.params.date = data.date;
        vm.params.dateType = data.dateType;
        vm.getListData(vm.params);
      });
    }

    function getListData(data) {
      AverageService
        .list(data)
        .then(function (res) {
          vm.provinceArray = $localStorage.sort.split(',');

          if (res.data.result_data) {
            vm.averageListTop = [[], [], []];
            vm.MarketshareProducttype = [[], [], [], [], [], [], []];
            vm.MarketshareRegion = [[], [], [], [], [], [], []];
            angular.forEach(res.data.result_data[0].qudaoleibie, function (i) {
              angular.forEach(i, function (k) {
                if (k.line === 'line_all') {
                  vm.averageListTop[0].push(k);
                }
                if (k.line === 'up') {
                  vm.averageListTop[1].push(k);
                }
                if (k.line === 'off') {
                  vm.averageListTop[2].push(k);
                }
              })
            });
            for (var i = 0; i < res.data.result_data[1].chanpinleibie.length; i++) {
              for (var j = 0; j < res.data.result_data[1].chanpinleibie[i].length; j++) {
                if (res.data.result_data[1].chanpinleibie[i][j].line === '挂机') {
                  vm.MarketshareProducttype[i][0] = res.data.result_data[1].chanpinleibie[i][j].priceAvg.toFixed(0)
                }
                if (res.data.result_data[1].chanpinleibie[i][j].line === '柜机') {
                  vm.MarketshareProducttype[i][1] = res.data.result_data[1].chanpinleibie[i][j].priceAvg.toFixed(0)
                }
                if (res.data.result_data[1].chanpinleibie[i][j].line === '变频') {
                  vm.MarketshareProducttype[i][2] = res.data.result_data[1].chanpinleibie[i][j].priceAvg.toFixed(0)
                }
                if (res.data.result_data[1].chanpinleibie[i][j].line === '定频') {
                  vm.MarketshareProducttype[i][3] = res.data.result_data[1].chanpinleibie[i][j].priceAvg.toFixed(0)
                }
              }
            }
            for (var i = 0; i < res.data.result_data[2].wudadimai.length; i++) {
              for (var j = 0; j < res.data.result_data[2].wudadimai[i].length; j++) {
                  if( res.data.result_data[2].wudadimai[i][j].brand === vm.provinceArray[0]){
                    vm.MarketshareRegion[0].push(res.data.result_data[2].wudadimai[i][j].priceAvg);
                  }
                if( res.data.result_data[2].wudadimai[i][j].brand === vm.provinceArray[1]){
                  vm.MarketshareRegion[1].push(res.data.result_data[2].wudadimai[i][j].priceAvg);
                }
                if( res.data.result_data[2].wudadimai[i][j].brand === vm.provinceArray[2]){
                  vm.MarketshareRegion[2].push(res.data.result_data[2].wudadimai[i][j].priceAvg);
                }
                if( res.data.result_data[2].wudadimai[i][j].brand === vm.provinceArray[3]){
                  vm.MarketshareRegion[3].push(res.data.result_data[2].wudadimai[i][j].priceAvg);
                }
                if( res.data.result_data[2].wudadimai[i][j].brand === vm.provinceArray[4]){
                  vm.MarketshareRegion[4].push(res.data.result_data[2].wudadimai[i][j].priceAvg);
                }
                if( res.data.result_data[2].wudadimai[i][j].brand === vm.provinceArray[5]){
                  vm.MarketshareRegion[5].push(res.data.result_data[2].wudadimai[i][j].priceAvg);
                }
                if( res.data.result_data[2].wudadimai[i][j].brand === vm.provinceArray[6]){
                  vm.MarketshareRegion[6].push(res.data.result_data[2].wudadimai[i][j].priceAvg);
                }
              }
            }
          }
          vm.initCharts(vm.MarketshareProducttype, vm.MarketshareRegion);
        })
    }

    function initCharts(list, list2) {
      var productTypeChart = echarts.init(document.getElementById('product-type'), 'theme');
      var productTypeChartOption = {
        title: {
          text: '产品类型',
        },
        tooltip: {
          trigger: 'axis'
        },

        //color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        legend: {
          data: ['Midea', 'GREE', 'Haier', 'AXU', 'CHIGO', 'Hisense', 'TCL'],
        },
        toolbox: {
          show: false,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: true},
            magicType: {show: false, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['挂机', '柜机', '变频', '定频'],
            triggerEvent: true
          }
        ],
        grid: {
          y: '22%'
        },
        yAxis: [
          {
            type: 'value',
            name: '均价(元)',
            splitLine: {
              show: false
            },
            scale: true,
          }
        ],
        series: [
          {
            name: 'Midea',
            type: 'line',
            data: list[0]
          },
          {
            name: 'GREE',
            type: 'line',
            data: list[1]
          },
          {
            name: 'Haier',
            type: 'line',
            data: list[2]
          },
          {
            name: 'AXU',
            type: 'line',
            data: list[3]
          },
          {
            name: 'CHIGO',
            type: 'line',
            data: list[4]
          },
          {
            name: 'Hisense',
            type: 'line',
            data: list[5]
          },
          {
            name: 'TCL',
            type: 'line',
            data: list[6]
          }
        ]
      };
      productTypeChart.setOption(productTypeChartOption);
      productTypeChart.on("click", function (params) {
        // $state.go();
        if (params.value === '挂机') {
          $state.go('app.average.product', {status: 'guaji'});
        }
        if (params.value === '柜机') {
          $state.go('app.average.product', {status: 'guiji'});
        }
        if (params.value === '变频') {
          $state.go('app.average.product', {status: 'bianpin'});
        }
        if (params.value === '定频') {
          $state.go('app.average.product', {status: 'dingpin'});
        }
      });

      vm.maxNumData = angular.copy(list2);
      vm.maxNumArray = [[], [], [], [], []];
      angular.forEach(vm.maxNumData, function (i,k) {
        angular.forEach(i, function (j, index) {
          vm.maxNumArray[index].push(j);
        })
      });
      for (var s = 0; s < vm.maxNumArray.length; s++) {
        vm.maxNumArray[s] = vm.maxNumArray[s].sort(function(a,b){
          return b - a;
        });
      }

      var productAreaChart = echarts.init(document.getElementById('product-area'), 'theme');
      var productAreaChartOption = {
        title: {
          text: '五大地卖',
        },
        tooltip: {},
        legend: {
          show: true,
          //'Midea', 'GREE', 'Haier', 'AXU', 'CHIGO', 'Hisense', 'TCL'
          data: ['Midea', 'GREE', 'Haier', 'AXU', 'CHIGO', 'Hisense', 'TCL'],
          textStyle: {
            color: '#1b9a9f',
          },
          orient: 'vertical',
          left: 'right',
          top: 'middle',
          align: 'left'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            {name: vm.provinceArrayName[0],max: Math.ceil(vm.maxNumArray[0][0])},
            {name: vm.provinceArrayName[1],max:  Math.ceil(vm.maxNumArray[1][0])},
            {name: vm.provinceArrayName[2],max:  Math.ceil(vm.maxNumArray[2][0])},
            {name:vm.provinceArrayName[3],max:  Math.ceil(vm.maxNumArray[3][0])},
            {name: vm.provinceArrayName[4],max:  Math.ceil(vm.maxNumArray[4][0])}
          ],
          splitArea: {
            areaStyle: {
              color: ['rgba(255, 0, 0, 0)']
            }
          },
          splitLine: {
            lineStyle: {
              color: '#1b9a9f'
            }
          },
          name: {
            textStyle: {
              color: '#1b9a9f',
            }
          },
          triggerEvent: true,
        },

        series: [{
          name: '五大卖地',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: list2[0],
              name: 'Midea'
            },
            {
              value: list2[1],
              name: 'GREE'
            },
            {
              value: list2[2],
              name: 'Haier'
            },
            {
              value: list2[3],
              name: 'AXU'
            },
            {
              value: list2[4],
              name: 'CHIGO'
            },
            {
              value: list2[5],
              name: 'Hisense'
            },
            {
              value: list2[6],
              name: 'TCL'
            }

          ]
        }]
      };
      productAreaChart.setOption(productAreaChartOption);
      productAreaChart.on("click", function (params) {

      });
    }


  }
})();
