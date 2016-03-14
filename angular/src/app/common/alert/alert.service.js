"use strict";

angular.module('app')
    .factory('alert', ['$rootScope',
        function ($rootScope) {
            var alerts = [];
            var alert = {
                add: function (type, message) {
                    if (type != "success" && type != "info" && type != "warning" && type != "danger")
                        type = "info";

                    if (Array.isArray(message))
                        message.forEach(function (entry) {
                            alerts.push({type: type, msg: entry});
                        });
                    else
                        alerts.push({type: type, msg: message});
                },
                close: function (index) {
                    alerts.splice(index, 1);
                },
                getAlerts: function () {
                    return alerts;
                },
                clear: function () {
                    alerts = [];
                }
            };
            return alert;
        }
    ]);
