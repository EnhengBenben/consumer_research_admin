(function(){

  'use strict';

  angular.module('app')
    .service('FreelanceService', Service);

  /*@inject*/

  function Service(ENDPOINT, $http){
    return{
      list: list,//自由职业者列表
      show: show,//自由职业者详情
      city: city, //获取城市列表
      province: province,//获取省份列表
    };

    function province(){
      return  $http({
        url: ENDPOINT + '/searchAllProvince.action',
        method: 'GET',
      })
    }

    function city(){
      return  $http({
        url: ENDPOINT + '/searchAllCity.action',
        method: 'GET',
      })
    }

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
