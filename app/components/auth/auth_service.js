(function () {
  'use strict';

  angular.module('app')
    .service('AuthService', AuthService);

  AuthService.$inject = ['ENDPOINT', '$http'];

  function AuthService(ENDPOINT, $http) {
    return {
      login: login,//登陆
      register:register,//检查注册信息
      experience: experience,//获取行业经验列表
      skill:skill,//获取擅长技能列表
      province: province,//获取省级列表
      city: city, //获取市级列表
      qualifications: qualifications,//上传企业注册
    };
    function login(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/checkName.action',
        data: data
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
        method: 'POST',
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
