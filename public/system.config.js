(function(global) {

    var map = {
            'app': 'app',
            '@angular': 'node_modules/@angular',
            'rxjs': 'node_modules/rxjs',
            'socket.io': 'node_modules/socket.io-client/socket.io.js'
        },
        packages = {
            'app': { main: 'main.js',  defaultExtension: 'js' },
            'rxjs': { defaultExtension: 'js' }
        },
        ngPackageNames = [
            'common',
            'compiler',
            'core',
            'http',
            'platform-browser',
            'platform-browser-dynamic',
            'upgrade',
            'router',
            'forms'
        ];

    function packUmd(pkgName) {packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.min.js', defaultExtension: 'js' }}

    var setPackageConfig = packUmd;
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };

    System.config(config);

})(this);