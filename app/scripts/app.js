'use strict';

/**
 * @ngdoc overview
 * @name adminWebappApp
 * @description
 * # adminWebappApp
 *
 * Main module of the application.
 */
angular
    .module('DeepBlueAdminWebApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngSanitize',
        'ui.router',
        'LocalStorageModule',
        'ngMaterial',
        'treeControl',
        'lfNgMdFileInput',
        'DeepBlueAdminWebApp.mdSideMenu',
        'DeepBlueAdminWebApp.mdTable',
        'DeepBlueAdminWebApp.mdPopup',
        'infinite-scroll',
        'ngFileUpload',
        'checklist-model',
        'ngStorage',
        'froala',
        'cgBusy',
        'localytics.directives',
        'anim-in-out',
        'ngMaterialDatePicker',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'ng-sortable',
        'jkuri.gallery',
        'angulartics', //these two are for angular js and piwik(data analytics)
        'angulartics.piwik',
        'angular-szn-autocomplete',
        'angular-intro',
        //'mockData'
    ])
    .config([
        '$urlRouterProvider',
        '$stateProvider',
        '$httpProvider',
        '$mdThemingProvider',
        'mdSideMenuSectionsProvider',
        '$mdDateLocaleProvider',
        '$translateProvider',
        '$localStorageProvider',
        '$sessionStorageProvider',
        function ($urlRouterProvider,
                  $stateProvider,
                  $httpProvider,
                  $mdThemingProvider,
                  mdSideMenuSectionsProvider,
                  $mdDateLocaleProvider,
                  $translateProvider,
                  $localStorageProvider,
                  $sessionStorageProvider) {
            $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
            $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';
           // $httpProvider.interceptors.push('authInterceptor');
           // $httpProvider.interceptors.push('authExpiredInterceptor');
            $mdDateLocaleProvider.formatDate = function(date) {
                return date ? new Date(date).Format('yyyy-MM-dd') : null;
            };

            $translateProvider.useStaticFilesLoader({
                prefix: '/i18n/',
                suffix: '.json'
            });

            $localStorageProvider.setKeyPrefix('deepblue-');
            $sessionStorageProvider.setKeyPrefix('deepblue-');

            //手机可支持的语言列表
            var langList = ["zh_cn", "en", "ms"];
            var clientLocale = $translateProvider.resolveClientLocale().toLowerCase();


            //未登录时用系统语言，用户登录后则使用用户选择的语言
            //如果手机不支持语言列表里的语言，默认显示英文
            if(!$sessionStorageProvider.get('lang')){
                if (langList.indexOf(clientLocale) === -1) {
                    $sessionStorageProvider.set('lang', 'en');
                } else {
                    //获取当前手机的语言
                    $sessionStorageProvider.set('lang', clientLocale);
                }
            }


            // $urlRouterProvider.otherwise('/');
            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('site', {
                    abstract: true,
                    views: {
                        main: {
                            templateUrl: 'scripts/components/layout/main.tpl.html',
                            controller: 'com.deepblue.web.admin.MainController'
                        }
                    },
                    resolve: {
                        mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                            $translatePartialLoader.addPart('global');
                            return $translate.refresh();
                        }]
                    }
                })
                .state('site.app', {
                    parent: 'site',
                    abstract: true,
                    views: {
                        'content@main': {},
                        'sideNav': {
                            templateUrl: 'scripts/components/layout/sidenav.tpl.html',
                            controller: 'com.deepblue.web.common.SideNavController'
                        },
                        'topNav': {
                            templateUrl: 'scripts/components/layout/top.nav.tpl.html',
                            controller: 'com.deepblue.web.TopNavigationController'
                        }
                    }
                });
            mdSideMenuSectionsProvider.initWithTheme($mdThemingProvider);
            $mdThemingProvider.definePalette('deepbluePalette', {
                '50': 'ffebee',
                '100': 'ffcdd2',
                '200': 'ef9a9a',
                '300': 'e57373',
                '400': 'ef5350',
                '500': '0092da',
                '600': 'e53935',
                '700': 'd32f2f',
                '800': 'c62828',
                '900': 'b71c1c',
                'A100': 'ff8a80',
                'A200': 'ff5252',
                'A400': 'ff1744',
                'A700': 'd50000',
                'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                                    // on this palette should be dark or light
                'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                    '200', '300', '400', 'A100'],
                'contrastLightColors': undefined    // could also specify this if default was 'dark'
            });
            $mdThemingProvider.theme('default')
                .accentPalette('green', {
                    'default': '500',
                    'hue-1': '300'
                });

        }

    ])
    .run(['$rootScope', '$state', 'Principal', 'Auth', '$mdDialog',
        function ($rootScope, $state, Principal, Auth, $mdDialog) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams, fromState, fromParams) {
                // 页面切换时，隐藏mdDialog
                $mdDialog.cancel();

                $rootScope.toState = toState;
                $rootScope.toStateParams = toStateParams;
                if ($rootScope.webSocketConnection){
                    $rootScope.webSocketConnection.close();
                }
                if (Principal.isIdentityResolved()) {
                    Auth.authorize();
                }
                //跳过的state数组
                var exclude = ['site.app.home', 'site.home.aboutus', 'site.home.download', 'site.home.price', 'site.home.solution', 'site.home.product'];

                if (exclude.indexOf(toState.name) > -1)
                    $state.go('site.login');
            });
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                if (toState.name !== 'login' && $rootScope.previousStateName) {
                    $rootScope.previousStateName = fromState.name;
                    $rootScope.previousStateParams = fromParams;
                }
                if (toState.pageClass) {
                    $rootScope.pageClass = toState.pageClass;
                }
                if (toState.pageTitle) {
                    $rootScope.pageTitle = toState.pageTitle;
                }
            });
            $rootScope.back = function () {
                // If previous state is 'activate' or do not exist go to 'home'
                if ($rootScope.previousStateName === 'login' ||
                    $state.get($rootScope.previousStateName) === null) {

                } else {
                    $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
                }
            };
        }])
    .controller('com.deepblue.web.SideNavController', [
        '$scope',
        'mdSideMenu',
        function ($scope, mdSideMenu) {
            $scope.menu = mdSideMenu;
        }
    ])
    .constant('LANGUAGES', ['zh_cn', 'en'])
    .constant('ServiceBaseURL', '');
    moment.locale('zh-cn');//momentjs 时间的语言
