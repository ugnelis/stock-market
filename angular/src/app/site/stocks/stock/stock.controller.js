'use strict';

angular.module('app.site')
    .controller('SiteStockController', ['$scope', '$state', '$interval', '$filter', 'data', 'history', 'transactions', 'stock', 'order',
        function ($scope, $state, $interval, $filter, data, history, transactions, stock, order) {
            var self = this;

            // resolved data
            this.symbol = data.symbol;
            this.heading = data.name + " (" + data.symbol.toUpperCase() + ")";
            this.currentChange = $filter('number')(data.price - data.close, 2);
            this.currentChangeInPercent = $filter('number')((data.price / data.close - 1) * 100, 2) + '%';
            this.price = $filter('currency')(data.price, '$', 2);
            this.high = data.high;
            this.low = data.low;
            this.close = data.close;
            this.open = data.open;
            this.volume = $filter('number')(data.volume);

            this.transactions = transactions;
            for (var i = 0; i < this.transactions.length; i++) {
                this.transactions[i].worth = this.transactions[i].quantity * this.transactions[i].price;
            }

            // update
            this.timer = $interval(function () {
                stock.getStock(data.symbol)
                    .then(function (data) {
                        self.price = $filter('currency')(data.price, '$', 2);
                        self.currentChange = $filter('number')(data.price - data.close, 2);
                        self.currentChangeInPercent = $filter('number')((data.price / data.close - 1) * 100, 2) + '%';
                    });
            }, 3000);

            $scope.$on("$destroy", function () {
                if (angular.isDefined(self.timer)) {
                    $interval.cancel(self.timer);
                }
            });

            // open oder form
            this.openOrderForm = function (side, symbol) {
                order.openForm(side, symbol, "MARKET");
            };

            // line chart
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
