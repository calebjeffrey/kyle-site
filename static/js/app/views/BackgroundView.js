define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        helpers = require('app/utils/helpers'),
        siteBackgrounds = require('app/data/siteBackgrounds');
        template = require('hbs!templates/background');

    return BaseView.extend({

        className: 'app-background',

        template: template,

        ui: {
            bg: '.bg'
        },

        initialize: function(e) {
            BaseView.prototype.initialize.call(this);
            this.siteBackgrounds = (Modernizr.touch) ? siteBackgrounds.mobile : siteBackgrounds.desktop;
            app.vent.on('change:bg', this.loadRandomBackground, this);
        },

        onShow: function() {
            this.loadRandomBackground();
        },

        loadRandomBackground: function() {
            console.log('bg change');
            this.ui.bg.css('background-image', '');
            var background = this.siteBackgrounds[_.random(0, this.siteBackgrounds.length)];

            var image = new Image();
            image.src = '/img/backgrounds/' + background;

            this.ui.bg.css('background-image', 'url(' + image.src + ')');
        }

    });
});
