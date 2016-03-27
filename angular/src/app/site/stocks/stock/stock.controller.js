'use strict';

angular.module('app.site')
    .controller('SiteStockController', ['$scope', '$state', '$interval', '$filter', 'data', 'history', 'stock',
        function ($scope, $state, $interval, $filter, data, history, stock) {
            var self = this;

            // resolved data
            this.heading = data.name + " (" + data.symbol.toUpperCase() + ")";
            this.currentChange = $filter('number')(data.price - data.close, 2);
            this.currentChangeInPercent = $filter('number')((data.price / data.close - 1) * 100, 2) + '%';
            this.price = $filter('currency')(data.price, '$', 2);
            this.high = data.high;
            this.low = data.low;
            this.close = data.close;
            this.open = data.open;
            this.volume = $filter('number')(data.volume);

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
        }])
    .directive('animateOnChange', function ($timeout) {
        return function (scope, element, attr) {
            scope.$watch(attr.animateOnChange, function (nv, ov) {
                if (nv != ov) {
                    element.addClass('changed');
                    $timeout(function () {
                        element.removeClass('changed');
                    }, 100);
                }
            });
        };
    });
