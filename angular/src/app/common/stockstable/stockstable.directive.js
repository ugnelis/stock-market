"use strict";

angular.module('app')
    .directive('stockstable', function () {
        return {
            restrict: 'A',
            scope: {},
            controller: 'StocksTableController as stockstable',
            templateUrl: 'app/common/stockstable/stockstable.html'
        };
    });
