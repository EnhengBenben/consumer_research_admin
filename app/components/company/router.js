angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.company',{
        url: '/company',
        templateUrl: 'components/company/layout.html',
        abstract: true
      })
      .state('app.company.manage',{
        url: '/manage',
        templateUrl: 'components/company/manage.html',
        controller: 'CompanyManageCtrl as vm'
      })
      .state('app.company.more',{
        url: '/more',
        templateUrl: 'components/company/more.html',
        controller: 'CompanyMoreCtrl as vm',
      })
      .state('app.company.publish',{
        url: '/publish',
        templateUrl: 'components/company/publish.html',
        controller: 'CompanyPublishCtrl as vm'
      })
  });
