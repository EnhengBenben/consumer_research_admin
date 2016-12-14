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
      .state('app.manage.company.show',{
        url: '/show/:id?requesttype',
        templateUrl: 'components/manage/company/show.html',
        controller: 'ManageCompanyShowCtrl as vm'
      })
      .state('app.manage.contractors',{
        url: '/contractors',
        templateUrl: 'components/manage/contractors/layout.html',
        abstract: true
      })
      .state('app.manage.contractors.list',{
        url: '/list',
        templateUrl: 'components/manage/contractors/list.html',
        controller: 'ManageContractorsListCtrl as vm'
      })
      .state('app.manage.contractors.show',{
        url: '/show/:id?requesttype',
        templateUrl: 'components/manage/contractors/show.html',
        controller: 'ManageContractorsShowCtrl as vm'
      })
      .state('app.manage.freelance',{
        url: '/freelance',
        templateUrl: 'components/manage/freelance/layout.html',
        abstract: true
      })
      .state('app.manage.freelance.list',{
        url: '/list',
        templateUrl: 'components/manage/freelance/list.html',
        controller: 'ManageFreelanceListCtrl as vm'
      })
      .state('app.manage.freelance.show',{
        url: '/show/:id?requesttype',
        templateUrl: 'components/manage/freelance/show.html',
        controller: 'ManageFreelanceShowCtrl as vm'
      })
  });
