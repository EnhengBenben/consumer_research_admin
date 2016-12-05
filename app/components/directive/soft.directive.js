(function(){
  angular.module('app')
    .directive('soft', directive);


  function directive(){
    var directive = {
      restrict: 'AE',
      templateUrl: 'components/directive/soft.directive.html',
      scope: {
        lists: '=lists',
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
  }
})();
