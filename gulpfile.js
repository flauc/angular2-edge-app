var gulp = require('gulp'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    tsc = require('gulp-tsc'),


    config = {

        public: './public',

        // VendorJs
        vendorJsToMove: [
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/es6-shim/es6-shim.map',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system-polyfills.js.map',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/angular2/bundles/http.dev.js',
            'node_modules/socket.io-client/socket.io.js',
            'node_modules/lodash/lodash.min.js'
        ],

        vendorJs: [
            './public/assets/vendorJs/es6-shim.min.js',
            './public/assets/vendorJs/system-polyfills.js',
            './public/assets/vendorJs/shims_for_IE.js',
            './public/assets/vendorJs/angular2-polyfills.js',
            './public/assets/vendorJs/system.src.js',
            './public/assets/vendorJs/Rx.js',
            './public/assets/vendorJs/angular2.dev.js',
            './public/assets/vendorJs/router.dev.js',
            './public/assets/vendorJs/http.dev.js',
            './public/assets/vendorJs/socket.io.js',
            './public/assets/vendorJs/lodash.min.js'
        ],

        tsServerFiles: [
          'typings/main.d.ts',
          'index.ts',
          'server/**/**.ts'
        ],


        vendorJsFolder: './public/assets/vendorJs',

        stylus: './public/assets/style/**/*.styl',
        stylusMain: './public/assets/style/style.styl'
    };

// Dev Tasks
gulp.task('move-vendorJs', () => {
    gulp.src(config.vendorJsToMove)
        .pipe(gulp.dest(config.vendorJsFolder))
});

gulp.task('inject-development', ['move-vendorJs'], () => {
    var target = gulp.src(config.public + '/index.html');
    var vendorStream = gulp.src(config.vendorJs, {read: false});

    return target
        .pipe(inject(vendorStream, {relative: true}))
        .pipe(gulp.dest(config.public));
});


gulp.task('tsServer', () => {
    gulp.src(config.tsServerFiles)
        .pipe(tsc({target: 'es6', module: "commonjs", sourceMap: true, emitDecoratorMetadata: true, experimentalDecorators: true, removeComments: true, noImplicitAny: false}))
        .pipe(gulp.dest('./'))
});

gulp.task('stylus',() => {
    gulp.src(config.stylusMain)
        .pipe(stylus())
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(gulp.dest(config.public));
});

gulp.task('build', ['stylus', 'inject-development']);

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.stylus, ['stylus']);
});