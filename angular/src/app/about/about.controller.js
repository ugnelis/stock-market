'use strict';


angular.module('app')
    .controller('AboutController', ['$scope', 'AboutData', function ($scope, AboutData) {
        this.title = AboutData.title;
        this.content = AboutData.content;
    }]);
