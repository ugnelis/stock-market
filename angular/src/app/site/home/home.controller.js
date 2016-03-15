'use strict';

angular.module('app.site')
    .controller('SiteHomeController', ['$scope', 'pages', function ($scope, pages) {
        var self = this;

        pages.getPage('home')
            .then(function (data) {
                self.heading = data.heading;
                self.content = data.content;
            });
    }]);
