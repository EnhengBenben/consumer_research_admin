(function(){
  'use strict';

  angular
    .module('app')
    .service('OverviewService', Service);
  /* @ngInject */

  function Service(ENDPOINT, $http) {
    return {
      yearArea: yearArea,
      monthArea: monthArea,
      weekArea: weekArea,
      trendOverview: trendOverview,
      yearXilie: yearXilie,
      monthXilie: monthXilie,
      weekXilie: weekXilie,
      view: view
    };

    function view(data) {
      return $http({
        url: ENDPOINT + '/marketOverview/view.do',
        method: 'POST',
        data: data
      })
    }

    function weekXilie(data) {
      return $http({
        url: ENDPOINT + '/xilieOverview/week.do',
        method: 'POST',
        data: data
      })
    }

    function monthXilie(data) {
      return $http({
        url: ENDPOINT + '/xilieOverview/month.do',
        method: 'POST',
        data: data
      })
    }

    function yearXilie(data) {
      return $http({
        url: ENDPOINT + '/xilieOverview/year.do',
        method: 'POST',
        data: data
      })
    }

    function trendOverview(data) {
      return $http({
        url: ENDPOINT + '/trendOverview/trend.do',
        method: 'POST',
        data: data
      })
    }

    function yearArea(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/areaOverview/year.do',
        data: data
      });
    }

    function monthArea(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/areaOverview/month.do',
        data: data
      });
    }

    function weekArea(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/areaOverview/week.do',
        data: data
      });
    }

  }

})();
