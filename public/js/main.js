require.config({
    baseUrl: 'public/js/',
    paths: {
        Howler:        '../lib/howler.min',
        Sylvester:     '../lib/sylvester',
        image:         '../lib/image' //alias to plugin
        // jquery:     'components/jquery/jquery',
        // domready:   'components/requirejs-domready/domReady',
        // handlebars: 'components/handlebars/handlebars'
    },
    shim: {
        // handlebars: {
        //     exports: 'Handlebars'
        // },
        // 'jquery.pluginA.js': ['jquery'],
        // 'jquery.pluginB.js': ['jquery']
    },
    deps: ['./bootstrap']
});
