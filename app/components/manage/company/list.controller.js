(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, ManageService) {
    var vm = this;
    vm.user = $localStorage.user;

    return init();

    function init(){
        ManageService
        .list(vm.user)
        .then(function(res){
          vm.lists = res.data.jsonArray;
        })
    }
  }
})();
