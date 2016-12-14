(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreelanceShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, FreelanceService, $stateParams) {
    var vm = this;


    return init();

    function init(){
      FreelanceService
        .show({id: $stateParams.id})
        .then(function(res){
          console.log(res);
          vm.show = res.data;
        })
    }
  }
})();
