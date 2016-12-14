(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, ManageService, $stateParams) {
    var vm = this;
    vm.user = $localStorage.user;
    return init();

    function init(){
      ManageService
        .companyShow({id:$stateParams.id})
        .then(function(res){
          console.log(res);
        })
    }
  }
})();
