'use strict';
angular.module('DeepBlueAdminWebApp')
    .filter('dateTimeFilter', function($filter) {
        return function (oldDate) {
            if (oldDate) {
                var newDate = new Date(oldDate);
                return $filter('date')(newDate, "yyyy.MM.dd");
            }
        };
    })
    .filter('dateLineFilter', function($filter) {
        return function (oldDate) {
            if (oldDate) {
                var newDate = new Date(oldDate);
                return $filter('date')(newDate, "yyyy-MM-dd");
            }
        };
    })

    .filter('timeZoneDate', function($filter) {
        return function (date) {
            return $filter('date')(date, 'yyyy-MM-dd', 'CCT');
        };
    })

;
