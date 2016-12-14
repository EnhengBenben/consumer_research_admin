(function(){

  'use strict';

  angular.module('app')
    .service('FreelanceService', Service);

  /*@inject*/

  function Service(ENDPOINT, $http){
    return{
      list: list,//自由职业者列表
      show: show,//自由职业者详情
    };

    function list(params){
     return  $http({
        url: ENDPOINT + '/showFreelance.action',
        method: 'GET',
        params: params
      })
    }

    function show(params){
     return $http({
        url: ENDPOINT + '/findPersonInfoById.action',
        method: 'GET',
        params: params
      })
    }

  }
})();
