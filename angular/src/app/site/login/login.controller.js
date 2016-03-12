'use strict';

angular.module('app.site')
    .controller('SiteLoginController', ['$scope', 'auth',
        function ($scope, auth) {
            this.loginAction = function () {
                auth.login(this.user);
            };
        }]);
