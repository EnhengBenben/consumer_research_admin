/**
 * Created by Administrator on 2017/1/9.
 */
angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('alipay',{
        url: '/alipay',
        templateUrl: 'components/alipay/layout.html',
        abstract: true
      })
      .state('alipay.list',{
        url: '/list/:id?type',
        templateUrl: 'components/alipay/list.html',
        controller: 'AlipayListCtrl as vm'
      })
  });
