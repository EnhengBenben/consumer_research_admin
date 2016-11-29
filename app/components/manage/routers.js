angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.manage',{
        url: '/manage',
        templateUrl: 'components/manage/layout.html',
        abstract: true
      })
      .state('app.manage.company',{
        url: '/company',
        templateUrl: 'components/manage/company/layout.html',
        abstract: true
      })
      .state('app.manage.company.list',{
        url: '/list',
        templateUrl: 'components/manage/company/list.html',
        controller: 'ManageCompanyListCtrl as vm'
      })
      .state('app.manage.company.more',{
        url: '/more',
        templateUrl: 'components/manage/company/more.html',
        controller: 'ManageCompanyMoreCtrl as vm',
      })
      .state('app.manage.company.publish',{
        url: '/publish',
        templateUrl: 'components/manage/company/publish.html',
        controller: 'ManageCompanyPublishCtrl as vm'
      })
  });
