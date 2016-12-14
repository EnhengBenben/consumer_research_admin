(function () {
  'use strict';

  angular.module('app')
    .service('ContractorsService', ContractorsService);

  ContractorsService.$inject = ['ENDPOINT', '$http'];

  function ContractorsService(ENDPOINT, $http) {
    return {
      list: list,//承包方列表
      show: show,//承包方详细信息
    };
    function list(params) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/showContractList.action',
        params: params
      });
    }

    function show(params) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/findContractById.action',
        params: params
      });
    }
  }

})();
