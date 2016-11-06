angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $rootScopeProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('app', {
        url:'/app',
        abstract: true,
        templateUrl: 'components/app/app.html',
        controller: 'AppController as app',
      })
      .state('app.overview',{
        abstract: true,
        url:'/overviews',
        templateUrl: 'components/overviews/layout.html',
      })
      .state('app.overview.list', {
        url: '/list',
        templateUrl: 'components/overviews/list.html',
        controller: 'OverviewListCtrl as vm',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/auth/login.html',
        controller: 'LoginController as vm',
      });
  });
