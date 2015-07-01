requirejs.config({

    waitSeconds: 5,

    paths: {

        // Main libs
        backbone: 'libs/backbone',
        underscore: 'libs/underscore',
        jquery: 'libs/jquery',
        marionette: 'libs/backbone.marionette',
        'backbone.wreqr': 'libs/backbone.wreqr',
        'backbone.babysitter': 'libs/backbone.babysitter',
        Handlebars: 'libs/handlebars',

        // Main plugins
        hbs: 'libs/hbs',
        i18n: 'libs/i18n',
        i18nprecompile: 'libs/i18nprecompile',
        json2: 'libs/json2',

        // App specific plugins
        'jquery.velocity': 'libs/jquery.velocity',
        'phosphor': 'libs/phosphorframework',
        'lazyLoad': 'libs/lazyLoad',
        'viewport': 'libs/viewport',
        'masonry': 'libs/masonry',
        'respimage': 'libs/respimage.min',

        // shortcut to templates
        templates: './templates'

    },

    shim: {
        // Non-AMD libs
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },

        'jquery.velocity': {
            exports: '$',
            deps: ['jquery']
        },

        'respimage.min': {
            exports: 'respimage',
            // deps: ['jquery']
        },

        'phosphor': {
            deps: ['jquery']
        },

        'lazyLoad': {
            exports: '$',
            deps: ['jquery']
        },

        'viewport': {
            exports: '$',
            deps: ['jquery']
        }
    },

    hbs: {
        templateExtension: "html",
        disableI18n: true,
        disableHelpers: false
    }

});
