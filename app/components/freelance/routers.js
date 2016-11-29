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
        url: '/show/:id',
        templateUrl: 'components/freelance/show.html',
        controller: 'FreelanceShowCtrl as vm',
      })
      .state('app.freelance.pay',{
        url: '/pay',
        templateUrl: 'components/freelance/pay.html',
        controller: 'FreelancePayCtrl as vm'
      })
  });
