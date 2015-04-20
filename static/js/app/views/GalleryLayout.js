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
        },

        onClickGridLink: function(e) {
            this.ui.gridItems.removeClass('animate-in is-animating-down');
            this.ui.gridItems.css('animation-delay', '0.' + this.genRandomNum(100, 300) + 's');
            this.ui.gridItems.addClass('is-animating-down');
        },

        checkIntro: function() {
            this.ui.gridItems.removeClass('animate-in is-animating-down');
            if (this.animIntro) {
                this.ui.gridItems.addClass('animate-in');
            }
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

        animateArt: function() {
            // var player_skull = null;
            // var player_skull_path = "/img/phosphor/skull/"; // path to Phosphor files on your server
            // var skull_framecount = 0;
            // var self = this;

            // var playerID = 'phosphor';
            // var player_path = "/static/img/phosphor/skull/"; // path to Phosphor files on your server

            // var player_gesture = new PhosphorPlayer(playerID);
            // phosphorCallback_skull = function(data) {
            //     skull_framecount = data.frames.length;
            //     player_skull.load_animation({
            //         imageArray: ["skull_atlas000.jpg"],
            //         imagePath: player_path,
            //         animationData: data,
            //         loop: true,
            //         onLoad: function() {
            //             player_gesture.play();
            //         }
            //     });
            // };

            // var jsonpScript = document.createElement("script");
            // jsonpScript.type = "text/javascript";
            // jsonpScript.id = "jsonPinclude_skull";
            // jsonpScript.src = player_path + "skull_animationData.jsonp";
            // document.getElementsByTagName("head")[0].appendChild(jsonpScript);

            // player_skull = new PhosphorPlayer('anim_target_skull');
            // phosphorCallback_skull = function(data) {
            //     skull_framecount = data.frames.length;
            //     player_skull.load_animation({
            //         imageArray:["skull_atlas000.jpg","skull_atlas001.jpg","skull_atlas002.jpg","skull_atlas003.jpg","skull_atlas004.jpg","skull_atlas005.jpg","skull_atlas006.jpg","skull_atlas007.jpg","skull_atlas008.jpg","skull_atlas009.jpg"],
            //         imagePath: player_skull_path,
            //         animationData: data,
            //         loop: true,
            //         onLoad: function() {
            //             console.log('loaded')
            //             player_skull.play();
            //         }
            //     });
            // };

            // var jsonpScript = document.createElement("script");
            // jsonpScript.type = "text/javascript";
            // jsonpScript.id = "jsonPinclude_skull";
            // jsonpScript.src = player_skull_path + "skull_animationData.jsonp";
            // document.getElementsByTagName("head")[0].appendChild(jsonpScript);
        },

        onDestroy: function() {
        }

    });
});
