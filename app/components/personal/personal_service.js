(function(){

  'use strict';

  angular.module('app')
    .service('PersonalService', Service);

  /*@inject*/

  function Service(ENDPOINT, $http){
    return{
      list: list,//自由职业者列表
      show: show,//自由职业者详情
      searchInfo: searchInfo, //获取企业注册信息
    };

    function list(params){
     return  $http({
        url: ENDPOINT + '',
        method: 'GET',
        params: params
      })
    }

    function searchInfo(params){
      return  $http({
        url: ENDPOINT + '/searchInfoByUserId.action',
        method: 'GET',
        params: params
      })
    }

    function show(params){
    return  $http({
        url: ENDPOINT + '',
        method: 'GET',
        params: params
      })
    }

  }
})();
