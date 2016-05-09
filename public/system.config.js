(function(global) {

    var map = {
        'app': 'app',
        'rxjs': 'assets/vendorJs/rxjs',
        'lodash': 'assets/vendorJs/lodash.min.js',                     
        'angular2-in-memory-web-api': 'assets/vendorJs/angular2-in-memory-web-api',
        '@angular': 'assets/vendorJs/@angular'
    },

    packages = {
        'app': { main: 'boot.js',  defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' },
        'angular2-in-memory-web-api': { defaultExtension: 'js' }
    },

    packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ];


    packageNames.forEach(function(pkgName) {
        packages[pkgName] = { main: 'index.js', defaultExtension: 'js' };
    });

    var config = {
        map: map,
        packages: packages
    };

    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);

})(this);