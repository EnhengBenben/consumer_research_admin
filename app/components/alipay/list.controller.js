/**
 * Created by Administrator on 2017/1/9.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('AlipayListCtrl', Controller);

  /* @ngInject */
  function Controller($state, toaster, AlipayService, $stateParams, $localStorage, ENDPOINT) {
    var vm = this;
    vm.params = {
      lid: parseInt($stateParams.id),
      alipaytype: parseInt($stateParams.type),
      userid: $localStorage.user.userid,
      orderid: 12898923,
      title: '查看自由职业顾问信息',
      desc: '啊是觉得好卡',
      price: '0.01'
    };

    return init();

    function init(){
      window.open('http://192.168.0.116:8080/stproject/alipay/index.action', '_blank');
     /* $.ajax({
        method: 'POST',
        url: ENDPOINT + '/alipay/open.action',
        contentType: "text/html;charset=UTF-8",
        data: vm.params,
        success: function(res){
          console.log(res.sHtmlText);
          //vm.formData = res;
          $('#formData').append(res.sHtmlText);
        }
      });*/
    /*  AlipayService
        .list(vm.params)
        .then(function(res){
          vm.formData = res.data;
          vm.formData = vm.formData.split('\\').join('');
          $('#formData').append(vm.formData);
        })*/

    }

  }
})();
