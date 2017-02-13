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
    vm.jobAges = [{id: 1, name: '1年'}, {id: 2, name: '2年'}, {id: 3, name: '3年'}, {id: 4, name: '4年'}, {id: 5, name: '5年'}
      , {id: 6, name: '6年'}, {id: 7, name: '7年'}, {id: 8, name: '8年'}, {id: 9, name: '9年'}, {id: 4, name: '10年及以上'}];

    return init();

    function init(){
      FreelanceService
        .show({id: $stateParams.id,userid: $localStorage.user.userid})
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
