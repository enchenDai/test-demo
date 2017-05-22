/**
 * Created by enchen on 5/21/17.
 */
'use strict';
angular.module('DeepBlueAdminWebApp')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.login', {
            url: '/login',
            views: {
                'main@': {
                    templateUrl: 'scripts/app/login/login.tpl.html',
                    controller: 'com.deepblue.web.LoginController'
                }
            },
            resolve: {
                mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
    }])
    .controller('com.deepblue.web.LoginController', ['$scope', '$state',
        function ($scope, $state) {
            $scope.login = function () {
                $state.go('site.app.dashboard');
            };
        }]);