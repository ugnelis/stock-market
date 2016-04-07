'use strict';

angular.module('app.site')
    .controller('SiteNavbarController', ['$scope', '$state', 'principal', function ($scope, $state, principal) {
        this.principal = principal;

        this.signout = function () {
            principal.authenticate(null);
            $state.go('site.login');
        };
    }]);
