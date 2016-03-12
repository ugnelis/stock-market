"use strict";

angular.module('app')
    .directive('loadingspin', function () {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'app/common/loadingspin/loadingspin.html'
        };
    });
