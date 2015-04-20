define(function(require, exports, module) {
    var Backbone = require('backbone'),
        Gallery = require('app/models/Gallery');

    return Backbone.Collection.extend({

        model: Gallery

    });
});
