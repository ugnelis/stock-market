'use strict';

angular.module('app.site')
    .controller('SiteProfileController', ['$scope', 'profile', 'inventory', 'stock', function ($scope, profile, inventory, stock) {
        this.profile = profile;
        this.inventory = inventory;

        this.stocks = stock;
        for (var i = 0; i < this.stocks.length; i++) {
            this.stocks[i].quantity = inventory[i].quantity;
            this.stocks[i].worth = inventory[i].quantity * this.stocks[i].price;
        }
    }]);
