"use strict";

angular.module('app')
    .factory('principal', ['$q', '$http', '$timeout', 'store', 'SERVER',
        function ($q, $http, $timeout, store, SERVER) {
            var _identity = undefined,
                _authenticated = false;

            var principal = {
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

                    if (identity) store.set('identity', angular.toJson(identity));
                    else {
                        store.remove('identity');
                        store.remove('jwt');
                    }
                },
                identity: function (force) {
                    var deferred = $q.defer();

                    if (force === true) _identity = undefined;

                    if (angular.isDefined(_identity)) {
                        deferred.resolve(_identity);

                        return deferred.promise;
                    }

                    $http.get(SERVER + '/profile', {ignoreErrors: true})
                        .success(function (data) {
                            _identity = data;
                            _authenticated = true;
                            // roles parser
                            _identity.roles = Object.keys(_identity.permissions).map(function (key) {
                                return _identity.permissions[key].name
                            });
                            deferred.resolve(_identity);
                            principal.authenticate(_identity);
                        })
                        .error(function () {
                            _identity = null;
                            _authenticated = false;
                            deferred.resolve(_identity);
                        });

                    $timeout(function () {
                        _identity = angular.fromJson(store.get('identity'));
                        principal.authenticate(_identity);
                        deferred.resolve(_identity);
                    }, 1000);

                    return deferred.promise;
                },
                login: function (credentials) {
                    return $http({
                        method: 'POST',
                        url: SERVER + '/login',
                        data: JSON.stringify(credentials),
                        ignoreErrors: true,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function (data) {
                            store.set('jwt', data.token);
                        })
                },
                register: function (credentials) {
                    return $http({
                        method: 'POST',
                        url: SERVER + '/register',
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
