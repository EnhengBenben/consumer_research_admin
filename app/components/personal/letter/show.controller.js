/**
 * Created by Administrator on 2016/12/29.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .controller('PersonalLetterShowCtrl', Controller);

  /* @ngInject */
  function Controller(PersonalService, $state, toaster, $scope, $stateParams) {
    var vm = this;
    vm.goBack = goBack;
    vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'}, {id: 2, name: '民办非企业单位'},
      {id: 3, name: '个体工商户'}, {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];

    return init();

    function init() {
      PersonalService
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

    function goBack(){
      history.back(-1);
    }
  }
})();