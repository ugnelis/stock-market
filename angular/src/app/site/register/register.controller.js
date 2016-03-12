'use strict';

angular.module('app.site')
    .controller('SiteRegisterController', ['$scope', 'auth',
        function ($scope, auth) {
            this.registerAction = function () {
                auth.register(this.user);
            };
        }]);
