'use strict';


angular.module('app.site')
    .controller('SiteAboutController', ['$scope', 'AboutData', function ($scope, AboutData) {
        this.title = AboutData.title;
        this.content = AboutData.content;
    }]);
