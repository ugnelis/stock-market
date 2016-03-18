'use strict';

angular.module('app.site')
    .controller('SiteStocksController', ['$scope', 'data', function ($scope, data) {
        this.stocks = data;
    }]);
