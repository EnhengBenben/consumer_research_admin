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
      .state('app.about', {
        url:'/about',
        templateUrl: 'components/app/about.html'
      })
      .state('app.help', {
        url:'/help',
        templateUrl: 'components/app/help.html'
      })
      .state('app.contact', {
        url:'/contact',
        templateUrl: 'components/app/contact.html'
      })
  });
