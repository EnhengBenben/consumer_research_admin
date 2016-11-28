(function () {
  'use strict';

  angular
    .module('app')
    //.constant('ENDPOINT', '/api') //部署服务器
    .constant('ENDPOINT','http://192.168.0.113:8080') //本地测试
    .run(function () {
      moment.locale('zh-CN');
      moment.tz.setDefault("Asia/Hong_Kong");
    })
    .config(function ($provide) {
      // 允许angular datepicker在空时间的情况下显示空输入
      // https://github.com/g00fy-/angular-datepicker/issues/199
      $provide.decorator('mFormatFilter', function () {
        return function newFilter(m, format, tz) {
          if (!m) {
            return '';
          }
          if (!moment.isMoment(m)) {
            m = moment(m);
          }
          return tz ? moment.tz(m, tz).format(format) : m.format(format);
        };
      });
    });
})();
