(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreelanceShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $uibModal, FreelanceService, $stateParams) {
    var vm = this;
    vm.jobAges = [
      {
        id:5,
        name: '应届毕业生'
      },
      {
        id:1,
        name: '1-3年'
      },
      {
        id:2,
        name: '4-6年'
      },
      {
        id:3,
        name: '7-10年'
      },
      {
        id:4,
        name: '10年以上'
      }];
    vm.showContact = showContact;
    vm.sendLetter = sendLetter;

    return init();

    function init(){
      FreelanceService
        .show({id: $stateParams.id, userid: $localStorage.user.userid})
        .then(function(res){
          vm.show = res.data;
          vm.show.jobage = vm.jobAges.filter(function(i){
            return vm.show.jobage === i.id;
          })
        })
    }

    function showContact(){
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/alipay/model.html',
        controller: 'AlipayModalCtrl',
        controllerAs: 'vm',
        size: 'md',
        backdropClass: 'backDrop1',
        resolve: {
          items: function () {
            return {
              id: $stateParams.id,
              type: 1
            };
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        console.log(selectedItem)
        init();
      }, function () {
       // $log.info('Modal dismissed at: ' + new Date());
      });
     // $state.go('alipay.list',{id: $stateParams.id,type: 3});
    }

    function sendLetter(){
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/company/model.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'vm',
        size: 'md',
        resolve: {
          items: function () {
            return {
              id: $stateParams.id,
              name: vm.show.pname,
              returnMse: true,
            };
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {

      }, function () {

        // $log.info('Modal dismissed at: ' + new Date());
      });
    }
  }
})();
