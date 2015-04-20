define(function(require, exports, module) {
    var Marionette = require('marionette'),
        app = require('app/app'),
        template = require('hbs!templates/main-layout'),
        TransitionRegion = require('app/regions/TransitionRegion');

    return Marionette.LayoutView.extend({
        template: template,

        ui: {
            $app: $('.app')
        },

        regions: {
            page: {
                selector: '#region-page',
                regionClass: TransitionRegion
            },
            overlay: '#region-overlay'
        },

        initialize: function() {
            // this.onClickNavigate();
        },

        onClickNavigate: function(event) {
            // this.ui.$app.on('click', 'a[href^="/"]', function(event) {
            //     if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
            //         event.preventDefault();
            //         var url = $(event.currentTarget).attr('href').replace(/^\//, "");
            //         app.appRouter.navigate(url, {
            //             trigger: true
            //         });
            //     }
            // });
        }
    });
});
