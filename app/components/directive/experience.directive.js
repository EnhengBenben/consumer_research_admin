(function(){
  angular.module('app')
    .directive('notePlaceholder', directive);


  function directive(){
    var directive = {
      restrict: 'AE',
      templateUrl: 'components/directive/experience.directive.html',
      scope: {

      },
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  Controller.$inject = ['$scope', '$localStorage'];

  function Controller($scope, $localStorage){
    var vm = this;

  }
})();
