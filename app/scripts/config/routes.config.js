angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider, $rootScopeProvider) {
    $urlRouterProvider.otherwise('/go/login');
    $stateProvider
      .state('app', {
        url:'/app',
        abstract: true,
        templateUrl: 'components/app/app.html',
        controller: 'AppController as app',
      })
  });
