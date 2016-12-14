
(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageFreelanceShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, CompanyService, $stateParams, $uibModal) {
    var vm = this;
    vm.sendLetter = sendLetter;
    vm.undertake = undertake;
    vm.user = $localStorage.user;
    vm.params = {};
    angular.extend(vm.params,vm.user);
    vm.params['rid'] = $stateParams.id;

    return init();

    function init(){
      vm.stauts = [{id: 0, name: '需求分析'}, {id: 1, name: '概要设计'}, {id: 2, name: '详细设计'}, {id: 3, name: '已开发'}];
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
        .show({id: $stateParams.id,requesttype: $stateParams.requesttype})
        .then(function(res){
          vm.show = res.data;
          vm.show.requesttype = vm.requesttypes.filter(function(data){
            return data.id === vm.show.requesttype;
          });
          vm.show.stauts = vm.stauts.filter(function(data){
            return data.id === vm.show.stauts;
          });
          vm.show.mantypr = vm.mantyprs.filter(function(data){
            return data.id == vm.show.mantypr;
          });
          vm.show.ages = vm.jobAges.filter(function(data){
            return data.id == vm.show.ages;
          });
          console.log(vm.show);
        })
    }

    function sendLetter(){
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/company/model.html',
        //controller: 'ModalInstanceCtrl',
        // controllerAs: 'vm',
        size: 'md',
        resolve: {
          items: function () {
            return vm.items;
          }
        }
      })
    }

    function undertake(){
      CompanyService
        .undertake(vm.params)
        .then(function(res){
          toaster.pop('success', res.data);
          $state.go('app.company.list');
        })
    }
  }
})();

