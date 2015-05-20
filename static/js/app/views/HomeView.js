define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        template = require('hbs!templates/home');

    return BaseView.extend({

        className: 'page home',

        template: template,

        ui: {
            panel: '.panel.fg'
        },

        breadcrumb: 'navigation',

        logo: 'hide',

        events: {
        },

        initialize: function(e) {
            BaseView.prototype.initialize.call(this);
        },

        onShow: function() {
            var self = this;

            this.delegateEvents();

            setTimeout(function(){
                self.ui.panel.addClass('is-leaving');
            }, 4000);

            setTimeout(function(){
                app.vent.trigger('menu:openFirst');
                app.vent.trigger('menu:showLogo');
            }, 5000);
        }

    });
});
