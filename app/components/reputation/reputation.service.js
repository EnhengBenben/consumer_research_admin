(function(){
  'use strict';

  angular
    .module('app')
    .service('ReputationService', Service);
  /* @ngInject */

  function Service(ENDPOINT, $http) {
    return {
      list1: list1,
      list2: list2,
      list3: list3,
      list4: list4
    };

    function list1(data) {
      return $http({
        url: ENDPOINT + '/reputation/platforBadrate.do',
        method: 'POST',
        data: data
      })
    }

    function list2(data) {
      return $http({
        url: ENDPOINT + '/reputation/badrateBrend.do',
        method: 'POST',
        data: data
      })
    }

    function list3(data) {
      return $http({
        url: ENDPOINT + '/reputation/BadrateSort.do',
        method: 'POST',
        data: data
      })
    }

    function list4(data) {
      return $http({
        url: ENDPOINT + '/reputation/BadrateTopthree.do',
        method: 'POST',
        data: data
      })
    }


  }

})();
