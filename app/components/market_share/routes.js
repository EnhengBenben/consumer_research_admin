angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $rootScopeProvider) {
    $stateProvider
      .state('app.market',{
        abstract: true,
        url:'/market-share',
        templateUrl: 'components/market_share/layout.html',
      })
      .state('app.market.list', {
        url: '/list',
        templateUrl: 'components/market_share/list.html',
        controller: 'MarketShareListCtrl as vm',
      })
      .state('app.market.channel', {
        url: '/channel?status',
        templateUrl: 'components/market_share/channel.html',
        controller: 'MarketChannelCtrl as vm',
      })
      .state('app.market.product', {
        url: '/product?status',
        templateUrl: 'components/market_share/product.html',
        controller: 'MarketProductCtrl as vm',
      })
      .state('app.market.region', {
        url: '/region?status',
        templateUrl: 'components/market_share/region.html',
        controller: 'MarketRegionCtrl as vm',
      })
  });
