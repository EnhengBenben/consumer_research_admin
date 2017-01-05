(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, ManageService) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.openStatus = openStatus;
    return init();

    function init(){
        ManageService
        .list(vm.user)
        .then(function(res){
          vm.lists = res.data.jsonArray;
        })
    }

    function openStatus(data){
    if(data.cstatus === 1){
       data.cstatus = 2;
    }else if(data.cstatus === 2){
       data.cstatus = 1;
    }
      var params = {
        cstatus: data.cstatus,
        id: data.id
      };
      ManageService
        .updateCstatus(params)
        .then(function(res){
          if(params.cstatus === 1){
            toaster.pop('success','该项目已开启');
          }else {
            toaster.pop('error','该项目已关闭');
          }

        });
      return data;
    }
  }
})();
