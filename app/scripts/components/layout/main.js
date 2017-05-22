'use strict';
angular.module('DeepBlueAdminWebApp')
    .controller('com.deepblue.web.admin.MainController', [
        '$scope', '$window', '$state', '$mdToast',
        'Principal', '$mdDialog','$filter','$sessionStorage', '$translate', 'localStorageService',
        function ($scope, $window, $state, $mdToast,
                  Principal, $mdDialog,$filter,$sessionStorage, $translate, localStorageService) {

             $scope.langClass="lang-class-"+$sessionStorage.lang;
            ////获取设置的语言,改变这个class
            //有了页面刷新,不要这个事件
            //$scope.$on('changeLanguage', function(event,data) {
            //    $scope.langClass="lang-class-"+data.toLowerCase();
            //});

            $scope.$back = function () {
                $window.history.back();
            };
            $scope.$go = function (stateName, params) {
                $state.go(stateName, params);
            };
            $scope.showToast = function (content) {
                $mdToast.show($mdToast.simple().textContent(content).position('top right')
                    .hideDelay(1500));
            };
            $scope.showConfirm = function (desc, ev) {
                var confirm = $mdDialog.confirm()
                    .title($filter('translate')('buttons.hint'))//提示
                    .textContent(desc)
                    .ariaLabel('de')
                    .targetEvent(ev)
                    .ok($filter('translate')('buttons.confirm'))//确认
                    .cancel($filter('translate')('buttons.cancel'));//取消
                return $mdDialog.show(confirm);
            };
            $scope.showAlert= function(description) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title($filter('translate')('buttons.hint'))//提示
                        .textContent(description)
                        .ok($filter('translate')('buttons.ensure'))//确定
                );
            };
            var init = function () {
                // Principal.identity().then(function (data) {
                //     $scope.currentUser = data;
                //     //如果有语言则设置
                //     if (data.language) {
                //         $sessionStorage.lang = data.language.toLowerCase();//重载页面或者新建标签页执行mainController时刷新使用语言环境
                //         localStorageService.set('language', data.language.toLowerCase());
                //         $translate.use($sessionStorage.lang);
                //         //moment语言设置,默认用中文
                //         if ($sessionStorage.lang === 'en') {
                //             moment.locale('en');
                //         } else {
                //             moment.locale('zh-cn');
                //         }
                //     }
                // });
            };
            init();
        }
    ]);
