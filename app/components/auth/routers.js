angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('go', {
        abstract:true,
        url: '/go',
        templateUrl: 'components/auth/layout.html',
        controller: 'GoLayoutController as vm',
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
        templateUrl: 'components/auth/freeworker/layout.html',
        controller: 'FreeLayoutCtrl as vm'
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
      .state('company',{
        url: '/company',
        templateUrl: 'components/auth/company/layout.html',
        abstract: true,
        controller: 'CompanyLayoutCtrl as vm'
      })
      .state('company.base',{
        url: '/base',
        templateUrl: 'components/auth/company/base.html',
        controller: 'CompanyBaseCtrl as vm'
      })
      .state('company.experience',{
        url: '/experience',
        templateUrl: 'components/auth/company/experience.html',
        controller: 'CompanyExperienceCtrl as vm'
      })
      .state('company.skill',{
        url: '/skill',
        templateUrl: 'components/auth/company/skill.html',
        controller: 'CompanySkillCtrl as vm'
      })
      .state('company.qualifications',{
        url: '/qualifications',
        templateUrl: 'components/auth/company/qualifications.html',
        controller: 'CompanyQualificationCtrl as vm'
      })
      .state('finish',{
        url: '/finish',
        templateUrl: 'components/auth/finish.html',
        controller: 'RegisterFinishCtrl as vm'
      })
      .state('service',{
        url: '/service',
        templateUrl: 'components/auth/service.html'
      })
  });
