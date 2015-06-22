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
            'click @ui.menuLink': 'onClickMenuLink',
            'click @ui.logo': 'onClickLogo'
        },

        initialize: function(e) {
            this.menuOpen = false;
            this.bindUIElements();
            $(document).on('keyup', this.onKeyUp);
            this.listenTo(app.vent, 'menu:open', this.toggleMenu);
            this.listenTo(app.vent, 'menu:openFirst', this.openMenuFirst);
            this.listenTo(app.vent, 'gallery:showHeader', this.adjustHeader);
            this.listenTo(app.vent, 'gallery:hideHeader', this.resetHeader);
            this.listenTo(app.vent, 'menu:showLogo', this.showLogo);
            this.listenTo(app.vent, 'menu:hideLogo', this.hideLogo);
            this.listenTo(app.vent, 'menu:toggle', this.toggleHeader);
            this.listenTo(app.vent, 'hamburger:show', this.showHamburger);
            this.listenTo(app.vent, 'hamburger:hide', this.hideHamburger);
        },

        openMenuFirst: function() {
            this.ui.menuOverlay.velocity({
                translateY: '100%'
            }, {
                display: 'block',
                duration: 10,
                complete: _.bind(this.openMenu, this)
            });
        },

        openMenuOther: function() {
            this.ui.menuOverlay.velocity({
                translateY: '-100%'
            }, {
                display: 'block',
                duration: 10,
                complete: _.bind(this.openMenu, this)
            });
        },

        openMenu: function() {
            console.log('open menu')
            $('body').addClass(constants.MENU_OPEN_CLASS);

            this.menuOpen = !this.menuOpen;

            this.ui.menuOverlay.velocity({
                translateY: ['0%', [0.77, 0, 0.175, 1]]
            }, {
                duration: 1000,
                complete: _.bind(this.showMenuItems, this)
            });
        },

        showMenuItems: function() {
            this.ui.menu.velocity({
                opacity: 0,
                translateX: '-50%',
                translateY: '-40%'
            }, {
                duration: 10
            });

            this.ui.menu.velocity({
                opacity: 1,
                translateX: '-50%',
                translateY: '-50%'
            }, {
                duration: 1000
            });
        },

        toggleMenu: function() {
            if (this.menuOpen) {
                this.closeMenu();
            } else {
                this.openMenuOther();
            }
        },

        closeMenu: function() {
            $('body').removeClass(constants.MENU_OPEN_CLASS);
            this.menuOpen = !this.menuOpen;

            $('.page').velocity('scroll', {
                container: $('.app'),
                duration: 10
            });

            this.ui.menu.velocity({
                opacity: 0,
            }, {
                duration: 500,
                complete: _.bind(this.closeMenuDown, this)
            });
        },

        closeMenuDown: function() {
            this.ui.menuOverlay.velocity({
                translateY: ['100%', [0.895, 0.03, 0.685, 0.22]]
            }, {
                duration: 1000
            });
        },

        onClickMenuLink: function(e) {
            this.closeMenu();
            _.delay(function() {
                app.vent.trigger('slides:animate', 1000);
            }, 1000);

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
            this.ui.hamburger.removeClass('is-hiding');
        },

        hideHamburger: function() {
            this.ui.hamburger.addClass('is-hiding');
        },

        onClickLogo: function(e) {
            if (window.location.pathname === '/') {
                e.preventDefault();
                e.stopPropagation();
                app.vent.trigger('change:bg');
                this.closeMenu();
                setTimeout(function() {
                    app.vent.trigger('show:intro');
                }, 2000);
            }
        },

        onKeyUp: function(e) {
            if (e.keyCode == 27) {
                this.closeMenu();
            }
        }

    });
});
