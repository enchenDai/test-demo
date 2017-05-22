'use strict';

angular.module('DeepBlueAdminWebApp')
    .factory('errorHandlerInterceptor', function ($q, $rootScope) {
        return {
            responseError: function (response) {
                if (response.status === 500){
	                //$rootScope.$emit('', response);
	            }
                return $q.reject(response);
            }
        };
    });
