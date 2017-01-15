/**
 * Created by Administrator on 2016/12/30.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('RegisterFinishCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster) {
    var vm = this;
    vm.finish = finish;

    return init();

    function init(){

    }

    function finish(){
      $state.go('go.login');
    }


  }
})();
