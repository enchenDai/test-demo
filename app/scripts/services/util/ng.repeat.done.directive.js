'use strict';
angular.module('DeepBlueAdminWebApp')
    .directive('ngRepeatDone', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatDone' + (attr.ngRepeatDone ? '.' + attr.ngRepeatDone : ''));
                    });
                }
            }
        };
    }])
