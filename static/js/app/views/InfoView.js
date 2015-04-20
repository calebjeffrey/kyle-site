define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        app = require('app/app'),
        infoData = require('app/data/info'),
        template = require('hbs!templates/info');

    return BaseView.extend({

        className: 'page info',

        template: template,

        templateHelpers: function() {
            return {
                infoData: infoData
            };
        },

        ui: {
        },

        events: {
        },

        initialize: function() {
            console.log(JSON.stringify(infoData));
            BaseView.prototype.initialize.call(this);
        },

        onShow: function() {
            // this.delegateEvents();
        }

    });
});
