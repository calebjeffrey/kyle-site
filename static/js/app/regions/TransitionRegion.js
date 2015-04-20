define(function(require, exports, module) {
    var Marionette = require('marionette'),
        helpers = require('app/utils/helpers'),
        _ = require('underscore');

    return Marionette.Region.extend({

        initialize: function() {
            this.transEndEventName = helpers.prefixedTransEnd;
            this.transformPropName = helpers.prefixedTransform;
        },

        transitionToView: function( newView ) {

            var self = this,
                synchonousTransition = ( $('body').data('page-trans') === 'fade' ) ? true : false;

            // Make sure we have a view
            var view = this.currentView;
            if (!view || view.isClosed){
                this.show(newView);
                return;
            }

            // I'm not gonna lie I have no idea if this is necessary
            Marionette.triggerMethod.call(this, 'willTransition', view);

            this.stopListening(newView, 'render');

            // Wait for the new view to render, then initialize a transition to
            // show the new view while hiding the old.
            this.listenTo( newView, 'render', function() {

                // clean up the old listeners, just to ensure we only have 1 active.
                self.$el.off( self.transEndEventName );

                // CSS Based transition
                if( Modernizr && Modernizr.csstransforms3d ) {
                    // Allow CSS to dictate where the new view's start position should be
                    newView.$el.addClass('before-transition');

                    self.$el.append( newView.el );

                    // let region know we're transitioning
                    $('body').addClass('views-transitioning');

                    // transition views
                    self.currentView.$el.addClass('transitioning-out');
                    _.delay(function(){
                    newView.$el.removeClass('before-transition').addClass('transitioning-in');
                    }, 0);

                    if( synchonousTransition ) {
                        // self.currentView.$el.on( self.transEndEventName, function (e) {
                        //     if( e.target === e.currentTarget ) {
                                self.cleanOldView( self.currentView );
                                newView.$el
                                    .removeClass('before-transition')
                                    .addClass('transitioning-in');
                        //     }
                        // });

                        // newView.$el.on( self.transEndEventName, function (e) {
                            // if( e.target === e.currentTarget ) {
                                self.cleanNewView( newView );
                        //     }
                        // });

                    } else {

                        _.delay(function(){
                            console.log('0ms delay called');
                            newView.$el
                                .removeClass('before-transition')
                                .addClass('transitioning-in');
                        }, 0);


                        newView.$el.on( self.transEndEventName, function () {
                            console.log('cleaning views called')
                            self.cleanOldView( self.currentView );
                            self.cleanNewView( newView );
                        });

                    }

                // JS transition
                } else {
                    console.log('js trans');
                     // self.currentView.$el.fadeOut(function() {
                     //    self.$el.append( newView.$el.hide() );
                     //    newView.$el.fadeIn(function() {
                            self.cleanOldView( self.currentView );
                            self.cleanNewView( newView );
                     //    });

                     // });

                }


            });

            newView.render();

        },

        cleanOldView: function( view ) {
            view.$el.off(self.transEndEventName);
            view.destroy();
        },

        cleanNewView: function( view ) {
            this.currentView = view;

            view.$el.off(self.transEndEventName);
            $('body').removeClass('views-transitioning');
            this.currentView.$el.removeClass('transitioning-in');

            // Scroll to top of window
            // helpers.scrollTo('body');

            // do the things show would normally do after showing a new view
            Marionette.triggerMethod.call(view, "show");
            Marionette.triggerMethod.call(this, "show", view);
        }

    });
});
