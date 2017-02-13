(function () {
  'use strict';

  angular
    .module('app')
    .controller('ContractorsShowCtrl', Controller);

  /* @ngInject */
  function Controller(ContractorsService, $uibModal, toaster, $localStorage, $stateParams) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.showContact = showContact;
    vm.sendLetter = sendLetter;
    vm.freeShowContact = freeShowContact;
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
      if(vm.user.ispass === '0'){
        toaster.pop('error', '对不起，您的账户正在审核，请耐心等待');
      }else {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'components/alipay/model.html',
          controller: 'AlipayModalCtrl',
          controllerAs: 'vm',
          backdrop: 'static',
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
    }
    function freeShowContact(){
    if(vm.user.ispass === '0'){
      toaster.pop('error', '对不起，您的账户正在审核，请耐心等待');
    }else {
      var params = angular.copy(vm.user);
      console.log(params);
      console.log($stateParams.id);
      params['id'] = $stateParams.id;
      ContractorsService
        .toInsertHelptoqy(params)
        .then(function(res){
          toaster.pop('success', '工作人员会在三日内回复您，谢谢您的信任');
        });
    }
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
