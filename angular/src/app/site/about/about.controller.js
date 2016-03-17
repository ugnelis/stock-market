'use strict';

angular.module('app.site')
    .controller('SiteAboutController', ['$scope', 'data', function ($scope, data) {
        this.heading = data.heading;
        this.content = data.content;
    }]);
