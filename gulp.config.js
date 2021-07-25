module.exports = function () {
    var config = {
        packages: [
            "./node_modules/angular/angular.js",
            "./node_modules/angular-route/angular-route.js",
            "./node_modules/jquery/dist/jquery.js",
            "./node_modules/bootstrap/dist/js/bootstrap.js"
        ],

        styles: [
            "./node_modules/bootstrap/dist/css/bootstrap.css"
        ],

        app: [
            "./src/**/*.js"
        ],

        html: [
            './src/**/*.html'
        ],

        defaultPort: 4200,
        nodeServer: './server.js',
        server: './server.js',
        browserReloadDelay: 1000
    };

    return config;
};