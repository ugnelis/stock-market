"use strict";

angular.module('app')
    .factory('alert', ['$rootScope',
        function ($rootScope) {
            var alerts = [];
            var alert = {
                add: function (type, message) {
                    if (type == "danger")
                        alerts.push({type: "danger", msg: message});
                    else if (type == "warning")
                        alerts.push({type: "warning", msg: message});
                },
                close: function (index) {
                    alerts.splice(index, 1);
                },
                getAlerts: function() {
                    return alerts;
                },
                clear: function() {
                    alerts = [];
                }
            };
            return alert;
        }
    ]);
