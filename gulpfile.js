var config = require('./gulp.config')();
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();
var del = require('del');
var browserSync = require('browser-sync');
var port = process.env.PORT || config.defaultPort;

var tasks = {
    default: 'default',
    clean: 'clean', 
    css: 'css', 
    html:'html', 
    app: 'app', 
    npmPackages: 'npm-packages',
    devServer: 'dev-server'
};

function startBrowsersync() {
    console.log('browser sync');
    if (browserSync.active) {
        return;
    }
    
    var options = {
        proxy: 'localhost:3000',
        port: port,
        files: ["./src/**/*.js", "./src/**/*.html"],
        // synchronise more then 1 browsers
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true,
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 1000
    };

    browserSync(options);
}

gulp.task(tasks.css, function() {
    console.log('css...');
    return gulp.src(config.styles)
        .pipe($.sass())
        .pipe(gulp.dest('dist/css'));
});

gulp.task(tasks.html, function() {
    console.log('html...');
    return gulp.src(config.html)
        .pipe(gulp.dest('dist'));
});

gulp.task(tasks.app, function() {
    console.log('app...');
    return gulp.src(config.app)
        .pipe($.ngAnnotate())
        .pipe($.sourcemaps.init())
        .pipe($.concat('application.js'))
        .pipe($.terser())
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task(tasks.devServer, function() {
    var isDev = true;
    var nodemonOptions = {
        server: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE-ENV': isDev ? 'dev' : 'build'
        },
        watch: [
            "./src/**/*.js",
            "./src/**/*.html"
        ]
    };
    return $.nodemon(nodemonOptions)
            .on('restart', function(event) {
                console.log('*** gulp nodemon restarted');
                console.log('*** files changed on restart:\n' + event);
                setTimeout(function(){
                    browserSync.notify('reloading now ...');
                    browserSync.reload({stream: false});
                }, config.browserReloadDelay);
                startBrowsersync();
            })
            .on('start', function() {
                console.log('*** gulp nodemon started');
                startBrowsersync();
            })
            .on('crash', function() {
                console.log('*** gulp nodemon crashed');
            })
            .on('exit', function() {
                console.log('*** gulp nodemon exited cleanly');
            });
});

gulp.task(tasks.npmPackages, function() {
    console.log('npm packages...');
    return gulp.src(config.packages)
        .pipe(gulp.dest('dist/vendors'));
});

gulp.task(tasks.clean, function(done) {
    console.log('Deleting...');
    return del('dist', done);
});

gulp.task(tasks.default, gulp.series(tasks.clean, 
    tasks.css, 
    tasks.html, 
    tasks.app, 
    tasks.npmPackages, 
    function() { 
        gulp.watch(['./src/**/*.css'], gulp.series([tasks.css]));
        gulp.watch(['./src/**/*.html'], gulp.series([tasks.html]));
        gulp.watch(['./src/**/*.js'], gulp.series([tasks.app]));
        console.log('Watching!');
    }
));
