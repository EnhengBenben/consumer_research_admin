(function(){
  angular.module('app')
    .directive('datePickerSelf', directive);


  function directive(){
    var directive = {
      restrict: 'AE',
      templateUrl: 'components/directive/datepicker.directive.html',
      scope: {
        dt: '=dt',
        min: '=min'
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
    $scope.touched = false;
    $scope.today = function() {
      vm.dt = new Date(new Date());
    };
    $scope.today();

    $scope.clear = function() {
      vm.dt = null;
    };
    $scope.inlineOptions = {
     // customClass: getDayClass,
      minDate: vm.min || new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      dateDisabled: disabled,
      formatYear: 'yy',
      minDate:  new Date(),
      startingDay: 1
    };

    // Disable weekend selection周末禁止选择
    function disabled(data) {
      var date = data.date,
        mode = data.mode;
      return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

   /* $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();
    $scope.toggleMin();*/

   /* $scope.open1 = function() {
      $scope.touched = !$scope.touched;
      $scope.popup1.opened = true;
    };*/

  /*  $scope.open2 = function() {
      $scope.popup2.opened = true;
    };*/

   /* $scope.setDate = function(year, month, day) {
      vm.dt = new Date(year, month, day);
    };*/

   /* $scope.formats = ['yyyy-MM-dd', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];*/
   // $scope.altInputFormats = ['M!/d!/yyyy'];

  /*  $scope.popup1 = {
      opened: false
    };*/

 /*   $scope.popup2 = {
      opened: false
    };*/

/*    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    }*/
  }
})();
