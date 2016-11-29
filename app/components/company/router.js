angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.company',{
        url: '/company',
        templateUrl: 'components/company/layout.html',
        abstract: true
      })
      .state('app.company.list',{
        url: '/list',
        templateUrl: 'components/company/list.html',
        controller: 'CompanyListCtrl as vm'
      })
      .state('app.company.show',{
        url: '/show/:id',
        templateUrl: 'components/company/show.html',
        controller: 'CompanyShowCtrl as vm'
      })
  });
