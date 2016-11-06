angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $rootScopeProvider) {
    $stateProvider
      .state('app.average',{
        abstract: true,
        url:'/average-price',
        templateUrl: 'components/average_price/layout.html',
      })
      .state('app.average.list', {
        url: '/list',
        templateUrl: 'components/average_price/list.html',
        controller: 'AveragePriceListCtrl as vm',
      })
      .state('app.average.channel', {
        url: '/channel?status',
        templateUrl: 'components/average_price/channel.html',
        controller: 'AveragePriceChannelCtrl as vm',
      })
      .state('app.average.product', {
        url: '/product?status',
        templateUrl: 'components/average_price/product.html',
        controller: 'AveragePriceProductCtrl as vm',
      })
      .state('app.average.region', {
        url: '/region?status',
        templateUrl: 'components/average_price/region.html',
        controller: 'AveragePriceRegionCtrl as vm',
      })

  });
