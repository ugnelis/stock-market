'use strict';

angular.module('app.admin')
    .controller('AdminNavbarController', ['$scope', '$state', 'principal', function ($scope, $state, principal) {
        this.principal = principal;

        this.signout = function () {
            principal.authenticate(null);
            $state.go('login');
        };
    }]);
