/**
 * Created by Jiechao Li
 */
angular.module('DeepBlueAdminWebApp')
    .directive('uploadImage', ['$http', function () {
        return {
            restrict: 'E',
            scope: {
                attachmentSrc: '=',
                deleteAttachment: '=',
                uploadFinish: '=',
                status:'=?',
                maxLength: '='
            },
            link: function ($scope, element, attrs) {
            },
            templateUrl: 'scripts/components/directives/upload.picture.tpl.html',
            controller: 'com.deepblue.web.UploadPictureController'
        }
    }])

    .directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeFunc = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeFunc);
            }
        };
    })

    .controller('com.deepblue.web.UploadPictureController', ['$scope',  '$state', 'localStorageService',
        'ExpenseService', '$mdDialog', '$filter',
        function ($scope, $state, localStorageService, ExpenseService, $mdDialog, $filter) {
            $scope.maxLength = $scope.maxLength ? $scope.maxLength : 9;
            $scope.view = {
                uploadImage: function () {

                    var file = document.getElementById('pic_uploader').files[0];
                    ExpenseService.uploadFile(file, $scope.uploadPicConfig.success, $scope.uploadPicConfig.error, $scope.uploadPicConfig.headers)
                        .success(function (data, status, headers) {
                            $scope.uploadFinish = true;
                            $scope.attachmentSrc.push(data);
                        })
                        .error(function(data){
                            console.log(data)
                        })
                    ;

                },
                deleteImage: function (index) {
                    if ($scope.attachmentSrc[index].attachmentOID === -1) {
                        $scope.attachmentSrc.splice(index, 1);
                    } else {
                        var oid = $scope.attachmentSrc[index].attachmentOID;
                        $scope.deleteAttachment.push(oid);
                        $scope.attachmentSrc.splice(index, 1);
                    }
                }
            };
            //上传图片配置
            $scope.uploadPicConfig = {
                success: function (data) {
                    $scope.uploadFinish = true;
                    var attachment = JSON.parse(data.response);
                    $scope.attachmentSrc[$scope.uploadPicConfig.headers.index].attachmentOID = attachment.attachmentOID;
                },
                error: function (error, msg) {
                    $mdDialog.show(
                        $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title($filter('translate')('directives.layout.upload.picture.networkFault'))//网络故障，请稍后再试。
                            .textContent(message)
                            .ok($filter('translate')('directives.layout.upload.picture.affirm'))//确认
                    );
                },
                headers: {}
            };
        }]);
