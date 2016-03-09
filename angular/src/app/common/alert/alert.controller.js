"use strict";

angular.module('app')
    .controller('AlertController', ['$scope', 'alert',
        function ($scope, alert) {
            this.alerts = alert.getAlerts();

            this.close = function (index) {
                alert.close(index);
            };
        }]);
