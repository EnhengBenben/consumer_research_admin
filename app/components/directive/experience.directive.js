(function(){
  angular.module('app')
    .directive('experience', directive);


  function directive(){
    var directive = {
      restrict: 'AE',
      templateUrl: 'components/directive/experience.directive.html',
      scope: {
        lists: '=lists',
        model: '=model',
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
    console.log($localStorage.username.acctype);
    vm.usertype = $localStorage.username.acctype;
    vm.lists = [];
    vm.model = [];
    vm.show = true;
  }
})();
