"use strict";

angular.module('app')
    .controller('OrderController', ['$scope', 'order', 'items', 'data',
        function ($scope, order, items, data) {
            this.items = items;

            this.symbols = data.map(function (a) {
                return a.symbol.toUpperCase();
            });

            this.submit = function () {
                order.submit(this.order);
            };

            this.sides = ['SELL', 'BUY'];
            this.orders = ['MARKET', 'LIMIT'];
        }]);
