"use strict";

angular.module('app')
    .factory('auth', ['$rootScope', '$state', 'principal', 'alert',
        function ($rootScope, $state, principal, alert) {
            var auth = {
                authorize: function () {
                    return principal.identity()
                        .then(function () {
                            var isAuthenticated = principal.isAuthenticated();

                            if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !principal.isInAnyRole($rootScope.toState.data.roles)) {
                                if (isAuthenticated) $state.go('home');
                                else {
                                    // user is not authenticated. stow the state they wanted before you
                                    // send them to the signin state, so you can return them when you're done
                                    $rootScope.returnToState = $rootScope.toState;
                                    $rootScope.returnToStateParams = $rootScope.toStateParams;

                                    // now, send them to the signin state so they can log in
                                    $state.go('login');
                                }
                            }
                        });
                },
                login: function (credentials) {
                    return principal.login(credentials)
                        .error(function (response) {
                            alert.add('danger', response.error);
                        })
                        .then(function () {
                            principal.identity(true);
                            $state.go('home');
                        });
                },
                register: function (credentials) {
                    return principal.register(credentials)
                        .error(function (response) {
                            alert.add('danger', response.error);
                        })
                        .then(function () {
                            principal.identity(true);
                            $state.go('home');
                        });
                }
            };
            return auth;
        }
    ]);
