define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        infoData = require('app/data/info'),
        template = require('hbs!templates/info');

    return BaseView.extend({

        className: 'page info',

        template: template,

        templateHelpers: function() {
            return {
                infoData: infoData
            };
        },

        ui: {
        },

        events: {
        },

        initialize: function() {
            BaseView.prototype.initialize.call(this);
        },

        onShow: function() {
            app.vent.trigger('menu:showLogo');
            app.vent.trigger('hamburger:show');
        }

    });
});
