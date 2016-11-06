(function () {
  'use strict';

  angular
    .module('app')
    .controller('AveragePriceRegionCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $scope, $state, $stateParams, AverageService) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.topDataLists = [[], [], [], [], [], [], []];
    vm.runBack = runBack;
    vm.page = 0;
    vm.sortName = $localStorage.sortName;
    vm.setPage = setPage;
    vm.getTopData = getTopData; //获取上半部分数据
    vm.getBottomData = getBottomData; // 获取下半部分TOP10
    vm.sortArray = $localStorage.sort.split(',');


    return init();
    function init() {
      vm.params = $localStorage.initDate;
      vm.params['sort'] = $localStorage.sort;
      vm.params['province'] = vm.status;
      vm.params['sign'] = vm.page;
      vm.getTopData(vm.params);
      vm.getBottomData(vm.params);
      $scope.$on('changeDate', function (d, data) {
        vm.params.date = data.date;
        vm.params.dateType = data.dateType;
        vm.getTopData(vm.params);
        vm.getBottomData(vm.params);
      });
      var myChart = echarts.init(document.getElementById('region-grid'));
      var option = {
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
              {name: '山东', selected: true}
            ]
          }
        ]
      };
      myChart.setOption(option);
      myChart.on('click', function (params) {
        // 控制台打印数据的名称
        vm.status = params.name;
        myChart.setOption(option);
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
    }

    function getTopData(data) {
      vm.topDataLists = [[], [], [], [], [], [], []];
      AverageService
        .regionTop(data)
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
      AverageService
        .regionBottom(data)
        .then(function (res) {
          vm.topTenLists = res.data.result_data;
        })
    }

    function setPage(data) {
      vm.page = data;
      vm.params.sign = vm.page;
      vm.getBottomData(vm.params);
    }

    function runBack() {
      $state.go('app.average.list');
    }

  }
})();
