define(function(require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!templates/menu-link');
        vent = require('app/vent');

    return Marionette.ItemView.extend({

        template: template,

        tagName: 'li',

        initialize: function() {
        }

    });
});
