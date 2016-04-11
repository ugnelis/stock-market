'use strict';

angular.module('app.site')
    .controller('SiteProfileController', ['$scope', '$interval', '$filter', 'resolvedIndex', 'resolvedInventory', 'resolvedAccount', 'resolvedOrders', 'resolvedStocks', 'orders', 'stocks',
        function ($scope, $interval, $filter, resolvedIndex, resolvedInventory, resolvedAccount, resolvedOrders, resolvedStocks, orders, stocks) {
            var self = this;

            this.profile = resolvedIndex;
            this.inventory = resolvedInventory;
            this.account = resolvedAccount;
            this.orders = resolvedOrders;
            this.account.balance = $filter('currency')(this.account.balance, '$', 2);

            for (var i = 0; i < this.orders.length; i++) {
                this.orders[i].price = $filter('currency')(this.orders[i].price, '$', 2);
            }

            // remove deleted order from array
            this.removeOrder = function (index) {
                orders.remove(index)
                    .then(function (data) {
                        self.orders = self.orders.filter(function (obj) {
                            return obj.id !== index;
                        });
                    });
            };

            // open oder form
            this.openOrderForm = function (side, symbol) {
                orders.openForm(side, symbol, "MARKET");
            };

            // format stock inventory
            if (!Array.isArray(resolvedStocks)) {
                this.stocks = [];
                this.stocks.push(resolvedStocks);
            } else {
                this.stocks = resolvedStocks;
            }

            for (var i = 0; i < this.inventory.length; i++) {
                this.stocks[i].quantity = this.inventory[i].quantity;
                this.stocks[i].worth = this.inventory[i].quantity * this.stocks[i].price;

                this.stocks[i].price = $filter('currency')(this.stocks[i].price, '$', 2);
                this.stocks[i].worth = $filter('currency')(this.stocks[i].worth, '$', 2);
            }

            // update
            this.timer = $interval(function () {
                self.stocks.forEach(function (entry) {
                    stocks.getStock(entry.symbol)
                        .then(function (data) {
                            entry.price = data.price;
                            entry.worth = entry.quantity * data.price;

                            entry.price = $filter('currency')(entry.price, '$', 2);
                            entry.worth = $filter('currency')(entry.worth, '$', 2);
                        });
                });
            }, 5000);

            $scope.$on("$destroy", function () {
                if (angular.isDefined(self.timer)) {
                    $interval.cancel(self.timer);
                }
            });
        }]);
