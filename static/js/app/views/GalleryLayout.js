define(function(require, exports, module) {
    var Marionette = require('marionette'),
        Backbone = require('backbone'),
        app = require('app/app'),
        ArtCollectionView = require('app/views/ArtCollectionView'),
        vent = require('app/vent'),
        helpers = require('app/utils/helpers'),
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
            gridLinks: '.item .detail-link',
            overlay: '.overlay',
            meta: '.meta',
            columns: '.column'
        },

        events: {
            'click @ui.previousGalleryLink': 'onClickPreviousGallery',
            'click @ui.nextGalleryLink': 'onClickNextGallery',
            'click @ui.gridLinks': 'onClickGridLink',
            'click @ui.overlay': 'onClickDetailOverlay',
            'click @ui.meta': 'onClickDetailOverlay'
        },

        initialize: function(options) {
            this.animIntro = options.animIntro;
            this.collection = new Backbone.Collection(options.artCollection);
            this.collectionView = new ArtCollectionView({
                collection: this.collection
            });

            app.vent.on('slides:animate', this.animateSlidesIn, this);
            app.vent.on('slides:animateAfterDetail', this.animateSlidesAfterDetail, this);
        },

        onShow: function() {
            var self = this;
            this.delegateEvents();
            this.regionCollection.show(this.collectionView);
            this.bindUIElements();

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
                console.log('else')
                this.animateSlidesDown();
            }
        },

        onClickDetailOverlay: function(e) {
            var parent = $(e.currentTarget).closest('.item');

                if (parent.hasClass('show-meta')) {
                    parent.removeClass('show-meta');
                } else {
                    parent.addClass('show-meta');
                }
        },

        genRandomNum: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },

        onClickPreviousGallery: function(e) {
            app.vent.trigger('titleCard:show', this.model.get('previousGallery'), 'prev');
            this.hideSlides();
        },

        onClickNextGallery: function(e) {
            app.vent.trigger('titleCard:show', this.model.get('nextGallery'), 'next');
            this.hideSlides();
        },

        hideSlides: function() {
            this.ui.gridItems.velocity({
                opacity: 0
            }, {
                duration: 300
            });
        },

        animateSlidesIn: function() {
            $('.item').velocity({
                translateY: '30%',
                opacity: 0
            }, {
                duration: 10,
                complete: _.bind(this.animateSlidesUp, this)
            });
        },

        animateSlidesUp: function() {
            _.each($('.item'), function(item, index) {

                $(item).velocity({
                    opacity: 1,
                    translateY: '0%'
                }, {
                    ease: [0.895, 0.03, 0.685, 0.22],
                    delay: _.random(100, 600),
                    duration: 500
                });
            });
        },

        animateSlidesAfterDetail: function() {
            var self = this;

            _.delay(function(){
                $('.item').velocity({
                    translateY: '30%',
                    opacity: 0
                }, {
                    duration: 10,
                    complete: _.bind(self.animateSlidesUp, self)
                });
            }, 200)
        },

        animateSlidesDown: function() {
            _.each(this.ui.gridItems, function(item, index) {
                $(item).velocity({
                    opacity: 0,
                    translateY: '30%'
                }, {
                    ease: [0.895, 0.03, 0.685, 0.22],
                    delay: _.random(100, 600),
                    duration: 500
                });
            });
        },

        onDestroy: function() {
        }

    });
});
