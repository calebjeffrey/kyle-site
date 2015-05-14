define(function(require, exports, module) {
    var Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants'),
        app = require('app/app'),
        velocity = require('jquery.velocity'),
        template = require('hbs!templates/header'),
        menuData = require('app/data/menu'),
        vent = require('app/vent');

    return Marionette.ItemView.extend({

        template: template,

        templateHelpers: function() {
            return {
                menuData: menuData
            };
        },

        ui: {
            logo: '.header-logo',
            menuOverlay: '.menu-overlay',
            menu: '.menu',
            menuLink: '.menu a',
            hamburger: '.hamburger'
        },

        events: {
            'click @ui.hamburger': 'toggleMenu',
            'click @ui.menuLink': 'onClickMenuLink'
        },

        initialize: function(e) {
            this.bindUIElements();
            $(document).on('keyup', this.onKeyUp);
            this.listenTo(app.vent, 'menu:open', this.toggleMenu);
            this.listenTo(app.vent, 'menu:openFirst', this.introMenu);
            this.listenTo(app.vent, 'gallery:showHeader', this.adjustHeader);
            this.listenTo(app.vent, 'gallery:hideHeader', this.resetHeader);
            this.listenTo(app.vent, 'menu:showLogo', this.showLogo);
            this.listenTo(app.vent, 'menu:hideLogo', this.hideLogo);
            this.listenTo(app.vent, 'menu:toggle', this.toggleHeader);
            this.listenTo(app.vent, 'hamburger:show', this.showHamburger);
            this.listenTo(app.vent, 'hamburger:hide', this.hideHamburger);
        },

        introMenu: function() {
            var self = this;
            this.ui.hamburger.addClass('hide');
            this.resetHeader();
            app.vent.trigger('header:resetHeader');
            this.ui.menuOverlay.addClass('menu-open-first');

            setTimeout(function() {
                self.ui.menuOverlay.removeClass('menu-open-first');
                helpers.addBodyClass(constants.MENU_OPEN_CLASS);
            }, 2000);
        },

        toggleMenu: function(options) {
            if (options === 'hideHamburger') {
                this.ui.hamburger.addClass('hide');
            } else {
                this.ui.hamburger.removeClass('hide');
            }
            if ($('body').hasClass(constants.MENU_OPEN_CLASS)) {
                this.closeMenu();
            } else {
                this.resetHeader();
                app.vent.trigger('header:resetHeader');
                helpers.addBodyClass(constants.MENU_OPEN_CLASS);
            }
        },

        closeMenu: function() {
            var self = this;
            this.ui.hamburger.addClass('hide');
            this.ui.menuOverlay.removeClass('menu-open-first');
            this.ui.menuOverlay.addClass('transition-down-out');

            $('.page').velocity('scroll', {
                container: $('.app'),
                duration: 10
            });

            setTimeout(function() {
                helpers.removeBodyClass(constants.MENU_OPEN_CLASS);
                self.ui.menuOverlay.removeClass('transition-down-out');
            }, 1500);

            setTimeout(function() {
                self.ui.hamburger.removeClass('hide');
            }, 2500);
        },

        onClickMenuLink: function(e) {
            this.closeMenu();
        },

        adjustHeader: function() {
            // this.$el.add(this.ui.logo).addClass('gallery-header-showing');
        },

        resetHeader: function() {
            // this.$el.add(this.ui.logo).removeClass('gallery-header-showing');
        },

        toggleHeader: function() {
            this.$el.toggleClass('is-hidden');
        },

        showLogo: function() {
            this.ui.logo.addClass('is-showing');
        },

        hideLogo: function() {
            this.ui.logo.removeClass('is-showing');
        },

        showHamburger: function() {
            this.ui.hamburger.removeClass('hide');
        },

        hideHamburger: function() {
            this.ui.hamburger.addClass('hide');
        },

        onKeyUp: function(e) {
            if (e.keyCode == 27) {
                this.closeMenu();
            }
        }

    });
});
