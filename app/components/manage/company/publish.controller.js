(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyPublishCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService, ManageService) {
    var vm = this;
    vm.transformMoney = '';
    vm.sort = {
      type: 1
    };
    vm.user = $localStorage.user;
    vm.published = published;
    vm.publish = {
      starttime: moment()
    };
    vm.status = [{id: 1, name: '开放'}, {id: 2, name: '关闭'}];
    vm.mantyprs = [{id: 0, name: 'JAVA工程师'}, {id: 1, name: 'PHP工程师'}, {id: 2, name: '.NET工程师'}];
    vm.jobAges = [
      {
        id: 0,
        name: '应届毕业生'
      },
      {
        id: 1,
        name: '1-3年'
      },
      {
        id: 2,
        name: '4-6年'
      },
      {
        id: 3,
        name: '7-10年'
      },
      {
        id: 4,
        name: '10年以上'
      }];
    vm.changeMoney = changeMoney;
    return init();

    function init() {
      vm.dateOptions = {
        minDate: moment(vm.publish.starttime) || moment()
      };
      AuthService
        .province()
        .then(function (res) {
          vm.provinces = res.data;
        });
      $scope.$watch('vm.unitaddr.province', function (newValue, oldValue) {
        if (newValue != oldValue) {
          AuthService
            .city({provinceId: vm.unitaddr.province})
            .then(function (res) {
              vm.cities = res.data;
            });
        }
      }, true);
      $scope.$watch('vm.publish.starttime', function(newValue, oldValue){
        if(newValue != oldValue){
          vm.dateOptions = {
            minDate: moment(vm.publish.starttime) || moment()
          };
          console.log(vm.publish);
        }
      }, true);
    }
    function published() {
   /*  if(vm.publish.starttime){
       vm.publish.starttime = vm.publish.starttime.format('yyyy-MM-dd');
     }
     if(vm.publish.endtime){
       vm.publish.endtime = vm.publish.endtime.format('yyyy-MM-dd');
     }*/
     vm.publish.addr = vm.unitaddr.province + ',' + vm.unitaddr.city;
      vm.publish['userid'] = vm.user.userid;
      ManageService
        .publish(vm.publish)
        .then(function(res){
          vm.publish = {};
          $state.go('app.manage.company.list');
          toaster.pop('success','发布成功');
        })
    }

    function changeMoney(money){
      if(money != undefined){
        //汉字的数字
        var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
        //基本单位
        var cnIntRadice = new Array('', '拾', '佰', '仟');
        //对应整数部分扩展单位
        var cnIntUnits = new Array('', '万', '亿', '兆');
        //对应小数部分单位
        var cnDecUnits = new Array('角', '分', '毫', '厘');
        //整数金额时后面跟的字符
        var cnInteger = '整';
        //整型完以后的单位
        var cnIntLast = '元';
        //最大处理的数字
        var maxNum = 999999999999999.9999;
        //金额整数部分
        var integerNum;
        //金额小数部分
        var decimalNum;
        //输出的中文金额字符串
        var chineseStr = '';
        //分离金额后用的数组，预定义
        var parts;
        if (money == '') { return ''; }
        money = parseFloat(money);
        if (money >= maxNum) {
          //超出最大处理数字
          return '';
        }
        if (money == 0) {
          chineseStr = cnNums[0] + cnIntLast + cnInteger;
          return chineseStr;
        }
        //转换为字符串
        money = money.toString();
        if (money.indexOf('.') == -1) {
          integerNum = money;
          decimalNum = '';
        } else {
          parts = money.split('.');
          integerNum = parts[0];
          decimalNum = parts[1].substr(0, 4);
        }
        //获取整型部分转换
        if (parseInt(integerNum, 10) > 0) {
          var zeroCount = 0;
          var IntLen = integerNum.length;
          for (var i = 0; i < IntLen; i++) {
            var n = integerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == '0') {
              zeroCount++;
            } else {
              if (zeroCount > 0) {
                chineseStr += cnNums[0];
              }
              //归零
              zeroCount = 0;
              chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }
            if (m == 0 && zeroCount < 4) {
              chineseStr += cnIntUnits[q];
            }
          }
          chineseStr += cnIntLast;
        }
        //小数部分
        if (decimalNum != '') {
          var decLen = decimalNum.length;
          for (var i = 0; i < decLen; i++) {
            var n = decimalNum.substr(i, 1);
            if (n != '0') {
              chineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
          }
        }
        if (chineseStr == '') {
          chineseStr += cnNums[0] + cnIntLast + cnInteger;
        } else if (decimalNum == '') {
          chineseStr += cnInteger;
        }
        vm.money =  chineseStr;
      }else {
        vm.money = '';
      }
    }
  }
})();
