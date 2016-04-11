"use strict";

angular.module('app')
    .controller('StocksTableController', ['$scope', 'stocks',
        function ($scope, stocks) {
            var self = this;

            self.loaded = false;

            stocks.getIndex()
                .then(function (data) {
                    self.stocks = data;
                    self.loaded = true;
                });
        }]);
