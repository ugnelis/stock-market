"use strict";

angular.module('app')
    .constant('SERVER', '//localhost:10000')
    .constant('APP_ROLES', {
        USER: "user",
        MODERATOR: "moderator",
        OWNER: "owner"
    })
;