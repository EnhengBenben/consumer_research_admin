(function () {
  'use strict';

  angular.module('app')
    .service('AuthService', AuthService);

  AuthService.$inject = ['ENDPOINT', '$http'];

  function AuthService(ENDPOINT, $http) {
    return {
      login: login,//登录
      register:register,//检查注册信息
      experience: experience,//获取行业经验列表
      skill:skill,//获取擅长技能列表
      province: province,//获取省级列表
      city: city, //获取市级列表
      qualifications: qualifications,//上传企业注册
      findJob: findJob,//获取工作下拉列表findJob.action
      personal: personal,//注册自由职业顾问
      toCheckCode: toCheckCode,//获取验证码
      compareCheckCode: compareCheckCode, //注册
      checkImgCode: checkImgCode, //获取图片验证码
      updatePassword: updatePassword, // 更改自由职业顾问密码
      checkPhone: checkPhone,//检查修改密码手机号验证
    };

    function checkPhone(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/getBackPassword/checkPhone.action',
        data: data
      });
    }

    function updatePassword(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/getBackPassword/updatePassword.action',
        data: data
      });
    }

    function checkImgCode(params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/checkimagecode.action',
        params: params
      });
    }

    function compareCheckCode(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/compareCheckCode.action',
        data: data
      });
    }

    function login(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/checkName.action',
        data: data
      });
    }

    function toCheckCode(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toCheckCode.action',
        data: data
      });
    }
    function personal(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toPersonRegisterPage.action',
        data: data
      });
    }
    function findJob() {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/findJob.action'
      });
    }
    function qualifications(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toEnterpriseRegister.action',
        data: data
      });
    }
    function province() {
      return $http({
        method: 'PUT',
        url: ENDPOINT + '/findCity.action'
      });
    }
    function city(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/findCityByProvinceId.action',
        data: data
      });
    }

    function skill() {
      return $http({
        method: 'GET',
        catch: true,
        url: ENDPOINT + '/searchKills.action',
      });
    }

    function experience() {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/searchExperience.action',
      });
    }

    function register(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toCheckName.action',
        data: data
      });
    }
  }

})();
