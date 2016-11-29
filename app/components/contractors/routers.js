angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.contractors',{
        url: '/contractors',
        templateUrl: 'components/contractors/layout.html',
        abstract: true
      })
      .state('app.contractors.list',{
        url: '/list',
        templateUrl: 'components/contractors/list.html',
        controller: 'ContractorsListCtrl as vm'
      })
      .state('app.contractors.show',{
        url: '/show/:id',
        templateUrl: 'components/contractors/show.html',
        controller: 'ContractorsShowCtrl as vm',
      })
      .state('app.contractors.pay',{
        url: '/pay',
        templateUrl: 'components/contractors/pay.html',
        controller: 'ContractorsPayCtrl as vm'
      })
  });
