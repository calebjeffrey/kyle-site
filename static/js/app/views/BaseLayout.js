define(function(require, exports, module) {
    var Marionette = require('marionette'),
        vent = require('app/vent');

    return Marionette.LayoutView.extend({

        breadcrumb: null,

        initialize: function() {
            this.triggerCurrentPage();
        },

        triggerCurrentPage: function() {
            var currentPage = window.location.pathname;
            vent.trigger('header:updateCurrentPage', {
                path: currentPage,
                breadcrumb: this.breadcrumb,
                logo: this.logo
            });
        },

        onShow: function() {
            this.delegateEvents();
        },

        serializeData: function() {
            return {
                "staticUrl": window.staticUrl
            };
        }
    });
});
