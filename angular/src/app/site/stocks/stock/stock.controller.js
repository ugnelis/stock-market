'use strict';

angular.module('app.site')
    .controller('SiteStockController', ['$scope', '$state', '$interval', '$filter', 'resolvedStock', 'resolvedHistory', 'resolvedTransactions', 'stocks', 'orders', 'notifications',
        function ($scope, $state, $interval, $filter, resolvedStock, resolvedHistory, resolvedTransactions, stocks, orders, notifications) {
            var self = this;

            // resolved data
            this.symbol = resolvedStock.symbol;
            this.heading = resolvedStock.name + " (" + resolvedStock.symbol.toUpperCase() + ")";
            this.currentChange = $filter('number')(resolvedStock.price - resolvedStock.close, 2);
            this.currentChangeInPercent = $filter('number')((resolvedStock.price / resolvedStock.close - 1) * 100, 2) + '%';
            this.price = $filter('currency')(resolvedStock.price, '$', 2);
            this.high = resolvedStock.high;
            this.low = resolvedStock.low;
            this.close = resolvedStock.close;
            this.open = resolvedStock.open;
            this.volume = $filter('number')(resolvedStock.volume);

            this.transactions = resolvedTransactions;
            for (var i = 0; i < this.transactions.length; i++) {
                this.transactions[i].worth = this.transactions[i].quantity * this.transactions[i].price;
            }

            // update
            this.timer = $interval(function () {
                stocks.getStock(resolvedStock.symbol)
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
                orders.openForm(side, symbol, "MARKET");
            };

            // submit stock price notification
            this.submitNotification = function () {
                this.notification.symbol = this.symbol;
                notifications.submit(this.notification);
            };

            // line chart
            this.labels = resolvedHistory.map(function (a) {
                return a.Date;
            }).reverse();
            this.series = ['Open', 'Close'];
            this.data = [resolvedHistory.map(function (a) {
                return a.Open;
            }).reverse(), resolvedHistory.map(function (a) {
                return a.Close;
            }).reverse()];
        }]);
