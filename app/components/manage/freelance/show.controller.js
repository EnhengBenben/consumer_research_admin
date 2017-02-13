
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageFreelanceShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, CompanyService, $stateParams, AuthService) {
    var vm = this;
    //vm.sendLetter = sendLetter;
    //vm.undertake = undertake;
    vm.user = $localStorage.user;
    vm.params = {};
    angular.extend(vm.params,vm.user);
    vm.params['rid'] = $stateParams.id;

    return init();

    function init(){
      vm.stauts = [{id: 0, name: '需求分析'}, {id: 1, name: '概要设计'}, {id: 2, name: '详细设计'}, {id: 3, name: '已开发'}];
      AuthService
        .findJob()
        .then(function(res){
          vm.mantyprs = res.data;
        });
      vm.jobAges = [{id: 1, name: '1年'}, {id: 2, name: '2年'}, {id: 3, name: '3年'}, {id: 4, name: '4年'}, {id: 5, name: '5年'}
        , {id: 6, name: '6年'}, {id: 7, name: '7年'}, {id: 8, name: '8年'}, {id: 9, name: '9年'}, {id: 4, name: '10年及以上'}];
      vm.requesttypes = [{id: 0, name: '整体项目'}, {id: 1, name: '驻场开发项目'}, {id: 2, name: '自由职业顾问项目'}];

      CompanyService
        .show({id: $stateParams.id,requesttype: $stateParams.requesttype})
        .then(function(res){
          vm.show = res.data;
          vm.show.requesttype = vm.requesttypes.filter(function(data){
            return data.id === vm.show.requesttype;
          });
          vm.show.stauts = vm.stauts.filter(function(data){
            return data.id === vm.show.stauts;
          });
          vm.show.mantypr = vm.mantyprs.filter(function(data){
            return data.id == vm.show.mantypr;
          });
          vm.show.ages = vm.jobAges.filter(function(data){
            return data.id == vm.show.ages;
          });
        })
    }
  }
})();

