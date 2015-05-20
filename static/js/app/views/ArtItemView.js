define(function(require, exports, module) {
    var Marionette = require('marionette'),
        template = require('hbs!templates/art');
        vent = require('app/vent');

    return Marionette.ItemView.extend({

        template: template,

        className: 'item',

        templateHelpers: function() {
            return {
                hasExternalUrl: this.hasExternalUrl,
                isVisible: this.isVisible,
                linkText: this.linkText,
                externalUrl: this.externalUrl,
                mailto: this.mailTo
            };
        },

        initialize: function(options) {
            this.returnUrl = options.returnUrl || '/';
            this.hasExternalUrl = (this.model.get('inquire').externalUrl) ? true : false;
            this.isVisible = (this.model.get('inquire').visible) ? true : false;
            this.linkText = this.model.get('inquire').linkText;
            this.mailTo = this.model.get('inquire').mailto;
            this.externalUrl = this.model.get('inquire').externalUrl;
        },

    });
});
