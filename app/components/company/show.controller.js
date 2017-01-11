(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $uibModal, CompanyService, $stateParams, $log) {
    var vm = this;
    vm.undertake = undertake;
    vm.user = $localStorage.user;
    vm.params = {};
    angular.extend(vm.params,vm.user);
    vm.params['rid'] = $stateParams.id;
    vm.requesttype = $stateParams.requesttype;

    return init();

    function init(){
      vm.status = [{id: 1, name: '开放'}, {id: 2, name: '关闭'}];
      vm.mantyprs = [{id: 0, name: 'JAVA工程师'}, {id: 1, name: 'PHP工程师'}, {id: 2, name: '.NET工程师'}];
      vm.jobAges = [
        {
          id: 0,
          name: '应届毕业生'
        },
        {
          id: 1,
          name: '1-3年'
        },
        {
          id: 2,
          name: '4-6年'
        },
        {
          id: 3,
          name: '7-10年'
        },
        {
          id: 4,
          name: '10年以上'
        }];
      vm.requesttypes = [{id: 0, name: '整体项目'}, {id: 1, name: '驻场开发项目'}, {id: 2, name: '自由职业者项目'}];

      CompanyService
        .show({id: $stateParams.id,requesttype: $stateParams.requesttype,userid: $localStorage.user.userid})
        .then(function(res){
          vm.show = res.data;
          vm.show.requesttype = vm.requesttypes.filter(function(data){
            return data.id === vm.show.requesttype;
          });
          vm.show.cstatus = vm.status.filter(function(data){
              return data.id === vm.show.cstatus;
          });
          vm.show.mantypr = vm.mantyprs.filter(function(data){
            return data.id == vm.show.mantypr;
          });
          vm.show.ages = vm.jobAges.filter(function(data){
            return data.id == vm.show.ages;
          });
        })
    }



    function undertake(){
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
              type: 3
            };
          }
        }
      });
      modalInstance.result.then(function (selectedItem) {
        console.log(selectedItem)
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    }
  }
})();
