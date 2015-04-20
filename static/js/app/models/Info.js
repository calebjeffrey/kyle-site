define(function(require, exports, module) {
    var Backbone = require('backbone');

    return Backbone.Model.extend({

        urlRoot: window.staticUrl + 'js/app/data/info.json'

    });
});