(function() {
  'use strict';

  angular
    .module('app')
    .service('AverageService', Service);
  /* @ngInject */

  function Service(ENDPOINT, $http) {
    return {
      list: list,
      onLine: onLine,
      offLine: offLine,
      topTen: topTen,
      productTop: productTop,
      productTopTen: productTopTen,
      regionTop: regionTop,
      regionBottom: regionBottom
    };

    function topTen(data) {
      return $http({
        url: ENDPOINT + '/price/lineviewTopten.do',
        method: 'POST',
        data: data
      })
    }

    function regionBottom(data) {
      return $http({
        url: ENDPOINT + '/price/priceprovinceTopten.do',
        method: 'POST',
        data: data
      })
    }

    function regionTop(data) {
      return $http({
        url: ENDPOINT + '/price/priceprovince.do',
        method: 'POST',
        data: data
      })
    }

    function productTop(data) {
      return $http({
        url: ENDPOINT + '/price/pricesort.do',
        method: 'POST',
        data: data
      })
    }

    function productTopTen(data) {
      return $http({
        url: ENDPOINT + '/price/priceproductTopten.do',
        method: 'POST',
        data: data
      })
    }

    function list(data) {
      return $http({
        url: ENDPOINT + '/price/avgPriceInfo.do',
        method: 'POST',
        data: data
      })
    }

    function onLine(data) {
      return $http({
        url: ENDPOINT + '/price/onlineview.do',
        method: 'POST',
        data: data
      })
    }

    function offLine(data) {
      return $http({
        url: ENDPOINT + '/price/offlineview.do',
        method: 'POST',
        data: data
      })
    }
  }
})();
