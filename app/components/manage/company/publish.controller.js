(function () {
  'use strict';

  angular
    .module('app')
    .controller('ManageCompanyPublishCtrl', Controller);

  /* @ngInject */
  function Controller($localStorage, $state, toaster, $scope, AuthService, ManageService) {
    var vm = this;
    vm.sort = {
      type: 1
    };
    vm.user = $localStorage.user;
    vm.published = published;
    vm.status = [{id: 0, name: '需求分析'}, {id: 1, name: '概要设计'}, {id: 2, name: '详细设计'}, {id: 3, name: '已开发'}];
    vm.mantyprs = [{id: 0, name: 'JAVA工程师'}, {id: 1, name: 'PHP工程师'}, {id: 2, name: '.NET工程师'}];
    vm.jobAges = [
      {
        id: 0,
        name: '应届毕业生'
      },
      {
        id: 1,
        name: '1-3年'
      },
      {
        id: 2,
        name: '4-6年'
      },
      {
        id: 3,
        name: '7-10年'
      },
      {
        id: 4,
        name: '10年以上'
      }];
    return init();

    function init() {
      AuthService
        .province()
        .then(function (res) {
          vm.provinces = res.data;
        });
      $scope.$watch('vm.unitaddr.province', function (newValue, oldValue) {
        if (newValue != oldValue) {
          AuthService
            .city({provinceId: vm.unitaddr.province})
            .then(function (res) {
              vm.cities = res.data;
            });
        }
      }, true)
    }
    function published() {
     if(vm.publish.starttime){
       vm.publish.starttime = vm.publish.starttime.format('YYYY-MM-DD');
     }
     if(vm.publish.endtime){
       vm.publish.endtime = vm.publish.endtime.format('YYYY-MM-DD');
     }
     vm.publish.addr = vm.unitaddr.province + ',' + vm.unitaddr.city;
      vm.publish['userid'] = vm.user.userid;
      ManageService
        .publish(vm.publish)
        .then(function(res){
          vm.publish = {};
          $state.go('app.manage.company.list');
          toaster.pop('success','发布成功');
        })
    }
  }
})();
