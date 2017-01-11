/**
 * Created by Administrator on 2017/1/9.
 */
(function () {
  'use strict';

  angular.module('app')
    .service('AlipayService', Service);


    /* @ngInject */
  function Service(ENDPOINT, $http) {
    return {
      list: list, //获取支付类型及详情
      companyInfo: companyInfo, //付费承接项目
      contractorsInfo: contractorsInfo, //查看承包方联系方式
      freelanceInfo: freelanceInfo, //查看自由职业者联系方式
      checkIsPayment: checkIsPayment, //查看付款状态
    };

    function checkIsPayment(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/checkIsPayment.action',
        data: data
      });
    }

    function freelanceInfo(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toZFSearchFreePeople.action',
        data: data
      });
    }

    function contractorsInfo(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toZFSearchContractor.action',
        data: data
      });
    }

    function companyInfo(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/toZFCJ.action',
        data: data
      });
    }

    function list(data) {
      return $http({
        method: 'POST',
        url: ENDPOINT + '/alipay/open.action',
        data: data
      });
    }
  }

})();
