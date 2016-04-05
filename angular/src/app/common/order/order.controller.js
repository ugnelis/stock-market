"use strict";

angular.module('app')
    .controller('OrderController', ['$scope', 'order', 'items', 'profile',
        function ($scope, order, items, profile) {
            var self = this;

            this.items = items;

            profile.getInventory()
                .then(function (data) {
                    self.symbols = data.map(function (a) {
                        return a.symbol.toUpperCase();
                    });
                });

            this.submit = function () {
                order.submit(this.order);
            };

            this.sides = ['SELL', 'BUY'];
            this.orders = ['MARKET', 'LIMIT'];
        }]);
