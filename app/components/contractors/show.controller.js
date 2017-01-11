(function () {
  'use strict';

  angular
    .module('app')
    .controller('ContractorsShowCtrl', Controller);

  /* @ngInject */
  function Controller(ContractorsService, $state, toaster, $scope, $stateParams) {
    var vm = this;
    vm.showContact = showContact;
    vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'}, {id: 2, name: '民办非企业单位'},
      {id: 3, name: '个体工商户'}, {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];

    return init();

    function init() {
      ContractorsService
        .show({id: $stateParams.id})
        .then(function (res) {
          vm.show = res.data;
          vm.show.zname = vm.show.zname.split('-').join(',').split(',');
          vm.flattypeArr.map(function (i) {
            if (vm.show.flattype === i.id) {
               vm.show.flattype = i.name;
            }
          })
        })
    }
    function showContact(){
      $state.go('alipay.list',{id: $stateParams.id,type: 2});
    }
  }
})();
