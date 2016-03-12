'use strict';

angular.module('app.site')
    .controller('SiteProfileController', ['$scope', '$http', 'API', function ($scope, $http, API) {
        var self = this;

        $http.get(API.PROFILE)
            .then(function (response) {
                self.name = response.data.name;
                self.email = response.data.email;
            });

    }]);
