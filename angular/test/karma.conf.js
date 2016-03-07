// Karma configuration

module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // list of files / patterns to load in the browser
        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-jwt/dist/angular-jwt.js',
            'bower_components/a0-angular-storage/dist/angular-storage.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/angular-loading-bar/build/loading-bar.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-scenario/angular-scenario.js',
            'src/app/app.js',
            'src/app/*.js',
            'src/app/**/*.js',
            'test/**/*.js'
        ]
    });
};
