define(function(require, exports, module) {
    var Marionette = require('marionette'),
        app = require('app/app'),
        vent = require('app/vent'),
        helpers = require('app/utils/helpers'),
        constants = require('app/utils/constants');
        // FastClick = require('fastclick');

    // require('jquery.velocity');

    return Marionette.ItemView.extend({

        el: 'body',

        ui: {
            $app: $('.app'),
            links: '[data-navigate], a[href^="/"]'
        },

        events: {
            'click @ui.links': 'onClickNavigate'
        },

        initialize: function() {
            this.onClickNavigate();

            this.listenTo(app.vent, 'app:ready', this.onAppReady);
            // this.listenTo(app.vent, 'overlay:open', this.preventNaturalScroll);
            // this.listenTo(app.vent, 'overlay:close', this.resumeNaturalScroll);
            document.addEventListener("touchstart", function() {}, true);
            // No click delay for iOS
            // FastClick.attach(document.body);

        },

        onClickNavigate: function(e) {
            this.ui.$app.on('click', 'a[href^="/"]', function(event) {
                if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                    event.preventDefault();
                    var url = $(event.currentTarget).attr('href').replace(/^\//, "");
                    var previousUrl = window.location.pathname;
                    app.previousUrl = previousUrl;
                    app.firstLoad = false;

                    if ($(event.currentTarget).data('nav')) {
                        setTimeout(function(){
                            app.appRouter.navigate(url, {
                                trigger: true
                            });
                        }, 1000);
                    } else {
                        app.appRouter.navigate(url, {
                            trigger: true
                        });
                    }
                }
            });
        },

        onAppReady: function() {
            // if (app.onLoad) {
                this.$el.removeClass(constants.INITING_CLASS);
            // }
        },

        preventNaturalScroll: function() {
            // Cache scroll position so we can return later
            app.scrollPos = $(document).scrollTop();

            // Fix page position to prevent body scroll
            $('html').addClass('no-scroll');

            $('.page').css({
                top: -app.scrollPos,
                height: $(window).height() + app.scrollPos
            });

            // Scroll to top of window
            helpers.scrollTo('body', true);
        },

        resumeNaturalScroll: function() {
            $('html').removeClass('no-scroll');

            $('.page').css({
                top: '',
                height: '100%'
            });

            // Return to previous scroll position
            $(document).scrollTop(app.scrollPos);
        }

    });
});
