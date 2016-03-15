'use strict';

angular.module('app.site')
    .controller('SiteHomeController', ['$scope', 'pages', 'principal', function ($scope, pages, principal) {
        var self = this;
        this.principal = principal;

        pages.getPage('home')
            .then(function (data) {
                self.heading = data.heading;
                self.content = data.content;
            });
    }]);
