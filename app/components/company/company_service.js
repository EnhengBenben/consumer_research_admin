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
      sendMessages: sendMessages, //发私信列表
      returnMsg: returnMsg, // 回复私信
      tohelper: tohelper //免费撮合
    };
    function tohelper(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/tohelper.action',
        data: data
      });
    }

    function returnMsg(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toReturnMessage.action',
        data: data
      });
    }

    function sendMessages(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/sendMessages.action',
        data: data
      });
    }

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
