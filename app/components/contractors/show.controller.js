(function () {
  'use strict';

  angular
    .module('app')
    .controller('ContractorsShowCtrl', Controller);

  /* @ngInject */
  function Controller(ContractorsService, $uibModal, toaster, $localStorage, $stateParams) {
    var vm = this;
    vm.showContact = showContact;
    vm.sendLetter = sendLetter;
    vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'}, {id: 2, name: '民办非企业单位'},
      {id: 3, name: '个体工商户'}, {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];

    return init();

    function init() {
      ContractorsService
        .show({id: $stateParams.id, userid: $localStorage.user.userid})
        .then(function (res) {
          vm.show = res.data;
          vm.show.zname = vm.show.zname.split('-').join(',').split(',');
          vm.flattypeArr.map(function (i) {
            if (vm.show.flattype === i.id) {
               vm.show.flattype = i.name;
            }
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
        backdrop: true,
        backdropClass: 'backDrop1',
        size: 'md',
        resolve: {
          items: function () {
            return {
              id: $stateParams.id,
              type: 2
            };
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        init();
        console.log(selectedItem)
      }, function () {
      //  $log.info('Modal dismissed at: ' + new Date());
      });
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
              name: vm.show.name,
              returnMse: true,
              flag: true
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
