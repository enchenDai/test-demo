(function(){
    'use strict';
    angular.module('DeepBlueAdminWebApp')
        .directive('pagination', function(){
            return {
                restrict: 'E',
                scope: {
                    totalRecordCount: '=',
                    pageSize: '=',
                    currentPage: '=',
                    onPaging: '='
                },
                templateUrl: 'scripts/components/directives/pagination.tpl.html',
                controller: 'com.deepblue.web.components.PaginationController'
            }
        })
        .controller('com.deepblue.web.components.PaginationController', ['$scope', function($scope) {

            $scope.maxShowPages = 5;
            $scope.footerIndices = [];
            $scope.goToPage = function(page) {
                $scope.onPaging(page);
            };
            $scope.totalPages = function() {
                return Math.ceil($scope.totalRecordCount / $scope.pageSize);
            };

            $scope.getShowPages = function() {
                var totalPages = $scope.totalPages();
                if (totalPages === 0) {
                    return [];
                }
                var halfPages = Math.floor($scope.maxShowPages / 2);
                var from = Math.max(0, $scope.currentPage - halfPages);
                var to = from + $scope.maxShowPages - 1;
                if (to >= totalPages) {
                    to = totalPages - 1;
                    from = Math.max (0, to - $scope.maxShowPages + 1);
                }
                //防止 to - from + 1 的值为负数报错,例如Array(-1),初始化失败,抛出异常
                if(to - from + 1 > 0){
                    return Array.apply(null, Array(to - from + 1)).map(function (_, i) { return i + from; });
                }else{
                    return Array.apply(null, Array(0)).map(function (_, i) { return i + from; });
                }
            }
        }])
})();
