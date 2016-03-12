'use strict';

angular.module('app', [
        'ngAnimate',
        'ngMessages',
        'ngSanitize',
        'ngResource',
        'angular-jwt',
        'angular-loading-bar',
        'angular-storage',
        'ui.bootstrap',
        'ui.router',
        'app.site'
    ])
    .run(
        ['$rootScope', '$state', '$stateParams', 'cfpLoadingBar', 'auth', 'principal', 'alert',
            function ($rootScope, $state, $stateParams, cfpLoadingBar, auth, principal, alert) {

                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;

                // On State Change
                $rootScope.$on('$stateChangeStart',
                    function (event, toState, toParams, fromState, fromParams) {
                        cfpLoadingBar.start();

                        $rootScope.toState = toState;
                        $rootScope.toStateParams = toParams;

                        if (principal.isIdentityResolved()) auth.authorize();

                        // Cleans alerts
                        alert.clear();
                    });

                $rootScope.$on('$stateChangeSuccess',
                    function (event, toState, toParams, fromState, fromParams) {
                        cfpLoadingBar.complete();
                    });

                $rootScope.$on('$stateChangePermissionDenied',
                    function (event, toState, toParams, options) {
                        $state.go('home', null, {reload: true});
                    });
            }]
    )
    .config(
        ['$httpProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', 'jwtInterceptorProvider',
            function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider, jwtInterceptorProvider) {

                // Enabling CORS
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];

                // JWT Token Handling
                jwtInterceptorProvider.authHeader = 'Authorization';
                jwtInterceptorProvider.authPrefix = 'Bearer ';
                jwtInterceptorProvider.tokenGetter = function (store) {
                    return store.get('stock_market.jwt');
                };
                $httpProvider.interceptors.push('jwtInterceptor');

                // Default URL
                $urlRouterProvider
                    .otherwise('/');
            }]
    );
