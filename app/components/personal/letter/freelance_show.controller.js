/**
 * Created by Administrator on 2017/1/6.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalFreelanceShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, FreelanceService, $stateParams) {
    var vm = this;
    vm.goBack = goBack;
    vm.jobAges = [
      {
        id:5,
        name: '应届毕业生'
      },
      {
        id:1,
        name: '1-3年'
      },
      {
        id:2,
        name: '4-6年'
      },
      {
        id:3,
        name: '7-10年'
      },
      {
        id:4,
        name: '10年以上'
      }];

    return init();

    function init(){
      FreelanceService
        .show({id: $stateParams.id})
        .then(function(res){
          vm.show = res.data;
          vm.show.jobage = vm.jobAges.filter(function(i){
            return vm.show.jobage === i.id;
          })
        })
    }

    function goBack(){
      history.back(-1);
    }
  }
})();
