(function () {
  'use strict';

  angular
    .module('app')
    .controller('AppController', Controller);

  /* @ngInject */
  function Controller( $state, $scope, $localStorage) {
    var app = this;
    $scope.$state = $state;
    app.logout = logout;
    app.user = $localStorage.user;
    console.log(app.user);
    return init();

    function init(){
      $scope.$watch('app.user',function(newValue, oldValue){
        if(!app.user){
          $state.go('go.login');
        }
      }, true);
    }

    function logout(){
      $localStorage.user = {};
      app.user = '';
      $state.go('go.login');
    }
  }
})();
