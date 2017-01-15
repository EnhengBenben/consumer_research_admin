(function () {
  'use strict';

  angular
    .module('app')
    .controller('ModalInstanceCtrl', Controller);

  /* @ngInject */
  function Controller($state, items, $localStorage, $uibModalInstance, CompanyService, toaster) {
    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.show = true;
    vm.sendInfo = {
      name: items.name
    };
    vm.model = {
      info: '',
      requestPlanId: parseInt(items.id),
      userid: $localStorage.user.userid
    };
    return init();

    function init(){

    }

    function ok(){
      if(items.returnMse){
        if(items.flag){
          vm.model['flag'] = items.flag;
        }
        CompanyService
          .returnMsg(vm.model)
          .then(function(res){
            vm.show = false;
            toaster.pop('success', '回复成功');
            $uibModalInstance.close(vm.model);
            $state.go('app.personal.letter.list',{status: 'send'});
          })
      }else {
        CompanyService
          .sendMessages(vm.model)
          .then(function(res){
            toaster.pop('success', '发送成功');
            $uibModalInstance.close(vm.model);
          });
      }
    }

    function cancel(){
      $uibModalInstance.dismiss();
    }




  }
})();
