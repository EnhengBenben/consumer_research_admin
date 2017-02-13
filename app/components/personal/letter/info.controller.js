/**
 * Created by Administrator on 2017/1/5.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalInfoShowCtrl', Controller);

  /* @ngInject */
  function Controller(PersonalService, $localStorage, $scope, $uibModal, $stateParams) {
    var vm = this;
    vm.goBack = goBack;
    vm.reBack = reBack;
    vm.remove = remove;
    vm.user = $localStorage.user;
    vm.status = $stateParams.status;
    return init();

    function init() {
      if(vm.status === 'accept'){
        //收件箱
        PersonalService
          .updateMessageStatus({id: $stateParams.id})
          .then(function(res){
            $scope.$emit('read', true);
          });
        PersonalService
          .infoAcceptBox({id: $stateParams.id})
          .then(function(res){
            vm.letter = res.data;
          })
      }else {
        //发件箱
        PersonalService
          .infoSendBox({id: $stateParams.id})
          .then(function(res){
            vm.letter = res.data;
          })
      }
     /* PersonalService
        .show({id: $stateParams.id})
        .then(function (res) {

        })*/
    }

    function reBack(){
      var modalInstance = $uibModal.open({
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'components/company/model.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'md',
        resolve: {
          items: function () {
            return {
              id: vm.letter.sid,
              name: vm.letter.realname,
              returnMse: true
            };
          }
        }
      })
    }

    function remove(){
      var data = {
        id: vm.letter.id
      };
      if (vm.status === 'accept') {
        PersonalService
          .deleteInBox(data)
          .then(function (res) {
            history.back(-1);
          })
      } else {
        PersonalService
          .deleteOutBox(data)
          .then(function (res) {
            history.back(-1);
          })
      }
    }

    function goBack(){
      history.back(-1);
    }
  }
})();
