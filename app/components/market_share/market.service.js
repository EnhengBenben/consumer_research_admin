(function(){
  'use strict';

  angular
    .module('app')
    .service('MarketService', Service);
  /* @ngInject */

  function Service(ENDPOINT, $http) {
    return {
      list: list, // list页数据

      onLineTop: onLineTop, // 渠道类别 上半部分数据 线上
      offLineTop: offLineTop, // 渠道类别 上半部分数据 线下
      lineBottom: lineBottom, //  渠道类别 下半部分数据

      productList: productList, // 产品类别接口
      productTopTen: productTopTen,//产品类别TOP10

      provinceTop: provinceTop, // 五大卖地 上半部分数据
      provinceBottom: provinceBottom, // 五大卖地 下半部分数据
    };

    function provinceTop(data){
      return $http({
        url: ENDPOINT + '/marketshare/provinceInfo.do',
        method: 'POST',
        data: data
      })
    }

    function provinceBottom(data){
      return $http({
        url: ENDPOINT + '/marketshare/provinceTopten.do',
        method: 'POST',
        data: data
      })
    }

    function productList(data) {
      return $http({
        url: ENDPOINT + '/marketshare/producttypeInfo.do',
        method: 'POST',
        data: data
      })
    }

    function productTopTen(data){
      return $http({
        url: ENDPOINT + '/marketshare/producttypeTopten.do',
        method: 'POST',
        data: data
      })
    }

    function lineBottom(data) {
      return $http({
        url: ENDPOINT + '/marketshare/toptenForlines.do',
        method: 'POST',
        data: data
      })
    }

    function onLineTop(data) {
      return $http({
        url: ENDPOINT + '/marketshare/onlineInfo.do',
        method: 'POST',
        data: data
      })
    }

    function offLineTop(data) {
      return $http({
        url: ENDPOINT + '/marketshare/offlineInfo.do',
        method: 'POST',
        data: data
      })
    }


    function list(data) {
      return $http({
        url: ENDPOINT + '/marketshare/monthweekyear.do',
        method: 'POST',
        data: data
      })
    }


  }

})();
