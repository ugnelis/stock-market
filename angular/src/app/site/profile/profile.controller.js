'use strict';

angular.module('app.site')
    .controller('SiteProfileController', ['$scope', '$interval', '$filter', 'profile', 'inventory', 'stocks', 'stock',
        function ($scope, $interval, $filter, profile, inventory, stocks, stock) {
            var self = this;

            this.profile = profile;
            this.inventory = inventory;

            this.stocks = stocks;
            for (var i = 0; i < this.stocks.length; i++) {
                this.stocks[i].quantity = inventory[i].quantity;
                this.stocks[i].worth = inventory[i].quantity * this.stocks[i].price;

                this.stocks[i].price = $filter('currency')(this.stocks[i].price, '$', 2);
                this.stocks[i].worth = $filter('currency')(this.stocks[i].worth, '$', 2);
            }

            // update
            this.timer = $interval(function () {

                self.stocks.forEach(function (entry) {
                    stock.getStock(entry.symbol)
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
