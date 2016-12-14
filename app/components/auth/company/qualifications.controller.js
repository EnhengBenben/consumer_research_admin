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
      angular.extend(vm.add,$localStorage.username);
      angular.extend(vm.add,$localStorage.base);
      angular.extend(vm.add,$localStorage.experience);
      angular.extend(vm.add,$localStorage.skill);
      var str = [];
      angular.forEach(vm.add.skills,function(i){
        str.push(i.ids);
      });
      vm.add.skills = str.join(',');
      var qualificationsArr = [];
      angular.forEach(vm.add.qualifications,function(i){
        qualificationsArr.push(i.zname + ',' + i.zzurl);
      });
      vm.add.qualificationll = qualificationsArr.join('-');

      AuthService
        .qualifications(vm.add)
        .then(function(res){
          console.log(res);
          delete $localStorage.username;
          delete $localStorage.base;
          delete $localStorage.experience;
          delete $localStorage.skill;
          $state.go('go.login');
          toaster.pop('success','恭喜！注册已完成');
        });

    }
  }
})();
