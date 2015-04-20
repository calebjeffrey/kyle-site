define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Art = require('app/models/Art');

    return Backbone.Collection.extend({

        model: Art

    });
});
