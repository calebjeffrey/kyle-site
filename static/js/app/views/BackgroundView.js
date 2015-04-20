define(function(require, exports, module) {
    var BaseView = require('app/views/BaseView'),
        helpers = require('app/utils/helpers'),
        template = require('hbs!templates/background');

    return BaseView.extend({

        className: 'app-background',

        template: template,

        ui: {
            bg: '.bg'
        },

        initialize: function(e) {
            BaseView.prototype.initialize.call(this);
        },

        changeBackground: function(theme) {

        }
    });
});
