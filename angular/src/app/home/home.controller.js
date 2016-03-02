'use strict';

angular.module('app')
    .controller('HomeController', ['$scope', 'HomeData', function ($scope, HomeData) {
        this.title = HomeData.title;
        this.content = HomeData.content;
    }]);
