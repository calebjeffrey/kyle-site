define(function(require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!templates/art');
        vent = require('app/vent');

    return Marionette.ItemView.extend({

        template: template,

        className: 'item',

        initialize: function(options) {
        }

    });
});
