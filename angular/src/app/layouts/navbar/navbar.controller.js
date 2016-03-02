'use strict';

angular.module('app')
    .controller('NavbarController', ['$scope', '$state', 'principal', function ($scope, $state, principal) {
        this.principal = principal;

        this.signout = function () {
            principal.authenticate(null);
            $state.go('login');
        };
    }]);
