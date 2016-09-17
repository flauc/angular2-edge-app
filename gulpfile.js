var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync').create(),
    series = require('stream-series'),
    inject = require('gulp-inject'),
    ts = require('gulp-typescript'),

    config = {
        // Sass
        stylus: './public/assets/style/**/*.styl',
        stylusMain: './public/assets/style/style.styl',

        clientDir: 'public/',
        index: 'public/index.html',

        // Vendor
        vendor: {
            js: [
                'node_modules/core-js/client/shim.min.js',
                'node_modules/zone.js/dist/zone.js',
                'node_modules/reflect-metadata/Reflect.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/socket.io-client/socket.io.js'
            ],

            css: [
                'public/assets/css/main.css'
            ]
        },

        system: {
            config: 'public/system.config.js',
            run: 'public/system.js'
        },

        tsFiles: 'public/app/**/**.js',
        tsConfig: 'public/tsconfig.json',
        serverTsConfig: 'server/tsconfig.json',
        buildDir: 'public/build/',
        browserSyncTarger: 'http://localhost:2000'

    },

    // TS Setup,
    tsServer = ts.createProject(config.serverTsConfig),
    tsClient = ts.createProject(config.tsConfig);

// Stylus Task
gulp.task('stylus',() => {
    gulp.src(config.stylusMain)
        .pipe(stylus())
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(gulp.dest(config.clientDir))
        .pipe(browserSync.stream());
});

// TS Tasks
gulp.task('tsServer', () => {
    var tsResult = tsServer.src().pipe(ts(tsServer));
    return tsResult.js.pipe(gulp.dest('./'));
});

gulp.task('tsClient', () => {
    var tsResult = tsClient.src().pipe(ts(tsClient));
    return tsResult.js.pipe(gulp.dest('./public/app/'));
});

// Development Build
gulp.task('dev-build', ['stylus', 'tsClient', 'tsServer'], () => {

    var js = config.vendor.js;

    js.push(config.system.config);
    js.push(config.system.run);

    var target = gulp.src(config.index),
        cssStream = gulp.src(config.vendor.css, {read: false}),
        vendorStream = gulp.src(js, {read: false});

    return target
        .pipe(inject(series(vendorStream, cssStream), {addRootSlash: false, relative: true}))
        .pipe(gulp.dest(config.clientDir));
});

// Static Server + watching scss/html files
gulp.task('serve', () => {

    browserSync.init({
        proxy: {
            target: config.browserSyncTarger,
            ws: true
        }
    });

    gulp.watch(config.stylus, ['stylus']);
    // Watches for template changes
    gulp.watch(config.clientDir + 'app/**/**.ts', ['tsClient']);
    gulp.watch(config.clientDir + 'app/**/**.js').on('change', browserSync.reload);
    gulp.watch(config.clientDir + "app/**/**.html").on('change', browserSync.reload);
});