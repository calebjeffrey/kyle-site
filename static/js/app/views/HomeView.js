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
            _.delay(_.bind(this.animateUpAndOut, this), 4200);
        },

        animateUpAndOut: function() {
            this.ui.panel.velocity({
                translateY: ['-100%', [0.755, 0.05, 0.855, 0.06]]
            }, {
                duration: 1000,
                complete: function() {
                    app.vent.trigger('menu:openFirst');
                    app.vent.trigger('menu:showLogo');
                }
            });
        }

    });
});
