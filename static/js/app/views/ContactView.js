define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        template = require('hbs!templates/contact');

    return BaseView.extend({

        className: 'page home',

        template: template,

        ui: {
        },

        breadcrumb: 'navigation',

        logo: 'hide',

        events: {
        },

        initialize: function(e) {
            BaseView.prototype.initialize.call(this);
        },

        onShow: function() {
            this.delegateEvents();
        }

    });
});
