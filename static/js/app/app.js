define(function(require, exports, module) {
    var Marionette = require('marionette');

    var app = new Backbone.Marionette.Application();

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
