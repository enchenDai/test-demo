/**
 * Created by enchen on 5/21/17.
 */
'use strict';
angular.module('DeepBlueAdminWebApp')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('site.app.dashboard', {
            url: '/dashboard',
            views: {
                'content@site': {
                    templateUrl: 'scripts/app/dashboard/dashboard.tpl.html',
                    controller: 'com.deepblue.web.DashboardController'
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
    .controller('com.deepblue.web.DashboardController', ['$scope', '$state',
        function ($scope, $state) {
            $scope.test = 1;
        }]);