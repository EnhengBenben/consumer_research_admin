(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalSettingListCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, PersonalService, AuthService, $filter) {
    var vm = this;
    vm.user = $localStorage.user;
    vm.saveExperience = saveExperience; //保存行业经验
    vm.saveSkills = saveSkills; //保存擅长技能
    vm.saveBase = saveBase; //保存企业基本信息
    vm.saveFreelanceBase = saveFreelanceBase; //保存自由职业顾问基本信息
    vm.removeOption = removeOption; //删除企业资质选项
    vm.addOption = addOption; //添加企业资质
    vm.saveQua = saveQua; //保存企业资质
    vm.FreelanceResume = FreelanceResume; //保存自由职业顾问履历
    vm.add = {
      qualifications: [{
        zname: '',
        zzurl: ''
      }]
    };
    vm.unitaddr = {
      province: '',
      city: ''
    };

    return init();

    function init() {
      var dateParse = $filter('date');
      vm.dateOptions = {
        now: dateParse(new Date, 'yyyy-MM-dd'),
        minDate: moment()
      };
      vm.jobAges = [{id: 1, name: '1年'}, {id: 2, name: '2年'}, {id: 3, name: '3年'}, {id: 4, name: '4年'}, {id: 5, name: '5年'}
        , {id: 6, name: '6年'}, {id: 7, name: '7年'}, {id: 8, name: '8年'}, {id: 9, name: '9年'}, {id: 10, name: '10年及以上'}];
      vm.EnglishLevel = [{id: 0, name: '一般'}, {id: 1, name: '良好'}];
      vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'},
        {id: 2, name: '民办非企业单位'}, {id: 3, name: '个体工商户'},
        {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];
      vm.levels = [{id: 0, name: '初级工程师'}, {id: 1, name: '中级工程师'}, {id: 2, name: '高级工程师'}];
      vm.certificates = [{id: 0, name: '微软证书'}, {id: 1, name: 'ORACLE DBA认证'}, {id: 2, name: '其它'}];
      //============================================================================//
      //****************************初始化数据获取**********************************//
      //============================================================================//
      AuthService
        .province()
        .then(function (res) {
          vm.provinces = res.data;
        });
      AuthService
        .findJob()
        .then(function (res) {
          vm.jobs = res.data;
        });
      $scope.$watch('vm.unitaddr.province', function (newValue, oldValue) {
        if (newValue != oldValue) {
          AuthService
            .city({provinceId: vm.unitaddr.province})
            .then(function (res) {
              vm.cities = res.data;
            });
        }
      }, true);
      AuthService
        .experience()
        .then(function (res) {
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
        .then(function (res) {
          vm.settingObj = res.data.qQYInfoQueryVo;
          //============================================================================//
          //****************************时间格式修改****************************************//
         /* vm.settingObj.dobusiness = vm.settingObj.dobusiness.substring(0,vm.settingObj.dobusiness.length);
          console.log(typeof  vm.settingObj.dobusiness);*/
          //============================================================================//
          var arrayExp = [];
          var arraySkill = [];
          arrayExp = vm.settingObj.experience.split(',');
          arraySkill = vm.settingObj.skills.split(',');
          if (vm.settingObj.unitaddr) {
            vm.unitaddr.province = parseInt(vm.settingObj.unitaddr.split(',')[0]);
            vm.unitaddr.city = parseInt(vm.settingObj.unitaddr.split(',')[1]);
          }
          if (vm.settingObj.address) {
            vm.unitaddr.province = parseInt(vm.settingObj.address.split(',')[0]);
            vm.unitaddr.city = parseInt(vm.settingObj.address.split(',')[1]);
          }
          vm.model = {};
          vm.skill = {};
          for (var i = 0; i < arrayExp.length; i++) {
            vm.model[arrayExp[i]] = parseInt(arrayExp[i]);
          }
          for (var i = 0; i < arraySkill.length; i++) {
            vm.skill[arraySkill[i]] = parseInt(arraySkill[i]);
          }
          if (vm.settingObj.zname) {
            var znameArr = vm.settingObj.zname.split('-');
            for (var i = 0; i < znameArr.length; i++) {
              znameArr[i] = znameArr[i].split(',');
            }
            for (var i = 0; i < znameArr.length; i++) {
              vm.add.qualifications.push({
                zname: znameArr[i][0],
                zzurl: znameArr[i][1]
              })
            }
            vm.add.qualifications.splice(0, 1);
          }
        })
      $scope.$watch('vm.add.qualifications', function (newVal, oldVal) {
        if (newVal != oldVal) {
          for (var i = 0; i < vm.add.qualifications.length; i++) {
            if (vm.add.qualifications[i].zname === "" || vm.add.qualifications[i].zzurl === "") {
              vm.addTag = true;
              break;
            } else {
              vm.addTag = false;
            }
          }
        }
      }, true);
    }

    function removeOption(index) {
      if (vm.add.qualifications.length == 1) {
       // vm.add.qualifications.splice(0, 1);
      } else {
        vm.add.qualifications.splice(index, 1);
      }
    }

    function addOption() {
      if (!vm.addTag) {
        if (!vm.add.qualifications) {
          vm.add.qualifications = [];
        }
        for (var i = 0; i < vm.add.qualifications.length; i++) {
          if (vm.add.qualifications[i].zname === "") {
            toaster.pop('error', '请完善已有项');
            break;
          } else if (vm.add.qualifications[i].zzurl === "") {
            toaster.pop('error', '请完善已有项');
            break;
          }
        }
        vm.add.qualifications.push({
          zname: '',
          zzurl: '',
        });
      }
    }

    function saveExperience() {
      var str = [];
      for (var i in vm.model) {
        if (vm.model[i] != false) {
          str.push(i);
        }
      }
      var params = {
        experience: str.join(','),
        userid: vm.user.userid,
      };
      if (vm.user.type === 0) {
        PersonalService
          .updateCompanyExp(params)
          .then(function (res) {
            toaster.pop('success', res.data);
          })
      } else if (vm.user.type === 1) {
        PersonalService
          .updateFreelanceExp(params)
          .then(function (res) {
            toaster.pop('success', res.data);
          })
      }
    }

    function saveSkills() {
      var str = [];
      for (var i in vm.skill) {
        if (vm.skill[i] != false) {
          str.push(i);
        }
      }
      var params = {
        skills: str.join(','),
        userid: vm.user.userid,
        other: vm.settingObj.other
      };
      if (vm.user.type === 0) {
        PersonalService
          .updateCompanySkill(params)
          .then(function (res) {
            toaster.pop('success', res.data);
          })
      } else if (vm.user.type === 1) {
        PersonalService
          .updateFreelanceSkill(params)
          .then(function (res) {
            toaster.pop('success', res.data);
          })
      }
    }

    function saveBase() {
      var data = angular.copy(vm.settingObj);
      angular.extend(data, vm.user);
      data.unitaddr = vm.unitaddr.province + ',' + vm.unitaddr.city;
      PersonalService
        .updateBase(data)
        .then(function (res) {
          toaster.pop('success', res.data);
        })
    }

    function saveFreelanceBase() {
      var data = angular.copy(vm.settingObj);
      angular.extend(data, vm.user);
      data.address = vm.unitaddr.province + ',' + vm.unitaddr.city;
      PersonalService
        .updateFreelanceBase(data)
        .then(function (res) {
          toaster.pop('success', res.data);
        })
    }

    function saveQua() {
      var qualificationsArr = [];
      angular.forEach(vm.add.qualifications, function (i) {
        qualificationsArr.push(i.zname + ',' + i.zzurl);
      });
      vm.add.qualificationll = qualificationsArr.join('-');
      var params = {
        zname: vm.add.qualificationll,
        userid: vm.user.userid
      };
      PersonalService
        .updateCompanyQua(params)
        .then(function (res) {
          toaster.pop('success', res.data);
        })
    }

    function FreelanceResume() {
      var data = angular.copy(vm.settingObj);
      data['userid'] = vm.user.userid;
      PersonalService
        .updateFreelanceResume(data)
        .then(function (res) {
          toaster.pop('success', res.data);
        })
    }


  }
})();
