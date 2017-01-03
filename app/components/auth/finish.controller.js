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


    return init();

    function init(){

    }


  }
})();
