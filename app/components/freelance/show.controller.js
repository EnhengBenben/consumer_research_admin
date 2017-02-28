(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreelanceShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $uibModal, FreelanceService, $stateParams, CompanyService) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.goBack = goBack;
    vm.freeShowContact = freeShowContact;
    vm.jobAges = [{id: 1, name: '1年'}, {id: 2, name: '2年'}, {id: 3, name: '3年'}, {id: 4, name: '4年'}, {
      id: 5,
      name: '5年'
    }
      , {id: 6, name: '6年'}, {id: 7, name: '7年'}, {id: 8, name: '8年'}, {id: 9, name: '9年'}, {id: 10, name: '10年及以上'}];
    vm.showContact = showContact;
    vm.sendLetter = sendLetter;

    return init();

    function init() {
      FreelanceService
        .show({id: $stateParams.id, userid: $localStorage.user.userid})
        .then(function (res) {
          vm.show = res.data;
          //history proexperience educational
           $('#history').html(vm.show.history);
          $('#proexperience').html(vm.show.proexperience);
          $('#educational').html(vm.show.educational);
          vm.show.jobage = vm.jobAges.filter(function (i) {
            return vm.show.jobage === i.id;
          })
        })
    }

    function freeShowContact() {
      if (vm.user.ispass === '0') {
        toaster.pop('error', '对不起，您的账户正在审核，请耐心等待');
      } else {
        var params = angular.copy(vm.user);
        params['id'] = $stateParams.id;
        params['proname'] = vm.show.proname;
        FreelanceService
          .tohelper(params)
          .then(function (res) {
            toaster.pop('success', '工作人员会在三日内回复您，谢谢您的信任');
          });
      }
    }

    function showContact() {
      if(vm.user.ispass === '0'){
        toaster.pop('error', '对不起，您的账户正在审核，请耐心等待');
      }else {
        var modalInstance = $uibModal.open({
          ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'components/alipay/model.html',
          controller: 'AlipayModalCtrl',
          controllerAs: 'vm',
          size: 'md',
          backdrop: 'static',
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
          init();
        }, function () {
          // $log.info('Modal dismissed at: ' + new Date());
        });
      }
      // $state.go('alipay.list',{id: $stateParams.id,type: 3});
    }

    function sendLetter() {
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
    function goBack(){
      history.back(-1);
    }
  }
})();
