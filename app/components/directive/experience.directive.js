(function(){
  angular.module('app')
    .directive('experience', directive);


  function directive(){
    var directive = {
      restrict: 'AE',
      templateUrl: 'components/directive/experience.directive.html',
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
    vm.model = [];
  }
})();
