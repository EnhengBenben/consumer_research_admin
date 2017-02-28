(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyShowCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, CompanyService, AuthService, ManageService, $stateParams) {
    var vm = this;
    vm.user = $localStorage.user;
    var params = {
      rid: $stateParams.id
    };
    angular.extend(params, vm.user);

    return init();

    function init() {
      vm.flattypeArr = [{id: 0, name: '企业'}, {id: 1, name: '事业单位'},
        {id: 2, name: '民办非企业单位'}, {id: 3, name: '个体工商户'},
        {id: 4, name: '社会团体'}, {id: 5, name: '党政及国家单位'}];
      AuthService
        .findJob()
        .then(function(res){
          vm.mantyprs = res.data;
        });
      vm.jobAges = [{id: 1, name: '1-3年'}, {id: 2, name: '4-6年'}, {id: 3, name: '7-10年'}, {id: 4, name: '10年以上'}];
      vm.requesttypes = [{id: 0, name: '整体项目'}, {id: 1, name: '驻场开发项目'}, {id: 2, name: '自由职业顾问项目'}];
      ManageService
        .searchCjList(params)
        .then(function (res) {
          vm.undertakeP = res.data.GR;
          vm.undertakeC = res.data.QY;
          angular.forEach(vm.undertakeC, function (data) {
            data.flattype = vm.flattypeArr.filter(function (i) {
              return data.flattype == i.id;
            })
          })
        });
      CompanyService
        .show({id: $stateParams.id, requesttype: $stateParams.requesttype, userid: vm.user.userid})
        .then(function (res) {
          vm.show = res.data;
          $('#requirements').html(vm.show.requirements);
          //vm.show.cstatus = vm.show.cstatus === 1? '开启':'关闭';
          vm.show.requesttype = vm.requesttypes.filter(function (data) {
            return data.id === vm.show.requesttype;
          });
          vm.show.ages = vm.jobAges.filter(function (data) {
            return data.id == vm.show.ages;
          });
        })
    }
  }
})();
