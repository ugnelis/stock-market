'use strict';

angular.module('app.site')
    .controller('SiteStocksController', ['$scope', 'resolvedStocks', function ($scope, resolvedStocks) {
        this.stocks = resolvedStocks;
    }]);
