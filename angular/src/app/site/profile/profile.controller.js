'use strict';

angular.module('app.site')
    .controller('SiteProfileController', ['$scope', 'data', function ($scope, data) {
        this.name = data.name;
        this.email = data.email;
    }]);
