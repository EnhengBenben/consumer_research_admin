(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $rootScope) {
    var vm = this;


    return init();

    function init(){
      vm.lists = [{
        id: 1,
        proname: '项目名称项目名称项目名称',
        intro: '项目简介项目简介',
        addr: '北京',
        conpany: '北京科技有限责任公司',
        price: 1000,
        starttime: '2016-12-12',
        endtime: '2016-12-13'
      },
        {
          id: 2,
          proname: '项目名称项目名称项目名称',
          intro: '项目简介项目简介',
          addr: '北京',
          conpany: '北京科技有限责任公司',
          price: 1000,
          starttime: '2016-12-12',
          endtime: '2016-12-13'
        }]
    }
  }
})();
