(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $uibModal, CompanyService, $stateParams, AuthService) {
    var vm = this;
    vm.undertake = undertake;
    vm.sendLetter = sendLetter;
    vm.freeShowContact = freeShowContact; //免费咨询
    vm.goBack = goBack;
    vm.user = $localStorage.user;
    vm.params = {};
    angular.extend(vm.params, vm.user);
    vm.params['rid'] = $stateParams.id;
    vm.requesttype = $stateParams.requesttype;

    return init();

    function init() {
      vm.status = [{id: 1, name: '开放'}, {id: 2, name: '关闭'}];
      /*    AuthService
       .findJob()
       .then(function(res){
       vm.mantyprs = res.data;
       });*/
      vm.jobAges = [{id: 1, name: '1-3年'}, {id: 2, name: '4-6年'}, {id: 3, name: '7-10年'}, {id: 4, name: '10年以上'}];
      vm.requesttypes = [{id: 0, name: '整体项目'}, {id: 1, name: '驻场开发项目'}, {id: 2, name: '自由职业顾问项目'}];

      CompanyService
        .show({id: $stateParams.id, requesttype: $stateParams.requesttype, userid: $localStorage.user.userid})
        .then(function (res) {
          vm.show = res.data;
          $('#requirements').html(vm.show.requirements);
          vm.show.requesttype = vm.requesttypes.filter(function (data) {
            return data.id === vm.show.requesttype;
          });
          vm.show.cstatus = vm.status.filter(function (data) {
            return data.id === vm.show.cstatus;
          });
          vm.show.ages = vm.jobAges.filter(function (data) {
            return data.id == parseInt(vm.show.ages);
          });
        })
    }


    function undertake() {
      if (vm.user.ispass === '0') {
        toaster.pop('error', '对不起，您的账户正在审核，请耐心等待');
      } else {
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
                type: 3
              };
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
          var params = {
            rid: $stateParams.id,
            userid: vm.user.userid
          };
          init();
          CompanyService
            .undertake(params)
            .then(function (res) {
              $state.go('app.manage.contractors.list');
            })
        }, function () {

          // $log.info('Modal dismissed at: ' + new Date());
        });
      }

    }

    function freeShowContact() {
      if (vm.user.ispass === '0') {
        toaster.pop('error', '对不起，您的账户正在审核，请耐心等待');
      } else {
        var params = angular.copy(vm.user);
        params['id'] = $stateParams.id;
        params['proname'] = vm.show.proname;
        CompanyService
          .tohelper(params)
          .then(function (res) {
            toaster.pop('success', '工作人员会在三日内回复您，谢谢您的信任');
          });
      }
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
              name: vm.show.name,
              returnMse: false
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
