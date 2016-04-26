"use strict";

angular.module('app')
    .controller('OrdersController', ['$scope', 'orders', 'items', 'data',
        function ($scope, orders, items, data) {
            this.items = items;

            this.symbols = data.map(function (a) {
                return a.symbol.toUpperCase();
            });

            this.submit = function () {
                orders.submit(this.order);
            };

            this.sides = ['SELL', 'BUY'];
            this.orders = ['MARKET', 'LIMIT'];
        }]);
