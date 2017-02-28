(function() {
  'use strict';

  angular
    .module('app')
    .directive('singleUploader', directive);

  /**
   * 单个文件上传Directive
   * 使用方式：
   * ``` html
   * 	<single-uploader url="vm.image.url"></single-uploader>
   * 	<single-uploader url="vm.image.url" name="vm.image.name" attachment-id="vm.image.attachmentId"></single-uploader>
   * ```
   * @return {object} Directive
   */
  function directive() {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/uploader/single_uploader.directive.html',
      scope: {
        'url': '=url',
        'name': '=?name',
        'attachmentId': '=?attachmentId'
      },
      controller: Controller
    };

    return directive;
  }

  Controller.$inject = ['$scope', '$http', 'FileUploader', 'ENDPOINT', 'toaster'];

  /* @ngInject */
  function Controller($scope, $http, FileUploader, ENDPOINT,toaster) {
    $scope.uploader = new FileUploader({
      url: ENDPOINT + '/uploadFile.action',
      method: 'POST',
      autoUpload: true,
      removeAfterUpload: true,
      onSuccessItem: function(item, response, status, headers) {
        if( item.file.type === 'image/png' || item.file.type === 'image/jpeg'){
          $scope.url = response;
          if(response){
            $scope.name = item.name;
            toaster.pop('success','上传成功');
          }
        }else {
          toaster.pop('warning','请上传png或者jpg格式的图片');
        }
        /*$scope.name = response.data.file.name;
        $scope.attachmentId = response.data.file['attachment_id'];*/
      }
    });
  }
})();
