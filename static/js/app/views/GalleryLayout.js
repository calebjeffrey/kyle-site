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
            gridLinks: '.item a'
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

            this.$el.addClass('gallery-before-transition');
        },

        onShow: function() {
            var self = this;
            this.delegateEvents();
            this.regionCollection.show(this.collectionView);
            this.$el.removeClass('gallery-before-transition title-card-showing').addClass('gallery-transitioning-in');
            this.bindUIElements();
            this.checkIntro();
            this.lazyLoadImages();

            this.animateSlidesIn();

            app.vent.trigger('menu:showLogo');
            app.vent.trigger('hamburger:show');

            app.vent.on('slides:animate', this.animateSlides, this);
        },

        onClickGridLink: function(e) {
            this.ui.gridItems.css('opacity', 1);
            this.ui.gridItems.removeClass('animate-in is-animating-down');
            this.ui.gridItems.addClass('is-animating-down');
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

        animateSlidesIn: function() {
            var self = this;
            this.bindUIElements();

            _.each(this.ui.gridItems, function(item) {
                $(item).css('animation-delay', '0.' + self.genRandomNum(100, 300) + 's');
            });

            this.ui.gridItems.addClass('animate-in');
        },

        onDestroy: function() {
        }

    });
});
