angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.freelance',{
        url: '/freelance',
        templateUrl: 'components/freelance/layout.html',
        abstract: true
      })
      .state('app.freelance.list',{
        url: '/list',
        templateUrl: 'components/freelance/list.html',
        controller: 'FreelanceListCtrl as vm'
      })
      .state('app.freelance.show',{
        url: '/show/:id?status',
        templateUrl: 'components/freelance/show.html',
        controller: 'FreelanceShowCtrl as vm',
      })
  });
