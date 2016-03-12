"use strict";

angular.module('app')
    .controller('StocksTableController', ['$scope', 'stock',
        function ($scope, stock) {
            var self = this;

            self.loaded = false;

            stock.getIndex()
                .then(function (data) {
                    self.stocks = data;
                    self.loaded = true;
                });
        }]);
