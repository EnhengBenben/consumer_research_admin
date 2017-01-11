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
    vm.removeAll = removeAll;
    vm.tag = false;
    vm.checkList = {
      ids: []
    };
    vm.selectAll = selectAll;
    return init();

    function init() {
      if (vm.status === 'send') {
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

    function removeAll() {
      var data = {
        ids: vm.checkList.ids.join(',')
      };
    if(vm.status === 'send'){
      PersonalService
        .delSendAllMessage(data)
        .then(function(res){
          toaster.pop('success','私信已删除');
          init();
        })
    }else {
      PersonalService
        .delAcceptAllMessage(data)
        .then(function(res){
          toaster.pop('success','私信已删除');
          init();
        })
    }
    }

    function selectAll(){
      vm.tag = !vm.tag;
      if(vm.tag){
        vm.checkList.ids = vm.lists.map(function(item) { return item.id; });
      }else {
        vm.checkList.ids = [];
      }
    }
  }
})();
