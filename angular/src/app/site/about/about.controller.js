'use strict';

angular.module('app.site')
    .controller('SiteAboutController', ['$scope', 'pages', function ($scope, pages) {
        var self = this;

        pages.getPage('about')
            .then(function (data) {
                self.heading = data.heading;
                self.content = data.content;
            });
    }]);
