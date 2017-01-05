(function () {
  'use strict';

  angular.module('app')
    .service('ManageService', ManageService);

  ManageService.$inject = ['ENDPOINT', '$http'];

  function ManageService(ENDPOINT, $http) {
    return {
      publish: publish,//发布需求
      list: list,//需求列表
      more: more,//更多项目列表
      companyShow: companyShow, //管理中心项目详情
      search: search, // 查看已承接项目
      searchCjList: searchCjList, //查询承接该项目的人或者企业
      updateCstatus: updateCstatus //更改发布项目状态
    };
    function updateCstatus(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toUpdateCstatusByRid.action',
        data: data
      });
    }

    function searchCjList(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/searchCjList.action',
        data: data
      });
    }

    function publish(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/publishPlan.action',
        data: data
      });
    }

    function search(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/searchAcceptProject.action',
        data: data
      });
    }

    function companyShow(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/findPlatformProjectById.action',
        data: data
      });
    }

    function list(params) {
      return $http({
        method: 'GET',
        url: ENDPOINT + '/findMyProjectByUserIdFirst.action',
        params: params
      });
    }

    function more(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/findMyProjectByUserId.action',
        data: data
      });
    }
  }

})();
