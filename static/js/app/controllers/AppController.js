define(function(require, exports, module) {
    var app = require('app/app'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),
        vent = require('app/vent'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        MainLayout = require('app/views/MainLayout'),
        HeaderView = require('app/views/HeaderView'),
        BaseView = require('app/views/BaseView'),
        GlobalView = require('app/views/GlobalView'),
        LoadingView = require('app/views/LoadingView'),
        BackgroundView = require('app/views/BackgroundView'),
        TitleCardView = require('app/views/TitleCardView'),

        //pages
        ContactView = require('app/views/ContactView'),
        GalleryLayout = require('app/views/GalleryLayout'),
        InfoView = require('app/views/InfoView'),
        HomeView = require('app/views/HomeView'),
        ArtDetailView = require('app/views/ArtDetailView'),

        //data
        artData = require('app/data/art'),
        galleryData = require('app/data/galleries'),

        //collections
        InfoCollection = require('app/models/Info'),
        ArtCollection = require('app/collections/Art'),
        GalleryCollection = require('app/collections/Galleries');

    return Backbone.Marionette.Controller.extend({

        initialize: function() {
            this.initGlobals();

            // Show main layout
            this.mainLayout = new MainLayout();
            app.regionMain.show(this.mainLayout);

            // Show background view
            this.backgroundView = new BackgroundView();
            app.regionBackground.show(this.backgroundView);

            this.headerView = new HeaderView();
            app.regionHeader.show(this.headerView);

            // Set listeners
            this.listenTo(app.vent, 'titleCard:show', this.showTitleCardView);
        },

        initGlobals: function() {
            var baseView = new BaseView(),
                globalView = new GlobalView();
        },

        /* Pages
        =========================================== */

        index: function() {
            this.homeView = new HomeView();
            this.mainLayout.page.transitionToView(this.homeView);
        },

        gallery: function(slug) {
            this.slug = slug;

            if (app.previousUrl) {
                this.animIntro = (app.previousUrl.indexOf('art') > -1) ? true : false;
            }

            this.showGallery();
        },

        showGallery: function() {
            this.model = _.where(galleryData, { title : this.slug })[0];

            this.galleryLayout = new GalleryLayout({
                model: new Backbone.Model(this.model),
                artCollection: artData[0][this.slug],
                animIntro: this.animIntro
            });

            this.mainLayout.page.transitionToView(this.galleryLayout);
        },

        artDetail: function(slug) {
            var self = this;
            this.slug = slug;
            this.returnUrl = app.previousUrl;
            this.artModels = [];
            _.each(artData[0], function(gallery, title) {
                 _.each(gallery, function(model) {
                    if (model.slug === self.slug) {
                        self.artModels.push(model);
                    }
                });
            });

            this.model = this.artModels[0];

            this.showArtDetail();
        },

        showArtDetail: function() {
            this.artDetailView = new ArtDetailView({
                model: new Backbone.Model(this.model),
                returnUrl: this.returnUrl
            });

            this.mainLayout.overlay.show(this.artDetailView);
        },

        info: function() {
            this.infoView = new InfoView();
            this.mainLayout.page.transitionToView(this.infoView);
        },

        contact: function() {
            this.contactView = new ContactView();
            this.mainLayout.page.transitionToView(this.contactView);
        },

        showLoadingView: function(title) {
            this.loadingView = new LoadingView({
                title: title
            });
            this.mainLayout.overlay.show(this.loadingView);
        },

        showTitleCardView: function(title, direction) {
            this.titleCardView = new TitleCardView({
                title: title,
                direction: direction
            });
            this.mainLayout.overlay.show(this.titleCardView);
        },

        default: function(def) {
            this.index();
        }

    });

});

