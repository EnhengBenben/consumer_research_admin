(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppController', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, $stateParams, $scope, $rootScope) {
    var app = this;
    app.active1 = true;
    app.logout = logout;
    $scope.$state = $state;
    if($localStorage.type === 'media'){
      $localStorage.sort = '美的,格力,海尔,奥克斯,志高,海信,TCL';
      $localStorage.sortName = ['Midea','GREE','Haier','AUX','CHIGO','Hisense','TCL'];
      $localStorage.province = '山东,河南,江苏,湖北,广东';
      $localStorage.provinceName = ['山东','河南','江苏','湖北','广东'];
    }else if($localStorage.type === 'aux'){
      $localStorage.sort = '奥克斯,格力,美的,海尔,志高,海信,TCL';
      $localStorage.sortName = ['AUX','GREE','Midea','Haier','CHIGO','Hisense','TCL'];
      $localStorage.province = '山东,河南,安徽,浙江,江苏';
      $localStorage.provinceName = ['山东','河南','安徽','浙江','江苏'];
    }

    //app.weeks = getWeeks().reverse(); //正式数据
    app.weeks = getWeeks().reverse();
    app.months = getMonth().reverse();
    app.filter = {
      week: app.weeks[0],
      month: ''
    };
    app.start_at = '';
    app.end_at = '';
    app.week = week;
    app.month = month;
    app.year = year;
    app.name = '姓名';
    app.weekLength = parseInt(app.filter.week.name.substring(1));
    app.start_at = moment().week(app.weekLength - 1).day(1).format('MM.DD');
    app.end_at = moment().week(app.weekLength - 1).day(7).format('MM.DD');
    $scope.$broadcast('changeDate', {dateType: 0, date: app.filter.week.id});
    $localStorage.initDate = {dateType: 0, date: app.filter.week.id};

    return activate();
    ////////////////
    function activate() {
      $scope.$watch('app.filter.month', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if (app.filter.month) {
            app.active1 = false;
            app.active2 = true;
            app.active3 = false;
            app.filter.week = '';
            app.monthLength = parseInt(app.filter.month.name.substring(1));
            app.start_at = moment().month(app.monthLength - 1).date(1).format('MM.DD');
            app.end_at = moment().month(app.monthLength).date(0).format('MM.DD');
            $scope.$broadcast('changeDate', {dateType: 1, date: app.filter.month.id});
            $localStorage.initDate = {dateType: 1, date: app.filter.month.id}
          } else if (!app.filter.week) {
            $scope.$broadcast('changeDate', {dateType: 2, date: '16'});
            $localStorage.initDate =  {dateType: 2, date: '16'};
          }
        }
      }, true);
      $scope.$watch('app.filter.week', function (newValue, oldValue) {
        if (newValue != oldValue) {
          if (app.filter.week) {
            app.active1 = true;
            app.active2 = false;
            app.active3 = false;
            app.filter.month = '';
            app.weekLength = parseInt(app.filter.week.name.substring(1));
            app.start_at = moment().week(app.weekLength - 1).day(1).format('MM.DD');
            app.end_at = moment().week(app.weekLength - 1).day(7).format('MM.DD');
            $scope.$broadcast('changeDate', {dateType: 0, date: app.filter.week.id});
            $localStorage.initDate = {dateType: 0, date: app.filter.week.id};
          } else if (!app.filter.month) {
            $scope.$broadcast('changeDate', {dateType: 2, date: '16'});
            $localStorage.initDate = {dateType: 2, date: '16'};
          }
        }
      }, true);
    }

    function getWeeks() {

      var weekNum;
      if (moment().day() > 4) {
        weekNum = moment().week();
      } else {
        weekNum = moment().week() - 1;
      }
      //weekNum = 42; // 数据展示，暂不显示42周以后数据
      var weekArr = [];
      for (var i = 0; i <weekNum; i++) {
        if (i < 9) {
          weekArr[i] = {name: 'W0' + (i + 1), id: '16W0' + (i + 1)};
        } else {
          weekArr[i] = {name: 'W' + (i + 1), id: '16W' + (i + 1)};
        }
      }
    /*  if (weekNum < 10) {
        if (moment().day() > 3) {
          weekArr.push({name: 'W0' + weekNum, id: '16W0' + weekNum});
        }
      } else {
        if (moment().day() > 3) {
          weekArr.push({name: 'W' + weekNum, id: '16W' + weekNum});
        }
      }*/
      return weekArr;
    }

    function getMonth() {
      var monthNum;
      if (moment().date() > 17) {
        monthNum = moment().month();
      } else {
        monthNum = moment().month() - 1;
      }
      var monthArr = [];
      for (var i = 0; i < monthNum; i++) {
        if (i < 9) {
          monthArr[i] = {name: 'M0' + (i + 1), id: '16.0' + (i + 1)};
        } else {
          monthArr[i] = {name: 'M' + (i + 1), id: '16.' + (i + 1)};
        }
      }
    /*  if (monthNum < 10) {
        if (moment().format('DD') - 15 > 0) {
          monthArr.push({name: 'M0' + monthNum, id: '16.0' + monthNum});
        }
      } else {
        if (moment().format('DD') - 15 > 0) {
          monthArr.push({name: 'M' + monthNum, id: '16.' + monthNum});
        }
      }*/

      return monthArr;
    }

    function week() {
      app.active1 = true;
      app.active2 = false;
      app.active3 = false;
      app.filter.week = app.weeks[0];
    }

    function month() {
      app.active1 = false;
      app.active2 = true;
      app.active3 = false;
      app.filter.month = app.months[0];
    }

    function year() {
      app.active1 = false;
      app.active2 = false;
      app.active3 = true;
      if (app.filter.week) {
        app.filter.week = ''
      } else if (app.filter.month) {
        app.filter.month = '';
      }
      app.start_at = '';
      app.end_at = '';
    }

    function logout(){
      $localStorage.token = '';
      $state.go('login');
    }

  }
})();
