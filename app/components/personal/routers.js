angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.personal',{
        url: '/personal',
        templateUrl: 'components/personal/layout.html',
        abstract: true
      })
      .state('app.personal.letter',{
        url: '/letter',
        templateUrl: 'components/personal/letter/layout.html',
        abstract: true
      })
      .state('app.personal.letter.list',{
        url: '/list?status',
        templateUrl: 'components/personal/letter/list.html',
        controller: 'PersonalLetterListCtrl as vm'
      })
      .state('app.personal.setting',{
        url: '/setting',
        templateUrl: 'components/personal/setting/layout.html',
        abstract: true
      })
      .state('app.personal.setting.list',{
        url: '/list',
        templateUrl: 'components/personal/setting/list.html',
        controller: 'PersonalSettingListCtrl as vm'
      })
  });
