'use strict';
angular.module('DeepBlueAdminWebApp')
    .filter("dateTimeFilter", function ($filter) {
        return function (oldDate) {
            var newDate = new Date(oldDate);
            return $filter('date')(newDate, 'yyyy-MM-dd HH:mm:ss');
        };
    })
    .filter("timeFilter", function ($filter) {
        return function (oldDate) {
            var newDate = new Date(oldDate);
            return $filter('date')(newDate, 'HH:mm:ss');
        };
    })
    .filter("dateChineseFilter", function ($filter) {
        return function (oldDate) {
            var newDate = new Date(oldDate);
            return $filter('date')(newDate, $filter('translate')('filter.yearMonth'));//yyyy年MM月
        };
    })
    .filter("dateChineseDateFilter", function ($filter) {
        return function (oldDate) {
            var newDate = new Date(oldDate);
            return $filter('date')(newDate, $filter('translate')('filter.yearMonthDay'));//yyyy年MM月dd日
        };
    })
    .filter('dateFilter', function($filter){
        return function (value) {
            if(value){
                var date = new Date(value);
                return $filter('date')(date, 'yyyy.MM.dd');
            }else{
                return '';
            }
        }
    })
    .filter('crossDateFilter', function($filter){
        return function (value) {
            if(value){
                var date = new Date(value);
                return $filter('date')(date, 'yyyy-MM-dd');
            }else{
                return '';
            }
        }
    });

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
