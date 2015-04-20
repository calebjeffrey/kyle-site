define(function(require, exports, module) {
    var Marionette = require('marionette'),
        app = require('app/app'),
        template = require('hbs!templates/loading-view'),
        vent = require('app/vent');

    return Marionette.ItemView.extend({


        initialize: function(options) {
            this.title = options.title;
        },

        onShow: function() {
        },

        serializeData: function() {
            return {
                title: this.title
            };
        }
    });
});
