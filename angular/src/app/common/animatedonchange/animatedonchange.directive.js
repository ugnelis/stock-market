"use strict";

angular.module('app')
    .directive('animateOnChange', function ($timeout) {
        return function (scope, element, attr) {
            scope.$watch(attr.animateOnChange, function (nv, ov) {
                if (nv != ov) {
                    element.addClass('changed');
                    $timeout(function () {
                        element.removeClass('changed');
                    }, 100);
                }
            });
        };
    });