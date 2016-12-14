(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageContractorsShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, ManageService) {
    var vm = this;
    vm.user = $localStorage.user;
    console.log(vm.user);

    return init();

    function init(){
      ManageService
        .companyShow(vm.user)
        .then(function(res){
          vm.lists = res.data;
          console.log(res);
        })
    }
  }
})();
