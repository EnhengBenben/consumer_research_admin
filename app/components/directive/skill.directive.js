(function(){
  angular.module('app')
    .directive('skill', directive);


  function directive(){
    var directive = {
      restrict: 'AE',
      templateUrl: 'components/directive/skill.directive.html',
      scope: {
        lists: '=lists',
        model: '=model'
      },
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  Controller.$inject = ['$scope'];

  function Controller($scope){
    var vm = this;
    vm.lists = [];
  }
})();
