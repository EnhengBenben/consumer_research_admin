angular.module('app')
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.structure',{
        abstract: true,
        url:'/structure',
        templateUrl: 'components/structure/layout.html',
      })
      .state('app.structure.list', {
        url: '/list',
        templateUrl: 'components/structure/list.html',
        controller: 'StructureListCtrl as vm',
      })
      .state('app.structure.channel', {
        url: '/channel?status',
        templateUrl: 'components/structure/channel.html',
        controller: 'StructureChannelCtrl as vm',
      })
  });
