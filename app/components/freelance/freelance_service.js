(function(){

  'use strict';

  angular.module('app')
    .service('FreelanceService', Service);

  /*@inject*/

  function Service(ENDPOINT, $http){
    return{
      list: list,//自由职业顾问列表
      show: show,//自由职业顾问详情
      city: city, //获取城市列表
      province: province,//获取省份列表
      tohelper: tohelper, //撮合沟通
    };

    function tohelper(data){
      return  $http({
        url: ENDPOINT + '/toInsertHelptops.action',
        method: 'POST',
        data: data
      })
    }

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
