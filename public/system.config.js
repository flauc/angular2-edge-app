(function(global) {

    var map = {
            'app': 'app',
            'rxjs': '../node_modules/rxjs',
            'lodash': '../node_modules/lodash/lodash.min.js',
            '@angular': '../node_modules/@angular'
        },

        packages = {
            'app': {main: 'main.js', defaultExtension: 'js'},
            'rxjs': {defaultExtension: 'js' }
        },

        packageNames = [
            'common',
            'compiler',
            'core',
            'forms',
            'http',
            'platform-browser',
            'platform-browser-dynamic',
            'router',
            'upgrade',
        ];

    packageNames.forEach(function(pkgName) {
        packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' }
    });

    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);