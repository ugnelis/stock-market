'use strict';

angular.module('app.site')
    .controller('SiteHomeController', ['$scope', 'HomeData', function ($scope, HomeData) {
        this.title = HomeData.title;
        this.content = HomeData.content;
    }]);
