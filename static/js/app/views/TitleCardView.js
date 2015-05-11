define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        velocity = require('jquery.velocity'),
        template = require('hbs!templates/title-card');

    return BaseView.extend({

        className: 'overlay title-card panel',

        template: template,

        initialize: function(options) {
            BaseView.prototype.initialize.call(this);
            this.title = options.title;
            this.direction = options.direction;
            this.$el.addClass(this.direction);
        },

        onShow: function() {
            var self = this;

            this.delegateEvents();

            setTimeout(function(){
                self.$el.addClass('is-showing');
            }, 10);

            setTimeout(function(){
                self.$el.removeClass('is-showing').addClass('is-leaving');
                $('.page').velocity('scroll', {
                    container: $('.app'),
                    duration: 10
                });
            }, 3000);

            setTimeout(function(){
                self.destroy();
            }, 4000);
        },

        serializeData: function() {
            return {
                title: this.title
            };
        }

    });
});
