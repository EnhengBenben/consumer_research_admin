angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('go', {
        abstract:true,
        url: '/go',
        templateUrl: 'components/auth/layout.html'
      })
      .state('go.login', {
        url: '/login',
        templateUrl: 'components/auth/login.html',
        controller: 'LoginController as vm',
      })
      .state('go.register', {
        url: '/register',
        templateUrl: 'components/auth/register.html',
        controller: 'RegisterController as vm',
      })
      .state('free',{
        url: '/free',
        abstract: true,
        templateUrl: 'components/auth/freeworker/layout.html'
      })
      .state('free.base',{
        url: '/base',
        templateUrl: 'components/auth/freeworker/base.html',
        controller: 'FreeBaseCtrl as vm'
      })
      .state('free.experience',{
        url: '/experience',
        templateUrl: 'components/auth/freeworker/experience.html',
        controller: 'FreeExperienceCtrl as vm'
      })
      .state('free.skill',{
        url: '/skill',
        templateUrl: 'components/auth/freeworker/skill.html',
        controller: 'FreeSkillCtrl as vm'
      })
      .state('free.resume',{
        url: '/resume',
        templateUrl: 'components/auth/freeworker/resume.html',
        controller: 'FreeResumeCtrl as vm'
      })
  });
