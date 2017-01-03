(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalLetterListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, $stateParams, PersonalService) {
    var vm = this;
    vm.status = $stateParams.status;
    vm.user = $localStorage.user;
    vm.remove = remove;
    return init();

    function init() {
      if (vm.user.type === 1 || vm.user.basetype === 1) {
        PersonalService
          .findOutbox(vm.user)
          .then(function (res) {
            vm.lists = res.data;
          })
      } else {
        PersonalService
          .findInBox(vm.user)
          .then(function (res) {
            vm.lists = res.data;
          })
      }
    }

    function remove(data) {
      if ((data.acctype || data.basetype)) {
        PersonalService
          .deleteInBox(data)
          .then(function (res) {
            init();
          })
      } else {
        PersonalService
          .deleteOutBox(data)
          .then(function (res) {
            init();
          })
      }
    }
  }
})();
