define(function(require, exports, module) {
    var Marionette = require('marionette');
    var app = new Backbone.Marionette.Application();

    window.Modernizr.addTest('hires', function() {
        // starts with default value for modern browsers
        var dpr = window.devicePixelRatio ||

        // fallback for IE
            (window.screen.deviceXDPI / window.screen.logicalXDPI) ||

        // default value
            1;

        var result = (dpr > 1) ? true : false;

        return result;
    });

    app.addRegions({
        regionMain: '#region-main',
        regionBackground: '#region-background',
        regionHeader: '#region-header'
    });

    app.addInitializer(function() {
        Backbone.history.start({
            pushState: true
        });
    });

    return app;
});
