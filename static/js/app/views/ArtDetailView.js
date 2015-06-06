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
            wrapper: '.wrapper',
            img: 'img'
        },

        events: {
            'click @ui.figure': 'onClickFigure',
            'click @ui.wrapper': 'onClickWrapper'
        },

        templateHelpers: function() {
            return {
                hasExternalUrl: this.hasExternalUrl,
                isVisible: this.isVisible,
                linkText: this.linkText,
                externalUrl: this.externalUrl,
                mailto: this.mailTo
            };
        },

        initialize: function(options) {
            BaseView.prototype.initialize.call(this);
            this.returnUrl = options.returnUrl || '/';
            this.hasExternalUrl = (this.model.get('inquire').externalUrl) ? true : false;
            this.isVisible = (this.model.get('inquire').visible) ? true : false;
            this.linkText = this.model.get('inquire').linkText;
            this.mailTo = this.model.get('inquire').mailto;
            this.externalUrl = this.model.get('inquire').externalUrl;

            $(window).on('resize.detail', _.bind(this.handleImageSize, this));
        },

        handleImage: function() {
            var self = this;
            var image = new Image();
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var offset = 0.8;
            image.onload = function() {
                var img = $(this);
                if (this.naturalHeight > (windowHeight * offset) && windowHeight < 1000) {
                    self.ui.img.css({
                        height: windowHeight * 0.8
                    });
                }

                if (this.naturalHeight > (windowHeight * offset) && windowHeight > 1000) {
                    self.ui.img.css({
                        height: windowHeight * 0.8
                    });
                }

                if (windowWidth < 1000) {
                    self.ui.img.css({
                        height: 'auto'
                    });
                }

                if (this.naturalWidth > this.naturalHeight) {
                    self.ui.img.css({
                        height: 'auto'
                    });
                }
            };

            image.src = '/img/artwork/' + this.model.get('type') + '/' + this.model.get('image2x');

            setTimeout(function() {
                self.$el.addClass('animate-in');
            }, 500);

        },

        onClickFigure: function(e) {
            var $target = $(e.target);
            e.stopPropagation();

            if (!$target.hasClass('inquire')) {
                this.$el.toggleClass('show-meta');
            }
        },

        onShow: function() {
            this.delegateEvents();
            this.handleImage();
            // app.vent.trigger('header:resetHeader');
            app.vent.trigger('menu:toggle');
            app.vent.trigger('hamburger:hide');
            app.vent.trigger('menu:hideLogo');
        },

        onClickWrapper: function(e) {
            var self = this;
            this.$el.addClass('is-animating-down');
            app.vent.trigger('menu:toggle');

            _.delay(function() {
                app.vent.trigger('slides:animate', 1000);
            }, 1000);

            setTimeout(function(){
                app.appRouter.navigate(self.returnUrl, {
                    trigger: true
                });

                self.destroy();
            }, 1500);

        },

        handleImageSize: function() {
            var windowHeight = $(window).height();
            var windowWidth = $(window).width();
            var offset = 0.8;
            if (this.ui.img.height() > (windowHeight * offset) && windowHeight < 1000) {
                this.ui.img.css({
                    height: windowHeight * 0.8
                });
            }

            if (windowWidth < 1000) {
                this.ui.img.css({
                    height: 'auto'
                });
            }

        },

        onDestroy: function() {
            $(window).off('resize.detail');
            app.vent.trigger('hamburger:show');
            app.vent.trigger('menu:showLogo');
        },

        serializeData: function() {
            return this.model.toJSON();
        }

    });
});
