(function () {
  'use strict';

  angular
    .module('app')
    .controller('ReputationListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, ReputationService) {
    var vm = this;
    vm.page = 1;
    vm.setPage = setPage;
    vm.getListData = getListData;
    vm.sort = $localStorage.sort;
    vm.sortName = $localStorage.sortName;
    vm.params = $localStorage.initDate;
    vm.params['sort'] = vm.sort;
    vm.sortArray = vm.sort.split(',');


    return init();

    function init() {

      vm.getListData(vm.params);
      $scope.$on('changeDate', function (d, data) {
        vm.params.date = data.date;
        vm.params.dateType = data.dateType;
        vm.getListData(vm.params);
      });

      initChart();
    }

    function initChart() {

    }

    function getListData(data) {
      vm.pingtai = [[], []];
      vm.zhuanye = [[], []];
      ReputationService
        .list1(data)
        .then(function (res) {
          for (var i = 0; i < res.data.result_data.length; i++) {
            for (var j = 0; j < res.data.result_data[i].length; j++) {
              if (res.data.result_data[i][j].platform === '平台电商') {
                res.data.result_data[i][j].badrate = res.data.result_data[i][j].badrate * 100;
                res.data.result_data[i][j].badrateMom = res.data.result_data[i][j].badrateMom * 100;
                vm.pingtai[0].push(res.data.result_data[i][j].badrate.toFixed(2));
                vm.pingtai[1].push(res.data.result_data[i][j].badrateMom.toFixed(2));
                break;
              }
            }
            for (var j = 0; j < res.data.result_data[i].length; j++) {
              res.data.result_data[i][j].badrate = res.data.result_data[i][j].badrate * 100;
              res.data.result_data[i][j].badrateMom = res.data.result_data[i][j].badrateMom * 100;
              if (res.data.result_data[i][j].platform === '专业电商') {
                vm.zhuanye[0].push(res.data.result_data[i][j].badrate.toFixed(2));
                vm.zhuanye[1].push(res.data.result_data[i][j].badrateMom.toFixed(2));
                break;
              }
            }
          }
          var platformChart = echarts.init(document.getElementById('platform'), 'theme');
          var platformChartOption = {
            title: {
              text: '差评率及环比对比',
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['平台差评率', '专业差评率', '平台环比', '专业环比'],
            },
            grid: {
              y: '25%'
            },
            color: ['#5b9bd5', '#ed7d31'],
            xAxis: [
              {
                type: 'category',
                data: vm.sortName
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '差评率(%)',
                nameGap: '20',
                splitLine: {
                  show: false
                },
              },
              {
                type: 'value',
                name: '环比(%)',
                nameGap: '20',
                splitLine: {
                  show: false
                },
              }
            ],
            series: [
              {
                name: '平台差评率',
                type: 'bar',
                data: vm.pingtai[0]
              },
              {
                name: '专业差评率',
                type: 'bar',
                data: vm.zhuanye[0]
              },
              {
                name: '平台环比',
                type: 'line',
                yAxisIndex: 1,
                data: vm.pingtai[1]
              },
              {
                name: '专业环比',
                type: 'line',
                yAxisIndex: 1,
                data: vm.zhuanye[1]
              }
            ]
          };
          platformChart.setOption(platformChartOption);
        });
      ReputationService
        .list2(data)
        .then(function (res) {
          vm.xAxis = [];
          vm.BadrateBrend = [[], [], [], [], [], [], []];
          angular.forEach(res.data.result_data, function (i) {
            i.badRate = (i.badRate * 100).toFixed(2);
            if (i.brand === vm.sortArray[0]) {
              vm.xAxis.push(i.date);
              vm.BadrateBrend[0].push(i.badRate);
            }
            if (i.brand === vm.sortArray[1]) {
              vm.BadrateBrend[1].push(i.badRate);
            }
            if (i.brand === vm.sortArray[2]) {
              vm.BadrateBrend[2].push(i.badRate);
            }
            if (i.brand === vm.sortArray[3]) {
              vm.BadrateBrend[3].push(i.badRate);
            }
            if (i.brand === vm.sortArray[4]) {
              vm.BadrateBrend[4].push(i.badRate);
            }
            if (i.brand === vm.sortArray[5]) {
              vm.BadrateBrend[5].push(i.badRate);
            }
            if (i.brand === vm.sortArray[6]) {
              vm.BadrateBrend[6].push(i.badRate);
            }
          });
          var trendChart = echarts.init(document.getElementById('trend'), 'theme');
          var trendChartOption = {
            title: {
              text: '差评率变化趋势'
            },
            tooltip: {
              trigger: 'axis'
              /* formatter: '{b}<br>{a0} : {c0}<br>{a1} : {c1}<br>{a2} : {c2}<br>{a3} : {c3}<br>{a4} : {c4}<br>{a5} : {c5}<br>{a6} : {c6}',
               position: function (point, params, dom) {
               // 固定在顶部
               return [point[0], '10%'];
               }*/
            },
            grid: {
              y: '28%'
            },
            // color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
            legend: {
              data: vm.sortName,
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: vm.xAxis.reverse()
              }
            ],
            yAxis: [
              {
                name: '差评率(%)',
                type: 'value',
                splitLine: {
                  show: false
                },
                axisLabel: {
                  formatter: function (val) {
                    return val;
                  }
                },
                scale: true,
              }
            ],
            series: [
              {
                name: vm.sortName[0],
                type: 'line',
                data: vm.BadrateBrend[0].reverse()
              },
              {
                name: vm.sortName[1],
                type: 'line',
                data: vm.BadrateBrend[1].reverse()
              },
              {
                name: vm.sortName[2],
                type: 'line',
                data: vm.BadrateBrend[2].reverse()
              },
              {
                name: vm.sortName[3],
                type: 'line',
                data: vm.BadrateBrend[3].reverse()
              },
              {
                name: vm.sortName[4],
                type: 'line',
                data: vm.BadrateBrend[4].reverse()
              },
              {
                name: vm.sortName[5],
                type: 'line',
                data: vm.BadrateBrend[5].reverse()
              },
              {
                name: vm.sortName[6],
                type: 'line',
                data: vm.BadrateBrend[6].reverse()
              }
            ]
          };
          trendChart.setOption(trendChartOption);
        });
      ReputationService
        .list3(data)
        .then(function (res) {
          vm.MarketshareRegion = [[], [], [], [], [], [], []];
          angular.forEach(res.data.result_data, function (i) {
            i.badrate = (i.badrate*100).toFixed(2);
            if (i.commentType === '售后体验') {
              if (i.brand === vm.sortArray[0]) {
                vm.MarketshareRegion[0][0] = i.badrate;
              }
              if (i.brand === vm.sortArray[1]) {
                vm.MarketshareRegion[1][0] = i.badrate;
              }
              if (i.brand === vm.sortArray[2]) {
                vm.MarketshareRegion[2][0] = i.badrate;
              }
              if (i.brand === vm.sortArray[3]) {
                vm.MarketshareRegion[3][0] = i.badrate;
              }
              if (i.brand === vm.sortArray[4]) {
                vm.MarketshareRegion[4][0] = i.badrate;
              }
              if (i.brand === vm.sortArray[5]) {
                vm.MarketshareRegion[5][0] = i.badrate;
              }
              if (i.brand === vm.sortArray[6]) {
                vm.MarketshareRegion[6][0] = i.badrate;
              }
            }
            if (i.commentType === '整体体验') {
              if (i.brand === vm.sortArray[0]) {
                vm.MarketshareRegion[0][1] = i.badrate;
              }
              if (i.brand === vm.sortArray[1]) {
                vm.MarketshareRegion[1][1] = i.badrate;
              }
              if (i.brand === vm.sortArray[2]) {
                vm.MarketshareRegion[2][1] = i.badrate;
              }
              if (i.brand === vm.sortArray[3]) {
                vm.MarketshareRegion[3][1] = i.badrate;
              }
              if (i.brand === vm.sortArray[4]) {
                vm.MarketshareRegion[4][1] = i.badrate;
              }
              if (i.brand === vm.sortArray[5]) {
                vm.MarketshareRegion[5][1] = i.badrate;
              }
              if (i.brand === vm.sortArray[6]) {
                vm.MarketshareRegion[6][1] = i.badrate;
              }
            }
            if (i.commentType === '综合体验') {
              if (i.brand === vm.sortArray[0]) {
                vm.MarketshareRegion[0][2] = i.badrate;
              }
              if (i.brand === vm.sortArray[1]) {
                vm.MarketshareRegion[1][2] = i.badrate;
              }
              if (i.brand === vm.sortArray[2]) {
                vm.MarketshareRegion[2][2] = i.badrate;
              }
              if (i.brand === vm.sortArray[3]) {
                vm.MarketshareRegion[3][2] = i.badrate;
              }
              if (i.brand === vm.sortArray[4]) {
                vm.MarketshareRegion[4][2] = i.badrate;
              }
              if (i.brand === vm.sortArray[5]) {
                vm.MarketshareRegion[5][2] = i.badrate;
              }
              if (i.brand === vm.sortArray[6]) {
                vm.MarketshareRegion[6][2] = i.badrate;
              }
            }
            if (i.commentType === '商品体验') {
              if (i.brand === vm.sortArray[0]) {
                vm.MarketshareRegion[0][3] = i.badrate;
              }
              if (i.brand === vm.sortArray[1]) {
                vm.MarketshareRegion[1][3] = i.badrate;
              }
              if (i.brand === vm.sortArray[2]) {
                vm.MarketshareRegion[2][3] = i.badrate;
              }
              if (i.brand === vm.sortArray[3]) {
                vm.MarketshareRegion[3][3] = i.badrate;
              }
              if (i.brand === vm.sortArray[4]) {
                vm.MarketshareRegion[4][3] = i.badrate;
              }
              if (i.brand === vm.sortArray[5]) {
                vm.MarketshareRegion[5][3] = i.badrate;
              }
              if (i.brand === vm.sortArray[6]) {
                vm.MarketshareRegion[6][3] = i.badrate;
              }
            }
            if (i.commentType === '购买体验') {
              if (i.brand === vm.sortArray[0]) {
                vm.MarketshareRegion[0][4] = i.badrate;
              }
              if (i.brand === vm.sortArray[1]) {
                vm.MarketshareRegion[1][4] = i.badrate;
              }
              if (i.brand === vm.sortArray[2]) {
                vm.MarketshareRegion[2][4] = i.badrate;
              }
              if (i.brand === vm.sortArray[3]) {
                vm.MarketshareRegion[3][4] = i.badrate;
              }
              if (i.brand === vm.sortArray[4]) {
                vm.MarketshareRegion[4][4] = i.badrate;
              }
              if (i.brand === vm.sortArray[5]) {
                vm.MarketshareRegion[5][4] = i.badrate;
              }
              if (i.brand === vm.sortArray[6]) {
                vm.MarketshareRegion[6][4] = i.badrate;
              }
            }
          });
          vm.maxNumData = angular.copy(vm.MarketshareRegion);
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
           vm.typeChart = echarts.init(document.getElementById('type'), 'theme');
           vm.typeChartOption = {
              title: {
                text: '差评率类型对比',
              },
              tooltip: {},
              legend: {
                show: true,
                //'Midea', 'GREE', 'Haier', 'AXU', 'CHIGO', 'Hisense', 'TCL'
                data: vm.sortName,
                orient: 'vertical',
                left: 'right',
                top: 'middle',
                align: 'left'
              },
              radar: {
                // shape: 'circle',
                background: 'none',
                indicator: [
                  {name: '售后体验', max: Math.ceil(vm.maxNumArray[0][0])},
                  {name: '整体体验', max: Math.ceil(vm.maxNumArray[1][0])},
                  {name: '综合体验', max: Math.ceil(vm.maxNumArray[2][0])},
                  {name: '商品体验', max: Math.ceil(vm.maxNumArray[3][0])},
                  {name: '购买体验', max: Math.ceil(vm.maxNumArray[4][0])}
                 /* {name: '售后体验'},
                  {name: '整体体验'},
                  {name: '综合体验'},
                  {name: '商品体验'},
                  {name: '购买体验'}*/
                ],
                center: ['40%', '54%'],
                triggerEvent: true,
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
              },
              series: [{
                //name: '五大卖地',
                type: 'radar',
                // areaStyle: {normal: {}},
                data: [
                  {
                    value: vm.MarketshareRegion[0],
                    name: vm.sortName[0]
                  },
                  {
                    value: vm.MarketshareRegion[1],
                    name: vm.sortName[1]
                  },
                  {
                    value: vm.MarketshareRegion[2],
                    name: vm.sortName[2]
                  },
                  {
                    value: vm.MarketshareRegion[3],
                    name: vm.sortName[3]
                  },
                  {
                    value: vm.MarketshareRegion[4],
                    name: vm.sortName[4]
                  },
                  {
                    value: vm.MarketshareRegion[5],
                    name:vm.sortName[5]
                  },
                  {
                    value: vm.MarketshareRegion[6],
                    name: vm.sortName[6]
                  }
                ]
              }]
            };
            vm.typeChart.setOption(vm.typeChartOption);
        });
      ReputationService
        .list4(data)
        .then(function (res) {
          vm.badRate1 = [[], [], [], []];
          vm.badRate2 = [[], [], []];
          angular.forEach(res.data.result_data, function (i) {
            if (i.brand === vm.sortArray[0]) {
              vm.badRate1[0].push(i);
            }
            if (i.brand === vm.sortArray[1]) {
              vm.badRate1[1].push(i);
            }
            if (i.brand === vm.sortArray[2]) {
              vm.badRate1[2].push(i);
            }
            if (i.brand === vm.sortArray[3]) {
              vm.badRate1[3].push(i);
            }
            if (i.brand === vm.sortArray[4]) {
              vm.badRate2[0].push(i);
            }
            if (i.brand === vm.sortArray[5]) {
              vm.badRate2[1].push(i);
            }
            if (i.brand === vm.sortArray[6]) {
              vm.badRate2[2].push(i);
            }
          });
        })
    }

    function setPage(data) {
      vm.page = data;
    }

  }
})();
