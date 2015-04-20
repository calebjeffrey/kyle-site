// define(function(require, exports, module) {
//     var Marionette = require('marionette'),
//         helpers = require('app/utils/helpers'),
//         constants = require('app/utils/constants'),
//         app = require('app/app'),
//         vent = require('app/vent');

//     return Marionette.ItemView.extend({

//         el: '.loader',

//         ui: {
//             title: '.h1'
//         },

//         events: {
//             'click @ui.hamburger': 'toggleMenu',
//             'click @ui.menuLink': 'onClickMenuLink'
//         },

//         initialize: function(e) {
//             this.bindUIElements();
//             $(document).on('keyup', this.onKeyUp);
//             this.listenTo(app.vent, 'menu:open', this.toggleMenu);
//         },

//         toggleMenu: function(options) {
//             if (options === 'hideHamburger') {
//                 this.ui.hamburger.addClass('hide');
//             } else {
//                 this.ui.hamburger.removeClass('hide');
//             }
//             if ($('body').hasClass(constants.MENU_OPEN_CLASS)) {
//                 this.closeMenu();
//             } else {
//                 helpers.addBodyClass(constants.MENU_OPEN_CLASS);
//             }
//         },

//         closeMenu: function() {
//             var self = this;
//             this.ui.hamburger.addClass('hide');
//             this.ui.menuOverlay.addClass('transition-up-out');

//             setTimeout(function() {
//                 helpers.removeBodyClass(constants.MENU_OPEN_CLASS);
//                 self.ui.menuOverlay.removeClass('transition-up-out');
//             }, 1000);

//             setTimeout(function() {
//                 self.ui.hamburger.removeClass('hide');
//             }, 1500);
//         },

//         onClickMenuLink: function(e) {
//             this.closeMenu();
//         },

//         onKeyUp: function(e) {
//             if (e.keyCode == 27) {
//                 this.closeMenu();
//             }
//         }

//     });
// });
