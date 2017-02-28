(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageContractorsShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, $stateParams, AuthService, CompanyService, $uibModal) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.params = {};
    vm.sendLetter = sendLetter;
    angular.extend(vm.params,vm.user);
    vm.params['rid'] = $stateParams.id;

    return init();

    function init(){
      vm.stauts = [{id: 0, name: '需求分析'}, {id: 1, name: '概要设计'}, {id: 2, name: '详细设计'}, {id: 3, name: '已开发'}];
      AuthService
        .findJob()
        .then(function(res){
          vm.mantyprs = res.data;
        });
      vm.jobAges = [{id: 1, name: '1-3年'}, {id: 2, name: '4-6年'}, {id: 3, name: '7-10年'}, {id: 4, name: '10年以上'}];
      vm.requesttypes = [{id: 0, name: '整体项目'}, {id: 1, name: '驻场开发项目'}, {id: 2, name: '自由职业顾问项目'}];

      CompanyService
        .show({id: $stateParams.id,requesttype: $stateParams.requesttype,userid: $localStorage.user.userid})
        .then(function(res){
          vm.show = res.data;
          vm.show.requesttype = vm.requesttypes.filter(function(data){
            return data.id === vm.show.requesttype;
          });
          vm.show.stauts = vm.stauts.filter(function(data){
            return data.id === vm.show.stauts;
          });
         /* vm.show.mantypr = vm.mantyprs.filter(function(data){
            return data.id == vm.show.mantypr;
          });*/
          vm.show.ages = vm.jobAges.filter(function(data){
            return data.id == vm.show.ages;
          });
          if(vm.show.requesttype[0].id != 0){
            $('#requirements').html(vm.show.requirements);
          }
        })
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
              name: vm.show.name
            };
          }
        }
      })
    }
  }
})();
