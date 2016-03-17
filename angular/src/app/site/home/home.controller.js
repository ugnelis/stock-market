'use strict';

angular.module('app.site')
    .controller('SiteHomeController', ['$scope', 'data', 'principal', function ($scope, data, principal) {
        this.principal = principal;

        this.heading = data.heading;
        this.content = data.content;
    }]);
