(function(){
  'use strict';

  angular.module('app')
    .controller('GoLayoutController', GoLayoutController);

  GoLayoutController.$inject = ['$scope', 'toaster', 'AuthService', '$state', '$localStorage'];

  function GoLayoutController($scope, toaster, AuthService, $state, $localStorage) {
    var vm = this;
    vm.register = {

    };
    return init();

    function init() {
      /**
       * Particleground demo
       * @author Jonathan Nicol - @mrjnicol
       */
    /*  $('#particles').particleground();
        $('#particles').particleground({
       dotColor: '#5cbdaa',
       lineColor: '#5cbdaa'
       });
      document.addEventListener('DOMContentLoaded', function () {
        particleground(document.getElementById('particles'), {
          dotColor: '#5cbdaa',
          lineColor: '#5cbdaa'
        });
        var intro = document.getElementById('intro');
        intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
      }, false);*/


       // jQuery plugin example:
       $(document).ready(function() {
      /* $('#particles').particleground({
       dotColor: '#5cbdaa',
       lineColor: '#5cbdaa'
       });
       $('.intro').css({
       'margin-top': -($('.intro').height() / 2)
       });*/
       });
    }
  }

})();
