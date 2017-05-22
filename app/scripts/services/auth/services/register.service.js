'use strict';

angular.module('DeepBlueAdminWebApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    })
    .factory('RegisterService', ['$http', function ($http) {
        return {
            register: function (user, register) {
                return $http.post('/api/companies/register/' + user.token + '/' + user.mobile, register);
            },
            //发送验证码
            sendToken: function (mobile, attachmentOID, verifyCode) {
                //return $http.get('/api/companies/register/token?mobile=' + mobile);
                return $http({
                    url: '/api/companies/register/token',
                    method: 'GET',
                    params: {
                        mobile: mobile,
                        attachmentOID: attachmentOID,
                        verifyCode: verifyCode
                    }
                });
            },
            //判断是否是已注册手机
            checkRegisterMobile: function (mobile) {
                return $http.get('/api/companies/register/check/mobile?mobile=' + mobile);
            },
            //判断验证码的正确性
            checkTokenAndMobile: function (user) {
                return $http.get('/api/companies/register/token/check?token=' + user.token + '&mobile=' + user.mobile);
            },
            getCaptcha: function (){
                return $http.get('/api/companies/register/verify/code');
            }
        }
    }]);


