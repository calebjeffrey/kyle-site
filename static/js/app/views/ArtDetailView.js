define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        velocity = require('jquery.velocity'),
        template = require('hbs!templates/art-detail'),
        vent = require('app/vent');

    return BaseView.extend({

        className: 'overlay art-detail panel',

        template: template,

        ui: {
            figure: 'figure',
            content: '.content',
            wrapper: '.wrapper'
        },

        events: {
            'click @ui.figure': 'onClickFigure',
            'click @ui.wrapper': 'onClickWrapper'
        },

        initialize: function(options) {
            BaseView.prototype.initialize.call(this);
            this.returnUrl = options.returnUrl;
        },

        onClickFigure: function(e) {
            e.stopPropagation();
            this.$el.toggleClass('show-meta');
        },

        onShow: function() {
            this.delegateEvents();
            // app.vent.trigger('header:resetHeader');
            app.vent.trigger('menu:toggle');
        },

        onClickWrapper: function(e) {
            var self = this;
            this.ui.figure.addClass('is-animating-down');
            app.vent.trigger('menu:toggle');

            setTimeout(function(){
                app.appRouter.navigate(self.returnUrl, {
                    trigger: true
                });

                self.destroy();
            }, 800);

        },

        serializeData: function() {
            return this.model.toJSON();
        }

    });
});
