'use strict';

angular.module('app.admin', [
        'ngAnimate'
    ])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                redirectTo: 'admin.dashboard',
                //abstract: true,
                cache: false,
                data: {
                    roles: ['admin']
                },
                resolve: {
                    authorize: ['auth',
                        function (auth) {
                            return auth.authorize();
                        }
                    ]
                },
                views: {
                    "@": {
                        templateUrl: 'app/admin/admin.html'
                    },
                    'navbar@admin': {
                        templateUrl: 'app/admin/layouts/navbar/navbar.html',
                        controller: 'AdminNavbarController as navbar'
                    },
                    'footer@admin': {
                        templateUrl: 'app/admin/layouts/footer/footer.html',
                        controller: 'AdminFooterController as footer'
                    }
                }
            });
    }]);
