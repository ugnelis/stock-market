"use strict";

angular.module('app')
    .directive('alertbox', function () {
        return {
            restrict: 'A',
            scope: {},
            controller: 'AlertController as alertbox',
            templateUrl: 'app/common/alert/alert.html'
        };
    });
