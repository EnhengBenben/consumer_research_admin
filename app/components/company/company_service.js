(function () {
  'use strict';

  angular.module('app')
    .service('CompanyService', CompanyService);

  CompanyService.$inject = ['ENDPOINT', '$http'];

  function CompanyService(ENDPOINT, $http) {
    return {
      list: list,//平台项目一览
      show: show,//平台项目详情
      undertake: undertake,//承接项目
    };
    function list(params) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/findPlatformProjectList.action',
        params: params
      });
    }

    function undertake(params) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/iWantCjProjectByRequestId.action',
        params: params
      });
    }

    function show(params) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/iWantTakeOver.action',
        params: params
      });
    }
  }

})();
