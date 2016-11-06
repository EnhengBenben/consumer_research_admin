(function () {
  'use strict';

  angular
    .module('app')
    .controller('OverviewListCtrl', OverviewListCtrl);
   OverviewListCtrl.$inject = ['$scope','$interval', '$localStorage', 'OverviewService', '$timeout'];

  function OverviewListCtrl($scope, $interval, $localStorage, OverviewService, $timeout) {
    var vm = this;
    vm.moveToLeft = moveToLeft;// 左移
    vm.moveToRight = moveToRight; // 右移
    vm.animate = animate; // 轮播动画
    vm.getYearData = getYearData;// 获取年数据(区域总览)
    vm.getMonthData = getMonthData; //获取月数据(区域总览)
    vm.getWeekData = getWeekData; // 获取周数据(区域总览)
    vm.getYearXilie = getYearXilie; //获取年对阵数据
    vm.getMonthXilie = getMonthXilie;//获取月对阵数据
    vm.getWeekXilie = getWeekXilie;//获取周对阵数据
    vm.getTrend = getTrend; //获取趋势数据    //折线图
    vm.getView = getView; // 获取市场数据
    vm.type = $localStorage.type;
    vm.sort = $localStorage.sort;
    vm.sortName = $localStorage.sortName;
    vm.paramsSort = $localStorage.initDate;

    vm.page = 1; //页码
    vm.pagedata = $localStorage.initDate;
    vm.setPage = setPage;//设置页码
    vm.showAnimate = true; // 动画是否在进行
    return init();

    function init() {
      var params = {
        nowpage: 0,
        pagesize: 11,
        week: $localStorage.initDate.date
      };
      vm.paramsSort['sort'] = $localStorage.sort;
      vm.getWeekData(params);
      vm.getView(vm.paramsSort);
      vm.getTrend($localStorage.initDate);
      vm.getWeekXilie({week: $localStorage.initDate.date});
      $scope.$on('changeDate', function (d, data) {
        vm.pagedata = data;
        vm.page = 1;
        vm.paramsSort.date = data.date;
        vm.paramsSort.dateType = data.dateType;
        vm.getTrend(data);
        vm.getView(vm.paramsSort);
        var params = {
          nowpage: 0,
          pagesize: 11,
        };
        if (data.dateType === 2) {
          params['year'] = 2016;
          vm.getYearData(params);
          vm.getYearXilie(params);
        }
        if (data.dateType === 0) {
          params['week'] = data.date;
          vm.getWeekData(params);
          vm.getWeekXilie(params);
        }
        if (data.dateType === 1) {
          params['month'] = data.date;
          vm.getMonthData(params);
          vm.getMonthXilie(params);
        }

      });
      initDt();
    }

    function initDt() {
     if(vm.type === 'media'){
       vm.animate(); //添加动画
       $('.move-box').hover(function () {
         $interval.cancel(vm.interval);
         vm.interval = undefined;
       }, function () {
        // console.log('划走');
         vm.animate();
        /* $timeout(function(){
           console.log('动画');
           vm.animate();
         },15000);*/
       })
     }
    }

    function moveToLeft() {
      //vm.animate(100);
      if (vm.showAnimate) {
        vm.showAnimate = false;
        var left = parseInt(document.getElementById('move-list').style.left);
        if (left > -100) {
          document.getElementById('move-list').style.left = -400 + '%';
        }
        if (left < -400) {
          document.getElementById('move-list').style.left = -100 + '%';
        }
        left = parseInt(document.getElementById('move-list').style.left)
        left += 100;
        $("#move-list").animate({left: left + '%'}, function () {
          vm.showAnimate = true;
        });
      }
    }

    function moveToRight() {
      if (vm.showAnimate) {
        vm.showAnimate = false;
        var left = parseInt(document.getElementById('move-list').style.left);
        if (left > -100) {
          document.getElementById('move-list').style.left = -400 + '%';
        }
        if (left < -400) {
          document.getElementById('move-list').style.left = -100 + '%';
        }
        left = parseInt(document.getElementById('move-list').style.left);
        left -= 100;
        $("#move-list").animate({left: left + '%'}, 'slow', function () {
          vm.showAnimate = true;
        });
      }
      // vm.animate(-100);
    }

    function animate() {
      vm.interval = $interval(function () {
        vm.moveToRight();
      }, 15000);
    }

    function getYearData(data) {
      OverviewService
        .yearArea(data)
        .then(function (res) {
          if (res.data) {
            vm.list = res.data.result_data;
          }
        });
    }

    function getMonthData(data) {
      OverviewService
        .monthArea(data)
        .then(function (res) {
          if (res.data) {
            vm.list = res.data.result_data;
          }
        });
    }

    function getWeekData(data) {
      OverviewService
        .weekArea(data)
        .then(function (res) {
          if (res.data) {
            vm.list = res.data.result_data;
          }
        });
    }

    function getTrend(data) {
      OverviewService
        .trendOverview(data)
        .then(function (res) {
          vm.listTrend1 = res.data.result_data[3].ttlMarketShare;
          vm.listTrend2 = res.data.result_data[2].ttlAvgPrice;
          vm.listTrend3 = res.data.result_data[1].onlineMarketShare;
          vm.listTrend4 = res.data.result_data[0].onlineAvgPrice;
          vm.xAxis1 = []; //四个图表的横坐标
          vm.xAxis2 = [];
          vm.xAxis3 = [];
          vm.xAxis4 = [];
          vm.dataTrend1 = [[], [], [], []];
          vm.dataTrend2 = [[], [], [], []];
          vm.dataTrend3 = [[], [], [], []];
          vm.dataTrend4 = [[], [], [], []];
          angular.forEach(vm.listTrend1, function (i) {
            if (i.brand === '美的') {
              i.name = 'Media';
              vm.xAxis1.push(i.date);
              vm.dataTrend1[0].push(i.marketShare);
            }
            if (i.brand === '格力') {
              i.name = 'GREE';
              vm.dataTrend1[1].push(i.marketShare);
            }
            if (i.brand === '海尔') {
              i.name = 'Haier';
              vm.dataTrend1[2].push(i.marketShare);
            }
            if (i.brand === '奥克斯') {
              i.name = 'Aux';
              vm.dataTrend1[3].push(i.marketShare);
            }
          });
          angular.forEach(vm.listTrend2, function (i) {
            i.avgPrice = i.avgPrice.toFixed(0);
            if (i.brand === '美的') {
              i.name = 'Media';
              vm.xAxis2.push(i.date);
              vm.dataTrend2[0].push(i.avgPrice);
            }
            if (i.brand === '海尔') {
              i.name = 'Haier';
              vm.dataTrend2[1].push(i.avgPrice);
            }
            if (i.brand === '行业') {
              vm.dataTrend2[3].push(i.avgPrice);
            }
            if (i.brand === '格力') {
              i.name = 'GREE';
              vm.dataTrend2[2].push(i.avgPrice);
            }
          });
          angular.forEach(vm.listTrend3, function (i) {
            if (i.brand === '美的') {
              i.name = 'Media';
              vm.xAxis3.push(i.date);
              vm.dataTrend3[0].push(i.marketShare);
            }
            if (i.brand === '海尔') {
              i.name = 'Haier';
              vm.dataTrend3[2].push(i.marketShare);
            }
            if (i.brand === '奥克斯') {
              vm.dataTrend3[3].push(i.marketShare);
            }
            if (i.brand === '格力') {
              i.name = 'GREE';
              vm.dataTrend3[1].push(i.marketShare);
            }
          });
          angular.forEach(vm.listTrend4, function (i) {
            if (i.brand === '美的') {
              i.name = 'Media';
              vm.xAxis4.push(i.date);
              vm.dataTrend4[0].push(i.avgPrice);
            }
            if (i.brand === '海尔') {
              i.name = 'Haier';
              vm.dataTrend4[2].push(i.avgPrice);
            }
            if (i.brand === '行业') {
              vm.dataTrend4[3].push(i.avgPrice);
            }
            if (i.brand === '格力') {
              i.name = 'GREE';
              vm.dataTrend4[1].push(i.avgPrice);
            }
          });
          var wholeChangeChart = echarts.init(document.getElementById('whole-change'),'theme');
          var wholeChangeChartOption = {
            title: {
              text: '整体市场均价变化',
              textStyle: {
                color: '#00f0ff',
              },
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
              y: '25%'
            },
            textStyle: {
              color: '#00f0ff'
            },
            color: ['#00f0ff', '#fded30', '#f66466', '#26be53'],
            legend: {
              data: ['Midea', 'GREE', 'Haier', '行业'],
              textStyle: {
                color: '#00f0ff'
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: vm.xAxis2.reverse()
              }
            ],
            yAxis: [
              {
                name: '均价(元)',
                type: 'value',
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
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend2[0].reverse()
              },
              {
                name: 'GREE',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend2[2].reverse()
              },
              {
                name: 'Haier',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend2[1].reverse()
              },
              {
                name: '行业',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend2[3].reverse()
              }
            ]
          };
          wholeChangeChart.setOption(wholeChangeChartOption);
          var wholePercentChart = echarts.init(document.getElementById('whole-percent'),'theme');
          var onlinePercentChart = echarts.init(document.getElementById('online-percent'),'theme');
          var onlineChangeChart = echarts.init(document.getElementById('online-change'),'theme');
          // 指定图表的配置项和数据
          var wholePercentChartOption = {
            title: {
              text: '整体市场市占率变化',
              textStyle: {
                color: '#00f0ff',
              },
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
                top: '25%'
            },
            textStyle: {
              color: '#00f0ff'
            },
            legend: {
              data: ['Midea', 'GREE', 'Haier', 'AXU'],
              textStyle: {
                color: '#00f0ff'
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: vm.xAxis1.reverse(),
              }
            ],
            yAxis: [
              {
                name: '市占率(%)',
                type: 'value',
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
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend1[0].reverse()
              },
              {
                name: 'GREE',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend1[1].reverse()
              },
              {
                name: 'Haier',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend1[2].reverse()
              },
              {
                name: 'AXU',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend1[3].reverse()
              }
            ]
          };
          var onlinePercentChartOption = {
            title: {
              text: '电商市场市占率变化',
              textStyle: {
                color: '#00f0ff',
              }
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
             top: '25%'
            },
            textStyle: {
              color: '#00f0ff'
            },
            legend: {
              data: ['Midea', 'GREE', 'Haier', 'AXU'],
              textStyle: {
                color: '#00f0ff'
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: vm.xAxis3.reverse()
              }
            ],
            yAxis: [
              {
                name:'市占率(%)',
                type: 'value',
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
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend3[0].reverse()
              },
              {
                name: 'GREE',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend3[1].reverse()
              },
              {
                name: 'Haier',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend3[2].reverse()
              },
              {
                name: 'AXU',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend3[3].reverse()
              }
            ]
          };
          var onlineChangeChartOption = {
            title: {
              text: '电商市场均价变化',
              textStyle: {
                color: '#00f0ff',
              },
            },
            tooltip: {
              trigger: 'axis'
            },
            grid: {
             top: '25%'
            },
            textStyle: {
              color: '#00f0ff'
            },
            legend: {
              data: ['Midea', 'GREE', 'Haier', '行业'],
              textStyle: {
                color: '#00f0ff'
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: vm.xAxis4.reverse()
              }
            ],
            yAxis: [
              {
                name:'均价(元)',
                type: 'value',
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
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend4[0].reverse()
              },
              {
                name: 'GREE',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend4[1].reverse()
              },
              {
                name: 'Haier',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend4[2].reverse()
              },
              {
                name: '行业',
                type: 'line',
                smooth: true,
                itemStyle: {
                  normal: {
                    areaStyle: {
                      opacity: 0.05
                    }
                  }
                },
                data: vm.dataTrend4[3].reverse()
              }
            ]
          };
          // 使用刚指定的配置项和数据显示图表。
          wholePercentChart.setOption(wholePercentChartOption);
          onlinePercentChart.setOption(onlinePercentChartOption);
          onlineChangeChart.setOption(onlineChangeChartOption);
        });
    }

    function getYearXilie(data) {
      OverviewService
        .yearXilie(data)
        .then(function (res) {
          vm.xilieData = res.data.result_data;
          angular.forEach(vm.xilieData, function (i) {
            i.name = i.xilie;
            i.type = 'scatter';
            i.z= 1/i.volumepermeability *100;
            i.label = {
              normal: {
                show: true,
                opacity: 0.8,
                textStyle: {
                  fontSize: '14px',
                  color: '#FFF'
                },
                position: ['60', '0'],
                formatter: function (obj) {
                  var value = obj.value;
                  return obj.seriesName
                }
              },
              emphasis: false
            };
            i.itemStyle = itemStyle;
            i.symbolSize = function (data) {
              return data[5]*2 + 40;
            };
            i.data = [[i.brand, i.avgprive.toFixed(0), i.marketShare.toFixed(1), i.tbMarketShare, i.code, i.volumepermeability.toFixed(1)]];
          });
          //散点图
          var fightChart = echarts.init(document.getElementById('fight-content'),'theme');
          var fightChartCopy = echarts.init(document.getElementById('fight-content-copy'),'theme');
          var schema = [
            {name: 'date', index: 0, text: '系列'},
            {name: '市占率', index: 1, text: '市占率'},
            {name: '市占同比', index: 2, text: '市占同比'},
            {name: '均价', index: 3, text: '均价'},
            {name: '贡献率', index: 4, text: '贡献率'},
          ];
          var itemStyle = {
            normal: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          };
          vm.option = {
            color: ['rgba(248,132,132,0.5)', 'rgba(248,192,139,0.5)', 'rgba(0,216,255,0.5)', 'rgba(232,241,135,0.5)'],
            tooltip: {
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: function (obj) {
                var value = obj.value;
                return '<div class="shoe-content" style=" font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                  + obj.seriesName + '系列'
                  + '</div>'
                  + schema[4].text + '：' + value[5] + '<br>'
                  + schema[1].text + '：' + value[2] + '<br>'
                  + schema[2].text + '：' + value[3] + '<br>'
                  + schema[3].text + '(' + value[4] + ')' + '：' + value[1] + '<br>'
              }
            },
            xAxis: {
              type: 'category',
              data: ['美的', '格力', '海尔'],
            },
            yAxis: {
              type: 'value',
              name: '均价',
              scale: true,
            },
            series: vm.xilieData
          };
          fightChart.setOption(vm.option);
          fightChartCopy.setOption(vm.option);
        });
    }

    function getMonthXilie(data) {
      OverviewService
        .monthXilie(data)
        .then(function (res) {
          vm.xilieData = res.data.result_data;
          angular.forEach(vm.xilieData, function (i) {
            i.name = i.xilie;
            i.type = 'scatter';
            i.z= 1/i.volumepermeability *100;
            i.label = {
              normal: {
                show: true,
                opacity: 0.8,
                textStyle: {
                  fontSize: '14px',
                  color: '#FFF'
                },
                position: ['60', '0'],
                formatter: function (obj) {
                  var value = obj.value;
                  return obj.seriesName
                }
              },
              emphasis: false
            };
            i.itemStyle = itemStyle;
            i.symbolSize = function (data) {
              return data[5]*2 + 40;
            };
            i.data = [[i.brand, i.avgprive.toFixed(0), i.marketShare.toFixed(1), i.tbMarketShare, i.code, i.volumepermeability.toFixed(1)]];
          });
          //散点图
          var fightChart = echarts.init(document.getElementById('fight-content'),'theme');
          var fightChartCopy = echarts.init(document.getElementById('fight-content-copy'),'theme');
          var schema = [
            {name: 'date', index: 0, text: '系列'},
            {name: '市占率', index: 1, text: '市占率'},
            {name: '市占同比', index: 2, text: '市占同比'},
            {name: '均价', index: 3, text: '均价'},
            {name: '贡献率', index: 4, text: '贡献率'},
          ];
          var itemStyle = {
            normal: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          };
          vm.option = {
            color: ['rgba(248,132,132,0.5)', 'rgba(248,192,139,0.5)', 'rgba(0,216,255,0.5)', 'rgba(232,241,135,0.5)'],
            tooltip: {
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: function (obj) {
                var value = obj.value;
                return '<div class="shoe-content" style=" font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                  + obj.seriesName + '系列'
                  + '</div>'
                  + schema[4].text + '：' + value[5] + '<br>'
                  + schema[1].text + '：' + value[2] + '<br>'
                  + schema[2].text + '：' + value[3] + '<br>'
                  + schema[3].text + '(' + value[4] + ')' + '：' + value[1] + '<br>'
              }
            },
            xAxis: {
              type: 'category',
              data: ['美的', '格力', '海尔'],
            },
            yAxis: {
              type: 'value',
              name: '均价',
              scale: true,
            },
            series: vm.xilieData
          };
          fightChart.setOption(vm.option);
          fightChartCopy.setOption(vm.option);
        });
    }

    function getWeekXilie(data) {
      OverviewService
        .weekXilie(data)
        .then(function (res) {
          vm.xilieData = res.data.result_data;
          angular.forEach(vm.xilieData, function (i) {
            i.name = i.xilie;
            i.type = 'scatter';
            i.z= 1/i.volumepermeability *100;
            i.label = {
              normal: {
                show: true,
                opacity: 0.8,
                textStyle: {
                  fontSize: '14px',
                  color: '#FFF'
                },
                position: ['60', '0'],
                formatter: function (obj) {
                  var value = obj.value;
                  return obj.seriesName
                }
              },
              emphasis: false
            };
            i.itemStyle = itemStyle;
            i.symbolSize = function (data) {
              return data[5]*2 + 40;
            };
            i.data = [[i.brand, i.avgprive.toFixed(0), i.marketShare.toFixed(1), i.tbMarketShare, i.code, i.volumepermeability.toFixed(1)]];
          });
          //散点图
          var fightChart = echarts.init(document.getElementById('fight-content'),'theme');
          var fightChartCopy = echarts.init(document.getElementById('fight-content-copy'),'theme');
          var schema = [
            {name: 'date', index: 0, text: '系列'},
            {name: '市占率', index: 1, text: '市占率'},
            {name: '市占同比', index: 2, text: '市占同比'},
            {name: '均价', index: 3, text: '均价'},
            {name: '贡献率', index: 4, text: '贡献率'},
          ];
          var itemStyle = {
            normal: {
              opacity: 0.8,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          };
          vm.option = {
            color: ['rgba(248,132,132,0.5)', 'rgba(248,192,139,0.5)', 'rgba(0,216,255,0.5)', 'rgba(232,241,135,0.5)'],
            tooltip: {
              padding: 10,
              backgroundColor: '#222',
              borderColor: '#777',
              borderWidth: 1,
              formatter: function (obj) {
                var value = obj.value;
                return '<div class="shoe-content" style=" font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                  + obj.seriesName + '系列'
                  + '</div>'
                  + schema[4].text + '：' + value[5] + '<br>'
                  + schema[1].text + '：' + value[2] + '<br>'
                  + schema[2].text + '：' + value[3] + '<br>'
                  + schema[3].text + '(' + value[4] + ')' + '：' + value[1] + '<br>'
              }
            },
            xAxis: {
              type: 'category',
              data: ['美的', '格力', '海尔'],
            },
            grid: {
              y: '10%'
            },
            yAxis: {
              type: 'value',
              name: '均价(元)',
              scale: true,
            },
            series: vm.xilieData
          };
          fightChart.setOption(vm.option);
          fightChartCopy.setOption(vm.option);
        });
    }

    function setPage(data) {
      vm.page = data;
      var params = {
        nowpage: (vm.page - 1) * 11,
        pagesize: 11,
      };
      if (vm.pagedata.dateType === 2) {
        params['year'] = 2016;
        vm.getYearData(params);
      }
      if (vm.pagedata.dateType === 0) {
        params['week'] = vm.pagedata.date;
        vm.getWeekData(params);
      }
      if (vm.pagedata.dateType === 1) {
        params['month'] = vm.pagedata.date;
        vm.getMonthData(params);
      }
    }

    function getView(data) {
      OverviewService
        .view(data)
        .then(function (res) {
          vm.lists = res.data.result_data;
        })
    }
  }
})();
