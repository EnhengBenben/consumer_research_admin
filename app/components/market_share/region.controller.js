(function () {
  'use strict';

  angular
    .module('app')
    .controller('MarketRegionCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, $state, $stateParams, MarketService) {
    var vm = this;
    vm.runBack = runBack;
    vm.status = $stateParams.status;
    vm.sortName = $localStorage.sortName;
    vm.sort = $localStorage.sort;
    vm.sortArray = angular.copy(vm.sort);
    vm.page = 0;
    vm.setPage = setPage;
    vm.runBack = runBack;
    vm.getTopData = getTopData;
    vm.getBottomData = getBottomData;

    return init();
    function init() {
      vm.sortArray = vm.sortArray.split(',');
      vm.params = $localStorage.initDate;
      vm.params.sort = $localStorage.sort;
      vm.params['province'] = vm.status;
      // vm.params['sort'] = $localStorage.sort;
      vm.params['sign'] = 0;
      vm.getTopData(vm.params);
      vm.getBottomData(vm.params);
      $scope.$on('changeDate', function (d, data) {
        vm.params.date = data.date;
        vm.params.sort = $localStorage.sort;
        vm.params.dateType = data.dateType;
        vm.getTopData(vm.params);
        vm.getBottomData(vm.params);
      });
      var myChart = echarts.init(document.getElementById('region-grid'));
      var option = {
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '',
            type: 'map',
            map: 'china',
            roam: false,
            selectedMode: 'single',
            itemStyle: {
              normal: {
                label: {show: false},
                areaColor: '#00cbff',
              },
              emphasis: {
                label: {
                  show: true,
                  textStyle: {
                    color: '#FFF'
                  }
                },
                areaColor: '#F00'
              }
            },
            data: [
              {name: vm.params.province, selected: true}
            ]
          }
        ]
      };
      myChart.on('click', function (params) {
        // 控制台打印数据的名称
        vm.status = params.name;
        vm.page = 0;
        vm.params.province = params.name;
        vm.getTopData(vm.params);
        vm.getBottomData(vm.params);
        vm.option = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              name: '',
              type: 'map',
              map: 'china',
              roam: false,
              selectedMode: 'single',
              itemStyle: {
                normal: {
                  label: {show: false},
                  areaColor: '#00cbff',
                },
                emphasis: {
                  label: {
                    show: true,
                    textStyle: {
                      color: '#FFF'
                    }
                  },
                  areaColor: '#F00'
                }
              },
              data: [
                {name: vm.params.province, selected: true}
              ]
            }
          ]
        };
        myChart.setOption(vm.option);
      });
      myChart.setOption(option);
    }

    function getTopData(data) {
      vm.topDataLists = [[], [], [], [], [], [], []];
      MarketService
        .provinceTop(data)
        .then(function (res) {
          angular.forEach(res.data.result_data, function (i) {
            if (i.brand === vm.sortArray[0]) {
              vm.topDataLists[0] = i;
            }
            if (i.brand === vm.sortArray[1]) {
              vm.topDataLists[1] = i;
            }
            if (i.brand === vm.sortArray[2]) {
              vm.topDataLists[2] = i;
            }
            if (i.brand === vm.sortArray[3]) {
              vm.topDataLists[3] = i;
            }
            if (i.brand === vm.sortArray[4]) {
              vm.topDataLists[4] = i;
            }
            if (i.brand === vm.sortArray[5]) {
              vm.topDataLists[5] = i;
            }
            if (i.brand === vm.sortArray[6]) {
              vm.topDataLists[6] = i;
            }
          });
        })
    }

    function getBottomData(data) {
      MarketService
        .provinceBottom(data)
        .then(function (res) {
          vm.topTenLists = res.data.result_data;
        })
    }

    function runBack() {
      $state.go('app.market.list');
    }

    function setPage(data) {
      vm.page = data;
      vm.params.sign = vm.page;
      vm.getBottomData(vm.params);
    }

  }
})();
