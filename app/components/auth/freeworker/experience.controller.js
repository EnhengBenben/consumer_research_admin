(function () {
  'use strict';

  angular
    .module('app')
    .controller('FreeExperienceCtrl', Controller);

  /* @ngInject */
  function Controller(AuthService, $state, toaster, $scope, $localStorage) {
    var vm = this;
    vm.next = next;
    vm.back = back;
    vm.experience = {};
    if($localStorage.experience){
      var array = {};
      array = $localStorage.experience.experience.split(',');
      for(var i=0; i< array.length; i++){
        vm.experience[parseInt(array[i]) - 1] = parseInt(array[i]);
      }
    }

    return init();

    function init(){
      AuthService
        .experience()
        .then(function(res){
          vm.lists = res.data;
        })
    }

    function next(){
      if(vm.experience){
        var str = '';
        angular.forEach(vm.experience,function(i){
          if(i){
            str += i + ',';
          }
        });
        str = str.slice(0,str.length - 1);
        $localStorage.experience = {
          experience: str
        };
        if(str.length){
          $state.go('free.skill');
          toaster.pop('success','已保存，请继续完成注册');
        }else {
          toaster.pop('error','请至少选择一项');
        }
      }
    }

    function back(){
      history.back(-1);
    }
  }
})();
