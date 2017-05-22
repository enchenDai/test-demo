'use strict';
angular.module('DeepBlueAdminWebApp')
    .factory('Account', function Account($resource,ServiceBaseURL) {
        return $resource('/api/account', {}, {
            'get': { method: 'GET', params: {}, isArray: false,
                interceptor: {
                    response: function(response) {
                        // expose response
                        return response;
                    }
                }
            }
        });
    })
    .factory('AccountInfo', function ($q, Account) {
        return {
            getAccount: function () {
                var defer = $q.defer();
                Account.get(function(data){
                    defer.resolve(data);
                },function(data){
                    defer.reject(data);
                });
                return defer.promise
            }
        }
    })
;
