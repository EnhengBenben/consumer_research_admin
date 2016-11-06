(function(){
  'use strict';

  angular
    .module('app')
    .service('StructureService', Service);
  /* @ngInject */

  function Service(ENDPOINT, $http) {
    return {
      list: list,
      line: line,
    };

    function line(data) {
      return $http({
        url: ENDPOINT + '/structure/toptenForLines.do',
        method: 'POST',
        data: data
      })
    }

    function list(data) {
      return $http({
        url: ENDPOINT + '/structure/structureOverview.do',
        method: 'POST',
        data: data
      })
    }


  }

})();
