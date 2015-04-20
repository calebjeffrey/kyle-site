define(function(require, exports, module) {
    var Marionette = require('marionette'),
        ArtItemView = require('app/views/ArtItemView'),
        helpers = require('app/utils/helpers'),
        vent = require('app/vent');

    return Marionette.CollectionView.extend({

        childView: ArtItemView,

        className: 'grid',

        initialize: function(options) {
            $(window).on('resize', _.bind(this.wrapItems, this));
        },

        onShow: function() {
            this.gridItems = $('.item');
            this.wrapItems();
        },

        wrapItems: function() {
            var winWidth = $(window).width();

            if (this.gridItems.eq(0).parent().hasClass('column')) {
                this.gridItems.unwrap();
            }

            if (winWidth < 480) {
                helpers.wrapItems(this.gridItems);
            } else if (winWidth >= 480 && winWidth <= 767) {
                helpers.makeTwoColumns(this.gridItems);
            } else {
                helpers.makeThreeColumns(this.gridItems);
            }
        },

        onDestroy: function() {
            $(window).off('resize.gallery');
        }

    });
});
