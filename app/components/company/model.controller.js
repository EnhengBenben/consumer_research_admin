(function () {
  'use strict';

  angular
    .module('app')
    .controller('ModalInstanceCtrl', Controller);

  /* @ngInject */
  function Controller($uibModal, items, $localStorage, $uibModalInstance, CompanyService) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    console.log(items);
    console.log($localStorage.user);
    vm.model = {
      info: '',
      requestPlanId: items.id,
      userid: $localStorage.user.userid
    };


    return init();

    function init(){

    }

    function ok(){
      CompanyService
        .sendMessages(vm.model)
        .then(function(res){
          console.log(res);
          $uibModalInstance.close(vm.model);
        });
    }

    function cancel(){
      $uibModalInstance.dismiss();
    }




  }
})();
