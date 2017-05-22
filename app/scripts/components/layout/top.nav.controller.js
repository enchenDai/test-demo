'use strict';
angular.module('DeepBlueAdminWebApp')
    .controller('com.deepblue.web.TopNavigationController',
        ['$scope', '$state', 'Principal', 'Auth', '$rootScope', '$sessionStorage',
            '$filter', '$translate', 'localStorageService',
            function ($scope, $state, Principal, Auth, $rootScope, $sessionStorage,
                      $filter, $translate, localStorageService) {

                $scope.logout = function () {
                    Auth.logout();
                    $state.go('site.login');
                };
                $scope.view = {
                    selectIndex: -1,
                    languageName: null,
                    languageCode: $sessionStorage.lang,
                    languageList: [],
                    msIndex: -1,//马来语在语言列表里的index
                    selectItem: function (item, index) {

                        var code = item.code;
                        if (code.toLowerCase() === 'zh_cn') {
                            code = 'zh_CN';
                        }
                        //跟新语言
                        // SettingsGuideService.updateLanguage(code)
                        //     .success(function(data){
                        //         if(data.success){
                        //             $scope.view.selectIndex = index;
                        //             $scope.view.languageCode = item.code.toLowerCase();
                        //             $scope.view.languageName=item.comments;
                        //             $sessionStorage.lang = item.code.toLowerCase();
                        //             localStorageService.set('language', item.code.toLowerCase());
                        //             $scope.getLanguageList(item.code);
                        //             $translate.use($scope.view.languageCode);
                        //             //moment语言设置,默认用中文
                        //             if ($scope.view.languageCode === 'en') {
                        //                 moment.locale('en');
                        //             } else {
                        //                 moment.locale('zh-cn');
                        //             }
                        //
                        //           //  $scope.$emit('changeLanguage', code);
                        //             window.location.reload();
                        //
                        //         }
                        //     });

                    }
                };
                // $scope.getLanguageList = function (code) {
                //     if(code.toLowerCase()==='zh_cn'){
                //         code='zh_CN';
                //     }
                //     SettingsGuideService.getLanguageList(code)
                //         .success(function (data) {
                //             $scope.view.languageList = angular.copy(data);
                //             $scope.view.languageList.forEach(function (item) {
                //                 if(item.code.toLowerCase()==='zh_cn'){
                //                     item.code="zh_cn";
                //                 }
                //
                //             });
                //             $scope.view.languageList.forEach(function (item, index) {
                //                 if (item.code.toLowerCase() === $scope.view.languageCode.toLowerCase()) {
                //                     $scope.view.selectIndex = index;
                //                     $scope.view.languageName=item.comments;
                //                 }
                //                 //隐藏掉马来语
                //                 if (item.code.toLowerCase() === 'ms') {
                //                     $scope.view.msIndex = index;
                //                 }
                //             });
                //             if ($scope.view.msIndex !== -1) {
                //                 $scope.view.languageList.splice($scope.view.msIndex, 1);
                //             }
                //         })
                // };
                function init() {
                    //如果用户使用多个终端，在其他终端上切换语言，在原来终端上重载页面，此时account api返回的语言信息更准确
                    // Principal.identity().then(function (data) {
                    //     //如果有语言则设置
                    //     if (data.language) {
                    //         $sessionStorage.lang = data.language.toLowerCase();
                    //         localStorageService.set('language', data.language.toLowerCase());
                    //     }
                    //     //获取语言环境,localStorage中在首次加载页面时更为准确
                    //     if (localStorageService.get('language')) {
                    //         $scope.view.languageCode = localStorageService.get('language');
                    //         $sessionStorage.lang = localStorageService.get('language');
                    //     }
                    //     $scope.getLanguageList($sessionStorage.lang);
                    // });
                }

                init();

            }]);
