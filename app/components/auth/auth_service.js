(function () {
  'use strict';

  angular.module('app')
    .service('AuthService', AuthService);

  AuthService.$inject = ['ENDPOINT', '$http'];

  function AuthService(ENDPOINT, $http) {
    return {
      login: login,
      register:register,
      experience: experience,
      skill:skill,
      province: province,
      city: city,
    };
    function login(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/checkName.action',
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
