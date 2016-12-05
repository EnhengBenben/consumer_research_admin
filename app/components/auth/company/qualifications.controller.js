(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyQualificationCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    vm.add = {
      qualifications: [{
        zname: '',
        zzurl: ''
      }]
    };


    return init();

    function init(){
      vm.removeOption = function(index) {
        if(vm.add.qualifications.length == 1){
          vm.add.qualifications.splice(0, 1);
        }else {
          vm.add.qualifications.splice(index, 1);
        }
      };

      vm.addOption = function() {
        if(!vm.add.qualifications){
          vm.add.qualifications = [];
        }
        vm.add.qualifications.push({
          zname: '',
          zzurl:'',
        });
      };
    }
    function next(){
      console.log(vm.add);
      if($localStorage.username.email){
        vm.add['username'] = $localStorage.username.email;
      }else if($localStorage.username.tel){

      }
      angular.extend(vm.add,$localStorage.base);
      angular.extend(vm.add,$localStorage.experience);
      angular.extend(vm.add,$localStorage.skill);
      console.log(vm.add);
      AuthService
        .qualifications(vm.add)
        .then(function(res){
          console.log(res);
          $state.go('go.login');
          toaster.pop('success','恭喜！注册已完成');
        });

    }
  }
})();
