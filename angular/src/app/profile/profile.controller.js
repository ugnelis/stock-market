'use strict';

angular.module('app')
    .controller('ProfileController', ['$scope', '$http', 'SERVER', function ($scope, $http, SERVER) {
        var self = this;

        $http.get(SERVER + '/profile')
            .then(function(response) {
                self.email = response.data.email;
                self.username = response.data.username;
            });

    }]);
