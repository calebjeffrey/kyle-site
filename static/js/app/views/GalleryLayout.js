define(function(require, exports, module) {
    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        app = require('app/app'),
        ArtCollectionView = require('app/views/ArtCollectionView'),
        vent = require('app/vent'),
        helpers = require('app/utils/helpers'),
        phosphor = require('phosphor'),
        lazyLoad = require('lazyLoad'),
        template = require('hbs!templates/gallery-layout');

    require('jquery.velocity');

    return Marionette.LayoutView.extend({

        className: 'page gallery',

        template: template,

        regions: {
            regionCollection: '#region-collection'
        },

        ui: {
            footer: 'footer',
            header: '.grid-header',
            previousGalleryLink: '.grid-header a',
            nextGalleryLink: 'footer a',
            gridItems: '.item',
            gridLinks: '.item .detail-link'
        },

        events: {
            'click @ui.previousGalleryLink': 'onClickPreviousGallery',
            'click @ui.nextGalleryLink': 'onClickNextGallery',
            'click @ui.gridLinks': 'onClickGridLink'
        },

        initialize: function(options) {
            this.animIntro = options.animIntro;
            this.collection = new Backbone.Collection(options.artCollection);
            this.collectionView = new ArtCollectionView({
                collection: this.collection
            });

            app.vent.on('slides:animate', this.animateSlidesIn, this);

            this.$el.addClass('gallery-before-transition');
        },

        onShow: function() {
            console.log('GALLERY LAYOUT => show');
            var self = this;
            this.delegateEvents();
            this.regionCollection.show(this.collectionView);
            this.$el.removeClass('gallery-before-transition title-card-showing').addClass('gallery-transitioning-in');
            this.bindUIElements();
            this.checkIntro();
            this.lazyLoadImages();

            if (app.firstLoad) {
                this.animateSlidesIn();
            }

            app.vent.trigger('menu:showLogo');
            app.vent.trigger('hamburger:show');
        },

        onClickGridLink: function(e) {

            if ($(window).width() < 480) {
                e.preventDefault();
                e.stopPropagation();

                var parent = $(e.currentTarget).closest('.item');

                if (parent.hasClass('show-meta')) {
                    parent.removeClass('show-meta');
                } else {
                    parent.addClass('show-meta');
                }

            } else {
                this.ui.gridItems.css('opacity', 1);
                this.ui.gridItems.removeClass('animate-in is-animating-down');
                this.ui.gridItems.addClass('is-animating-down');
            }
        },

        checkIntro: function() {
            this.ui.gridItems.removeClass('animate-in is-animating-down');
        },

        lazyLoadImages: function() {
            this.bindUIElements();

            $('.lazy').lazyload({
                effect: 'fadeIn',
                container: $('.app'),
                failure_limit : 40,
                skip_invisible: false
            });
        },

        genRandomNum: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        onClickPreviousGallery: function(e) {
            this.$el.addClass('title-card-showing');
            app.vent.trigger('titleCard:show', this.model.get('previousGallery'), 'prev');
        },

        onClickNextGallery: function(e) {
            this.$el.addClass('title-card-showing');
            app.vent.trigger('titleCard:show', this.model.get('nextGallery'), 'next');
        },

        animateSlidesIn: function(delay) {
            console.log('animateSlidesIn');
            var self = this;
            this.bindUIElements();

            _.each(this.ui.gridItems, function(item) {
                $(item).css('animation-delay', '0.' + self.genRandomNum(100, 300) + 's');
            });

            if (delay) {
                setTimeout(function() {
                    $('.item').removeClass('animate-in');
                }, 1000);
                setTimeout(function() {
                    _.each($('.item'), function(item) {
                        $(item).css('animation-delay', '0.' + self.genRandomNum(100, 300) + 's');
                    });
                    $('.item').addClass('animate-in');
                }, delay);
            } else {
                this.ui.gridItems.addClass('animate-in');
            }
        },

        onDestroy: function() {
        }

    });
});
