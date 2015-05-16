define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
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
        },

        onShow: function() {
            this.loadRandomBackground();
        },

        loadRandomBackground: function() {
            var background = this.siteBackgrounds[_.random(0, this.siteBackgrounds.length)];

            var image = new Image();
            image.src = '/img/backgrounds/' + background;

            this.ui.bg.css('background-image', 'url(' + image.src + ')');
        }

    });
});
