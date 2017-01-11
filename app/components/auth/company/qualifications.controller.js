(function () {
  'use strict';

  angular
    .module('app')
    .controller('CompanyQualificationCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService) {
    var vm = this;
    vm.next = next;
    vm.back = back;
    vm.addTag = true;
    vm.add = {
      qualifications: [{
        zname: '',
        zzurl: ''
      }]
    };


    return init();

    function init() {

      $scope.$watch('vm.add.qualifications',function(newVal, oldVal){
        if(newVal != oldVal){
          for (var i = 0; i < vm.add.qualifications.length; i++) {
            if (vm.add.qualifications[i].zname === "" || vm.add.qualifications[i].zzurl === "") {
              vm.addTag = true;
              break;
            }else {
              vm.addTag = false;
            }
          }
        }
      }, true);


      vm.removeOption = function (index) {
        if (vm.add.qualifications.length === 1) {
          //vm.add.qualifications.splice(0, 1);
        } else {
          vm.add.qualifications.splice(index, 1);
        }
      };

      vm.addOption = function () {
      if(!vm.addTag){
        if (!vm.add.qualifications) {
          vm.add.qualifications = [];
        }
        for (var i = 0; i < vm.add.qualifications.length; i++) {
          if (vm.add.qualifications[i].zname === "") {
            toaster.pop('error', '资质名称不能为空');
            break;
          } else if (vm.add.qualifications[i].zzurl === "") {
            toaster.pop('error', '请上传企业资质');
            break;
          }
        }
        vm.add.qualifications.push({
          zname: '',
          zzurl: '',
        });
      }
      };
    }

    function next() {
      angular.extend(vm.add, $localStorage.username);
      angular.extend(vm.add, $localStorage.base);
      angular.extend(vm.add, $localStorage.experience);
      angular.extend(vm.add, $localStorage.skill);
      var qualificationsArr = [];
      angular.forEach(vm.add.qualifications, function (i) {
        qualificationsArr.push(i.zname + ',' + i.zzurl);
      });
      vm.add.qualificationll = qualificationsArr.join('-');
      var save = false;
      for (var i = 0; i < vm.add.qualifications.length; i++) {
        if (vm.add.qualifications[i].zname === "") {
          toaster.pop('error', '资质名称不能为空');
          save = false;
          break;
        } else {
          save = true;
        }
        if (vm.add.qualifications[i].zzurl === "") {
          toaster.pop('error', '请上传企业资质');
          save = false;
          break;
        } else {
          save = true;
        }
      }
      if(save){
        AuthService
          .qualifications(vm.add)
          .then(function (res) {
            delete $localStorage.username;
            delete $localStorage.base;
            delete $localStorage.experience;
            delete $localStorage.skill;
            $state.go('go.login');
            toaster.pop('success', '恭喜！注册已完成');
          });
      }
    }
    function back(){
      history.back(-1);
    }
  }
})();
