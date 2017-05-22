'use strict';

angular.module('DeepBlueAdminWebApp')
    .factory('authInterceptor', function ($rootScope, $q, $location, localStorageService) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                var token = localStorageService.get('token');

                if (token && token.expires_at && token.expires_at > new Date().getTime()) {
                    config.headers.Authorization = 'Bearer ' + token.access_token;
                }

                return config;
            }
        };

    })
    .factory('authExpiredInterceptor', function ($rootScope, $q, $injector, localStorageService, $location, $filter) {
        return {
            responseError: function (response) {

                // token has expired
                if (response.status === 401 && (response.data.error == 'invalid_token' || response.data.error == 'Unauthorized')) {

                    var token = localStorageService.get('token');
                    if (!token) {
                        var Principal = $injector.get('Principal');
                        if (Principal.isAuthenticated()) {
                            $injector.get('Auth').authorize(true);
                        }
                    } else {
                        var deferred = $q.defer();
                        var AuthServerProvider = $injector.get('AuthServerProvider');
                        AuthServerProvider.refreshToken(token).then(function (data) {
                            localStorageService.remove('token');
                            var expiredAt = new Date();
                            expiredAt.setSeconds(expiredAt.getSeconds() + data.data.expires_in);
                            data.data.expires_at = expiredAt.getTime();
                            localStorageService.set('token', data.data);
                            $injector.get('$http')(response.config).then(function (response) {
                                deferred.resolve(response);
                            }, function (response) {
                                deferred.reject(response);
                            });

                        });
                        return deferred.promise;

                    }
                } else if (response.status == 400
                    && response.data.error == 'invalid_grant'
                    && response.data.error_description.indexOf('Invalid refresh token') !== -1) {
                    localStorageService.remove('token');
                    $location.path("/login");
                }else if(response.config.url.indexOf('http://') === 0 && response.config.url.indexOf('login') === -1 && response.config.url.indexOf('token') === -1){

                }
                return $q.reject(response);

            },
            response:function(response){
                return response;
            }
        };
    });
