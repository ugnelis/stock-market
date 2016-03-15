"use strict";

angular.module('app')
    .factory('principal', ['$q', '$http', '$timeout', 'store', 'API',
        function ($q, $http, $timeout, store, API) {
            var _identity = undefined,
                _authenticated = false;

            var principal = {
                getName: function () {
                    if (_authenticated)
                        return _identity.name;
                },
                isIdentityResolved: function () {
                    return angular.isDefined(_identity);
                },
                isAuthenticated: function () {
                    return _authenticated;
                },
                isInRole: function (role) {
                    if (!_authenticated || !_identity.roles) return false;

                    return _identity.roles.indexOf(role) != -1;
                },
                isInAnyRole: function (roles) {
                    if (!_authenticated || !_identity.roles) return false;

                    for (var i = 0; i < roles.length; i++) {
                        if (this.isInRole(roles[i])) return true;
                    }

                    return false;
                },
                authenticate: function (identity) {
                    _identity = identity;
                    _authenticated = identity != null;

                    if (identity) store.set('stock_market.identity', angular.toJson(identity));
                    else {
                        store.remove('stock_market.identity');
                        store.remove('stock_market.jwt');
                    }
                },
                identity: function (force) {
                    var deferred = $q.defer();

                    if (force === true) _identity = undefined;

                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);

                        return deferred.promise;
                    }

                    $http.get(API.PROFILE, {ignoreErrors: true})
                        .success(function (data) {
                            _identity = data;
                            _authenticated = true;
                            deferred.resolve(_identity);
                            principal.authenticate(_identity);
                        })
                        .error(function () {
                            _identity = null;
                            _authenticated = false;
                            deferred.resolve(_identity);
                        });

                    $timeout(function () {
                        _identity = angular.fromJson(store.get('stock_market.identity'));
                        principal.authenticate(_identity);
                        deferred.resolve(_identity);
                    }, 1000);

                    return deferred.promise;
                },
                login: function (credentials) {
                    return $http({
                        method: 'POST',
                        url: API.LOGIN,
                        data: JSON.stringify(credentials),
                        ignoreErrors: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function (data) {
                            store.set('stock_market.jwt', data.token);
                        })
                },
                register: function (credentials) {
                    return $http({
                        method: 'POST',
                        url: API.REGISTER,
                        data: JSON.stringify(credentials),
                        ignoreErrors: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                }
            };
            return principal;
        }
    ]);
