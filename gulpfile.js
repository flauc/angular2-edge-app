
var gulp = require('gulp'),
    inject = require('gulp-inject'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    ts = require('gulp-typescript'),
    del = require('del'),
    tsServer = ts.createProject('tsconfig.json'),
    tsPublic = ts.createProject('public/tsconfig.json'),


    config = {

        public: './public',

        // VendorJs
        vendorJsToMove: [
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/es6-shim/es6-shim.map',
            'node_modules/reflect-metadata/Reflect.js',
            'node_modules/reflect-metadata/Reflect.js.map',
            'node_modules/zone.js/dist/zone.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/socket.io-client/socket.io.js',
            'node_modules/lodash/lodash.min.js'
        ],

        vendorJsFolders: {
            'rxjs': 'node_modules/rxjs/**/**',
            'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api/**/**',
            'angular': 'node_modules/@angular/**/**'
        },

        vendorJs: [
            './public/assets/vendorJs/es6-shim.min.js',
            './public/assets/vendorJs/Reflect.js',
            './public/assets/vendorJs/zone.js',
            './public/assets/vendorJs/system.src.js',
            './public/assets/vendorJs/socket.io.js',
            './public/assets/vendorJs/lodash.min.js'
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

gulp.task('vendorJs-folders', () => {
    gulp.src(config.vendorJsFolders.angular)
        .pipe(gulp.dest(config.vendorJsFolder + '/@angular'));

    gulp.src(config.vendorJsFolders.rxjs)
        .pipe(gulp.dest(config.vendorJsFolder + '/rxjs'));

    gulp.src(config.vendorJsFolders['angular2-in-memory-web-api'])
        .pipe(gulp.dest(config.vendorJsFolder + '/angular2-in-memory-web-api'));
});

gulp.task('inject-development', ['move-vendorJs'], () => {
    var target = gulp.src(config.public + '/index.html');
    var vendorStream = gulp.src(config.vendorJs, {read: false});

    return target
        .pipe(inject(vendorStream, {relative: true}))
        .pipe(gulp.dest(config.public));
});

gulp.task('tsServer', () => {
    var tsResult = tsServer.src()
        .pipe(ts(tsServer));

    return tsResult.js.pipe(gulp.dest('./'));
});

gulp.task('tsPublic', () => {
    var tsResult = tsPublic.src()
        .pipe(ts(tsPublic));

    return tsResult.js.pipe(gulp.dest('./public/app/'));
});

gulp.task('stylus',() => {
    gulp.src(config.stylusMain)
        .pipe(stylus())
        .pipe(autoprefixer({browsers: ['last 2 version']}))
        .pipe(gulp.dest(config.public));
});

// Clean tasks
gulp.task('clean-vendorJs', function () {
    return del(config.vendorJsFolder);
});

gulp.task('build-dev', ['stylus', 'vendorJs-folders', 'inject-development', 'tsServer', 'tsPublic']);

// Watch Task
gulp.task('watch', function() {
    gulp.watch(config.stylus, ['stylus']);
});