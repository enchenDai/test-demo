'use strict';
angular.module('DeepBlueAdminWebApp')
    .factory('Principal',['$q','Account',function Principal ($q,Account){
        var _identity,
            _authenticated = false;

        return {
            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            isAdminUser: function () {
                return this.hasAnyAuthority(['ROLE_COMPANY_FINANCE_ADMIN', 'ROLE_COMPANY_ADMIN']);

            },
            isAdmin: function () {
                return this.hasAnyAuthority(['ROLE_COMPANY_ADMIN']);
            },
            hasAuthority: function (authority) {
                if (!_authenticated) {
                    return $q.when(false);
                }

                return this.identity().then(function(_id) {
                    return _id.authorities && _id.authorities.indexOf(authority) !== -1;
                }, function(err){
                    return false;
                });
            },
            hasAnyAuthority: function (authorities) {
                if (!_authenticated || !_identity || !_identity.authorities) {
                    return false;
                }

                for (var i = 0; i < authorities.length; i++) {
                    if (_identity.authorities.indexOf(authorities[i]) !== -1) {
                        return true;
                    }
                }

                return false;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity !== null;
            },
            getAuthorities: function () {
                if (!_authenticated) {
                    return null;
                } else {
                    return _identity.authorities;
                }
            },
            addAuthorities: function (authority) {
                if (_identity) {
                    _identity.authorities.push(authority);
                }
            },
            removeAuthorities: function (authority) {
                if (_identity) {
                    var index = _identity.authorities.indexOf(authority);
                    if (index !== -1) {
                        _identity.authorities.splice(index, 1);
                    }
                }
            },

            identity: function (force) {
                var deferred = $q.defer();
                if (force === true) {
                    _identity = undefined;
                }
                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);
                    return deferred.promise;
                }

                Account.get().$promise
                    .then(function (account) {
                        _identity = account.data;
                        _authenticated = true;
                        deferred.resolve(_identity);
                    })
                    .catch(function() {
                        _identity = null;
                        _authenticated = false;
                        deferred.resolve(_identity);
                    });
                return deferred.promise;
            }
        };
    }]);
