"use strict";

angular.module('app')
    .factory('notifications', ['$http', '$state', 'principal', 'alert', 'API',
        function ($http, $state, principal, alert, API) {
            var notifications = {
                submit: function (data) {
                    if (principal.isAuthenticated())
                        return $http({
                            method: 'POST',
                            url: API.NOTIFICATIONS,
                            data: JSON.stringify(data),
                            ignoreErrors: true,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .error(function (response) {
                                alert.add('danger', response.error);
                            })
                            .then(function (response) {
                                alert.add('success', response.data.success);
                            });
                    else {
                        $state.go('site.login');
                    }
                }
            };
            return notifications;
        }
    ]);
