define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        velocity = require('jquery.velocity'),
        template = require('hbs!templates/title-card');

    return BaseView.extend({

        className: 'overlay title-card panel',

        template: template,

        ui: {
            title: 'h1'
        },

        initialize: function(options) {
            BaseView.prototype.initialize.call(this);
            this.title = options.title;
            this.direction = options.direction;
            console.log(this.direction)
            this.$el.addClass(this.direction);
        },

        onShow: function() {
            var self = this;
            var transY = (this.direction === 'next') ? '100%' : '-100%';

            this.$el.velocity({
                translateY: transY
            }, {
                display: 'block',
                duration: 10,
                complete: _.bind(this.showTitleCard, this)
            });
        },

        showTitleCard: function() {
            this.$el.velocity({
                translateY: ['0%', [0.165, 0.84, 0.44, 1]]
            }, {
                duration: 1000,
                complete: _.bind(this.showTitle, this)
            });
        },

        showTitle: function() {
            window.scrollTo(0, 0);

            this.ui.title.velocity({
                translateX: '-50%',
                translateY: '0%'
            }, {
                duration: 10
            });

            this.ui.title.velocity({
                opacity: 1,
                translateX: '-50%',
                translateY: '-50%'
            }, {
                duration: 1000
            });

            this.ui.title.velocity({
                opacity: 0
            }, {
                delay: 500,
                duration: 1000,
                complete: _.bind(this.hideTitleCard, this)
            });
        },

        hideTitleCard: function() {
            var transY = (this.direction === 'next') ? '-100%' : '100%';

            this.$el.velocity({
                translateY: [transY, [0.895, 0.03, 0.685, 0.22]]
            }, {
                duration: 1000,
                complete: _.bind(this.closeView, this)
            });
        },

        closeView: function() {
            app.vent.trigger('slides:animate');
            this.destroy();
        },

        serializeData: function() {
            return {
                title: this.title
            };
        }

    });
});
