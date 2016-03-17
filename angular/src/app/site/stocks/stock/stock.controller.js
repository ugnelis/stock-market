'use strict';

angular.module('app.site')
    .controller('SiteStockController', ['$scope', 'data', 'history', function ($scope, data, history) {
        console.log(history);
        this.heading = data.name + " (" + data.symbol.toUpperCase() + ")";
        this.price = data.price;

        this.labels = history.map(function (a) {
            return a.Date;
        }).reverse();
        this.series = ['Open', 'Close'];
        this.data = [history.map(function (a) {
            return a.Open;
        }).reverse(), history.map(function (a) {
            return a.Close;
        }).reverse()];
    }]);
