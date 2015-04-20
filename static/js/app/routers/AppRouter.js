define(function(require, exports, module) {
    var Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        AppController = require('app/controllers/AppController');

    return Marionette.AppRouter.extend({

        appRoutes: {
            '(/)': 'index',
            'gallery/:slug(/)': 'gallery',
            'art/:slug(/)': 'artDetail',
            'info(/)': 'info',
            'contact(/)': 'contact',
            '*default': 'index'
        },

        controller: new AppController()

    });

});
