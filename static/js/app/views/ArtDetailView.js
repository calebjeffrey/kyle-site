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
            overlay: '.overlay',
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
            console.log(this.model);
            this.returnUrl = '/gallery/' + this.model.get('type');
            this.hasExternalUrl = (this.model.get('inquire').externalUrl) ? true : false;
            this.isVisible = (this.model.get('inquire').visible) ? true : false;
            this.linkText = this.model.get('inquire').linkText;
            this.mailTo = this.model.get('inquire').mailto;
            this.externalUrl = this.model.get('inquire').externalUrl;

            $(window).on('resize.detail', _.bind(this.handleImageSize, this));
        },

        handleImage: function() {
            var self = this;
            var winHeight = $(window).height();
            this.ui.img.css('max-height', winHeight * 0.8 + 'px');
            // var image = new Image();
            // var windowHeight = $(window).height();
            // var windowWidth = $(window).width();
            // var offset = 0.8;
            // image.onload = function() {
            //     var img = $(this);
            //     if (this.naturalHeight > (windowHeight * offset) && windowHeight < 1000) {
            //         self.ui.img.css({
            //             height: windowHeight * 0.8
            //         });
            //     }

            //     if (this.naturalHeight > (windowHeight * offset) && windowHeight > 1000) {
            //         self.ui.img.css({
            //             height: windowHeight * 0.8
            //         });
            //     }

            //     if (windowWidth < 1000) {
            //         self.ui.img.css({
            //             height: 'auto'
            //         });
            //     }

            //     if (this.naturalWidth > this.naturalHeight) {
            //         self.ui.img.css({
            //             height: 'auto'
            //         });
            //     }
            // };

            // if ($('body').hasClass('hires')) {
            //     image.src = '/img/artwork/' + this.model.get('type') + '/' + this.model.get('image2x');
            // } else {
            //     image.src = '/img/artwork/' + this.model.get('type') + '/' + this.model.get('image');    
            // }

            _.delay(function() {
                self.showArtDetail();
            }, 500);
        },

        showArtDetail: function() {
            this.$el.velocity({
                translateY: '-100%'
            }, {
                display: 'block',
                duration: 10,
                complete: _.bind(this.animateArtIn, this)
            });
            
        },

        animateArtIn: function() {
            this.$el.velocity({
                translateY: ['0%', [0.77, 0, 0.175, 1]]
            }, {
                duration: 1000,
                complete: _.bind(this.showDetailImage, this)
            });
        },

        showDetailImage: function() {
            this.ui.figure.velocity({
                opacity: 0,
                translateY: '-100%',
                translateX: '-50%'
            }, {
                display: 'block',
                duration: 10,
                complete: _.bind(this.animateDetailIn, this)
            });
        },

        animateDetailIn: function() {
            this.ui.figure.velocity({
                opacity: 1,
                translateY: '-50%'
            }, {
                ease: [0.165, 0.84, 0.44, 1],
                duration: 600
            });
        },

        animateDetailOut: function() {
            this.ui.figure.velocity({
                opacity: 0,
                translateY: '0%'
            }, {
                ease: [0.77, 0, 0.175, 1],
                duration: 600,
                complete: _.bind(this.hideArtDetail, this)
            });
        },

        hideArtDetail: function() {
            app.appRouter.navigate(this.returnUrl, {
                trigger: true
            });

            this.$el.velocity({
                translateY: '100%'
            }, {
                ease: [0.77, 0, 0.175, 1],
                duration: 1000,
                complete: _.bind(this.onCloseComplete, this)
            });
        },

        onCloseComplete: function() {
            app.vent.trigger('menu:toggle');
            app.vent.trigger('slides:animateAfterDetail');
            this.destroy();
        },

        onClickFigure: function(e) {
            var $target = $(e.target);
            e.stopPropagation();

            if (!$target.hasClass('inquire')) {
                this.$el.toggleClass('show-meta');
            }
        },

        onShow: function() {
            window.respimage();
            this.delegateEvents();
            this.handleImage();
            app.vent.trigger('menu:toggle');
            app.vent.trigger('hamburger:hide');
            app.vent.trigger('menu:hideLogo');
        },

        onClickWrapper: function(e) {
            var self = this;
            this.animateDetailOut();
        },

        handleImageSize: function() {
            // var windowHeight = $(window).height();
            // var windowWidth = $(window).width();
            // var offset = 0.8;
            // if (this.ui.img.height() > (windowHeight * offset) && windowHeight < 1000) {
            //     this.ui.img.css({
            //         height: windowHeight * 0.8
            //     });
            // }

            // if (windowWidth < 1000) {
            //     this.ui.img.css({
            //         height: 'auto'
            //     });
            // }

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
