angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $rootScopeProvider) {
    $stateProvider
      .state('app.reputation',{
        abstract: true,
        url:'/reputation',
        templateUrl: 'components/reputation/layout.html',
      })
      .state('app.reputation.list', {
        url: '/list',
        templateUrl: 'components/reputation/list.html',
        controller: 'ReputationListCtrl as vm',
      })
  });
