(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalSettingListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, PersonalService, AuthService) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.saveExperience = saveExperience;
    vm.saveSkills = saveSkills;
    vm.removeOption = removeOption;
    vm.addOption = addOption;
    vm.add = {
      qualifications: [{
        zname: '',
        zzurl: ''
      }]
    };

    return init();

    function init(){
      vm.jobAges = [
        {
          id:0,
          name: '应届毕业生'
        },
        {
          id:1,
          name: '1-3年'
        },
        {
          id:2,
          name: '4-6年'
        },
        {
          id:3,
          name: '7-10年'
        },
        {
          id:4,
          name: '10年以上'
        }];
      vm.EnglishLevel = [{id: 0, name: '一般'},{id: 1, name:  '良好'}];
      vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'},
        {id: 2, name: '民办非企业单位'}, {id: 3, name: '个体工商户'},
        {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];
      //============================================================================//
      //****************************初始化数据获取**********************************//
      //============================================================================//
      AuthService
        .province()
        .then(function(res){
          vm.provinces = res.data;
        });
      AuthService
        .findJob()
        .then(function(res){
          vm.jobs = res.data;
        });
      $scope.$watch('vm.unitaddr.province',function(newValue, oldValue){
        if(newValue != oldValue){
          AuthService
            .city({provinceId:vm.unitaddr.province})
            .then(function(res){
              vm.cities = res.data;
            });
        }
      }, true);
      AuthService
        .experience()
        .then(function(res){
          vm.experiences = res.data;
        });
      AuthService
        .skill()
        .then(function (res) {
          vm.skills = res.data;
        });
      //============================================================================//
      //****************************数据回显****************************************//
      //============================================================================//
      PersonalService
        .searchInfo(vm.user)
        .then(function(res){
          vm.settingObj = res.data.qQYInfoQueryVo;
          var arrayExp = [];
          var arraySkill = [];
          arrayExp = vm.settingObj.experience.split(',');
          arraySkill = vm.settingObj.skills.split(',');
          vm.model = {};
          vm.skill = {};
          for(var i= 0;i< arrayExp.length; i++){
            vm.model[arrayExp[i]] = parseInt(arrayExp[i]);
          }
          for(var i= 0;i< arraySkill.length; i++){
            vm.skill[arraySkill[i]] = parseInt(arraySkill[i]);
          }
          var znameArr = vm.settingObj.zname.split('-');
          for( var i= 0;i< znameArr.length; i++){
            znameArr[i] = znameArr[i].split(',');
          }
          console.log(znameArr);
          for(var i= 0;i<znameArr.length;i++){
              vm.add.qualifications.push({
                zname: znameArr[i][0],
                zzurl: znameArr[i][1]
              })
          }
          console.log(vm.add);
        })
    }

   function removeOption(index) {
      if(vm.add.qualifications.length == 1){
        vm.add.qualifications.splice(0, 1);
      }else {
        vm.add.qualifications.splice(index, 1);
      }
    }

    function addOption() {
      if(!vm.add.qualifications){
        vm.add.qualifications = [];
      }
      vm.add.qualifications.push({
        zname: '',
        zzurl:''
      });
    }

    function saveExperience(){
      console.log(vm.model);
    }

    function saveSkills(){
      console.log(vm.skill);
    }
  }
})();
