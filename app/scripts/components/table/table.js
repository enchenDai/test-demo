'use strict';

angular.module('DeepBlueAdminWebApp.mdTable', [])
        .directive('mdTable', function () {
    return {
        restrict: 'E',
        scope: {
            headers: '=',
            content: '=',
            pagesCount: '=',
            sortable: '=',
            filters: '=',
            customClass: '=customClass',
            count: '=',
            rowClick: '&',
            selectedItem: '='
        },
        controller: function ($scope, $state, $filter, $window) {
            var orderBy = $filter('orderBy');
            var FOOTER_PAGE_MAX = 5;
            function updateFooterIndices() {
                var pageCount = $scope.nbOfPages();
                if (pageCount === 0) {
                    $scope.hasFooterPrefixEllipsis = false;
                    $scope.hasFooterPostfixEllipsis = false;
                    $scope.footerIndices = [];
                    return;
                }
                var page = $scope.tablePage;

                var FOOTER_PAGE_HALF = Math.floor(FOOTER_PAGE_MAX / 2);

                $scope.hasFooterPrefixEllipsis = page > FOOTER_PAGE_HALF && pageCount > FOOTER_PAGE_MAX;
                $scope.hasFooterPostfixEllipsis = page <= pageCount - FOOTER_PAGE_HALF && pageCount > FOOTER_PAGE_MAX;
                var from = Math.max(0, page - FOOTER_PAGE_HALF);
                var to = from + FOOTER_PAGE_MAX - 1;

                if (to >= pageCount) {
                    to = pageCount - 1;
                    from = Math.max(0, to - FOOTER_PAGE_MAX + 1);
                }

                $scope.footerIndices = Array.apply(null, Array(to - from + 1)).map(function (_, i) { return i + from; });
            }


            $scope.tablePage = 0;
            $scope.hasFooterPrefixEllipsis = false;
            $scope.hasFooterPostfixEllipsis = false;
            $scope.footerIndices = [];

            $scope.nbOfPages = function () {
                if (!$scope.content)
                    return 0;

                if ($scope.count <= 0)
                    return 1;

                return Math.ceil($scope.content.length / $scope.count);
            };

            $scope.handleSort = function (field) {
                if ($scope.sortable.indexOf(field) > -1) {
                    return true;
                } else {
                    return false;
                }
            };
            $scope.order = function (predicate, reverse) {
                $scope.content = orderBy($scope.content, predicate, reverse);
                $scope.predicate = predicate;
            };
            //$scope.order($scope.sortable[0], false);
            $scope.getNumber = function (num) {
                if (num === 0) return null;
                return new Array(num);
            };
            $scope.goToPage = function (page) {
                $scope.tablePage = page;
                updateFooterIndices();
            };
            $scope.getCurrentContent = function () {
                if (!$scope.content)
                    return undefined;
                var itemCount = $scope.count < 0 ? $scope.content.length : $scope.count;
                var result = $scope.content.slice($scope.tablePage * itemCount, ($scope.tablePage + 1) * itemCount);
                while (result.length < itemCount) {
                    result.push("empty");
                }
                return result;
            };
            $scope.show = function (head, c) {
                try {
                    if (head.show != null)
                        return head.show(c);
                }
                catch (e) {

                }
                return c;
            },
            $scope.applyEvent = function ($event, action, content) {
                $event.stopPropagation();
                action(content);
            }

            updateFooterIndices();

            $scope.$watch(function(scope) { return scope.content; }, updateFooterIndices);
        },

        templateUrl: 'scripts/components/table/table.tpl.html'
    }
}).filter('startFrom', function () {
    return function (input, start) {
        if (!input || !input.length) { return; }
        start = +start;
        return input.slice(start);
    }
})
.directive('mdTableX', function () {
    return {
        restrict: 'E',
        scope: {
            tableDataSource: '=',
            customClass: '=customClass',
            rowClick: '&',
            checkboxClick: '&',
            exists: '&',
            tablePage: '=',
            selectCurrentPage: '&',
            columnClick: '&'
        },
        controller: function ($scope, $state, $filter, $window) {
            var orderBy = $filter('orderBy');
            var FOOTER_PAGE_MAX = 5;

            function updateFooterIndices() {
                var pageCount = $scope.tableDataSource.pagesCount;
                if(pageCount === 0)
                {
                    $scope.hasFooterPrefixEllipsis = false;
                    $scope.hasFooterPostfixEllipsis = false;
                    $scope.footerIndices = [];
                    return;
                }
                var page = $scope.tablePage;

                var FOOTER_PAGE_HALF = Math.floor(FOOTER_PAGE_MAX / 2);

                $scope.hasFooterPrefixEllipsis = page > FOOTER_PAGE_HALF && pageCount > FOOTER_PAGE_MAX;
                $scope.hasFooterPostfixEllipsis = page <= pageCount - FOOTER_PAGE_HALF && pageCount > FOOTER_PAGE_MAX;
                var from = Math.max(0, page - FOOTER_PAGE_HALF);
                var to = from + FOOTER_PAGE_MAX - 1;

                if (to >= pageCount) {
                    to = pageCount - 1;
                    from = Math.max(0, to - FOOTER_PAGE_MAX + 1);
                }

                $scope.footerIndices = Array.apply(null, Array(to - from + 1)).map(function (_, i) { return i + from; });
            }

            $scope.tablePage = 0;
            $scope.hasFooterPrefixEllipsis = false;
            $scope.hasFooterPostfixEllipsis = false;
            $scope.footerIndices = [];
            $scope.selectAll = $scope.tableDataSource.currentPageSelected;
            $scope.headers = $scope.tableDataSource.headers;
            $scope.tableDataSource.onUpdated = function () {
                $scope.goToPage(0);
            }

            $scope.nbOfPages = function () {
                return $scope.tableDataSource.pagesCount;
            };

            $scope.getNumber = function (num) {
                if (num === 0) return null;
                return new Array(num);
            };

            $scope.tableDataSource.pagesChanged = function(page) {
                $scope.tablePage = page;
                updateFooterIndices();
            }

            $scope.goToPage = function (page) {
                $scope.tableDataSource.goToPage(page);
                $scope.tablePage = page;
            };
            $scope.getCurrentContent = function () {
                if (!$scope.tableDataSource.content)
                    return undefined;
                var itemCount = $scope.tableDataSource.count;
                var result = $scope.tableDataSource.content;
                while (result.length < itemCount) {
                    result.push("empty");
                }
                return result;
            };
            $scope.show = function(head,c)
            {
                try {
                    if (head.show != null)
                        return head.show(c);
                }
                catch(e) {
                    return '';
                }
               return c;
            }
            $scope.applyEvent = function ($event, action, content){
                $event.stopPropagation();
                action(content, $event);
            }

            updateFooterIndices();
        },
        templateUrl: 'scripts/components/table/table.tpl.html'
    }
});
