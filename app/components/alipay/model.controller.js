/**
 * Created by Administrator on 2017/1/10.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('AlipayModalCtrl', Controller);

  /* @ngInject */
  function Controller($state, items, $localStorage, $uibModalInstance, $interval, toaster, AlipayService) {
    var vm = this;
    vm.ok = ok;//确定支付
    vm.cancel = cancel; //取消页面展示
    vm.showContect = showContect;//支付成功获取联系方式
    vm.loadingBar = loadingBar;//展示进度条
    vm.reBack = reBack;//支付失败，重新支付
    vm.user = $localStorage.user; //获取用户信息
    return init();

    function init(){
      if(items.type === 3){                   /*承接项目，获取相应订单信息*/
        vm.params = {
          userid: vm.user.userid,
          rid: parseInt(items.id)
        };
        AlipayService
          .companyInfo(vm.params)
          .then(function(res){
            vm.showInfo = res.data;
          })
      }
      if(items.type === 2){                   /*查看承包方详情，获取相应订单信息*/
        vm.params = {
          userid: vm.user.userid,
          rid: parseInt(items.id)
        };
        AlipayService
          .contractorsInfo(vm.params)
          .then(function(res){
            vm.showInfo = res.data;
          })
      }
      if(items.type === 1){                     /*查看自由职业者详情，获取相应订单信息*/
        vm.params = {
          userid: vm.user.userid,
          rid: parseInt(items.id)
        };
        AlipayService
          .freelanceInfo(vm.params)
          .then(function(res){
            vm.showInfo = res.data;
          })
      }

    }

    function ok(){
      if(vm.select){
        vm.loading = true;//开始加载进度条
        vm.loadingBar();
      }else {
        toaster.pop('warning', '请选择付款方式');
      }
    }

    function loadingBar(){
      vm.value = 0;
      var timer = $interval(function(){
        vm.value += 10;
      },200,10);
      timer.then(function(){
        vm.wating = true; //等待付款
        if(items.type === 3){
          window.open('http://192.168.0.116:8080/stproject/alipay/index.action?orderid=' + vm.showInfo.orderid
            + '&title=' + vm.showInfo.title + '&price=' + vm.showInfo.price + '&desc= 123&userid=' + vm.user.userid
            + '&rid=' + vm.showInfo.rid + '&alipaytype=' + 1, '_blank');
        }else if(items.type === 2){
          window.open('http://192.168.0.116:8080/stproject/alipay/index.action?orderid =' + vm.showInfo.orderid
            + '&title=' + vm.showInfo.title + '&price=' + vm.showInfo.price + '&desc= 123&userid=' + vm.user.userid
            + '&cid=' + vm.showInfo.cid + '&alipaytype=' + items.type, '_blank');
        }else if(items.type === 1){
          window.open('http://192.168.0.116:8080/stproject/alipay/index.action?orderid =' + vm.showInfo.orderid
            + '&title=' + vm.showInfo.title + '&price=' + vm.showInfo.price + '&desc= 123&userid=' + vm.user.userid
            + '&zid=' + vm.showInfo.zid + '&alipaytype=' + 3, '_blank');
        }
      })
    }

    function reBack(){
      vm.loading = false;
      vm.wating = false;
      init();
    }

    function cancel(){
      $uibModalInstance.dismiss();
    }

    function showContect() {
      var params = {
        orderid: vm.showInfo.orderid
      };
      AlipayService
        .checkIsPayment(params)
        .then(function (res) {
          if(res.data.data == 1){
            toaster.pop('error', '暂未收到付款信息');
            vm.reBack();
          }else if(res.data.data == 2){
            toaster.pop('success', '恭喜您支付成功');
          }else {
            toaster.pop('warning', '请确认订单已提交');
            vm.reBack();
          }
        });
    }
  }
})();
