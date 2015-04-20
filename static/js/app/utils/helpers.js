define(function(require, exports, module) {
    var $ = require('jquery'),
        Backbone = require('backbone'),
        body = $('body'),
        app = $('.app');

    velocity = require('jquery.velocity');

    exports.toggleBodyClass = function(classList) {
        body.toggleClass(classList);
    };

    exports.addBodyClass = function(classList) {
        body.addClass(classList);
    };

    exports.removeBodyClass = function(classList) {
        body.removeClass(classList);
    };

    exports.setBackgroundGridHeight = function() {
        var appHeight = $('.app').outerHeight(true);
        var grid = $('.grid.bg');
        grid.css('height', appHeight);
    };

    exports.setWindowHeight = function(target) {
        var winHeight = Modernizr.touch ? window.screen.availHeight : window.innerHeight;
        $(target).css('height', winHeight);
    };

    exports.resizeBackgroundGridHeight = function() {
        $(window).on('resize.gridHeight', exports.setBackgroundGridHeight);
    };

    exports.removePageClasses = function() {
        body.removeClass(function(index, css) {
            return (css.match(/\bpage-\S+/g) || []).join(' ');
        });
    };

    exports.camelToDash = function(str) {
        return str.replace(/\W+/g, '-')
            .replace(/([a-z\d])([A-Z])/g, '$1-$2');
    };

    exports.dashToTitleCase = function(str) {
        return str.replace(/\b[\w']+\b/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }).replace(/\-+/g, '');
    };

    exports.prefixedTransEnd = (function() {
        var transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        };
        return transEndEventNames[Modernizr.prefixed('transition')];
    })();

    exports.prefixedTransform = (function() {
        var str = Modernizr.prefixed('transform');
        str = str.replace(/([A-Z])/g, function(str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
        return str;
    })();

    exports.isMobile = function() {
        var mobile = (/silk|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
        if (mobile) {
            var body = document.body;
            body.className = body.className + " is-mobile";
        }
    };

    exports.wrapItems = function(array) {
        var wrapperHtml = '<div class="column"></div>';
        array.wrapAll($(wrapperHtml));
    };

    exports.makeTwoColumns = function(array) {
        var temp = [],
            content = [[], []],
            wrapperHtml = '<div class="column"></div>';

        for (var i = 0; i < array.length; i++) {
            var elem = array[i];

            if (i % 2 === 0) {
                content[0].push(elem);
            } else {
                content[1].push(elem);
            }
        }

        $.each(content, function (i) {
            $(this).wrapAll($(wrapperHtml));
        });
    };

    exports.makeThreeColumns = function(array) {
        var temp = [],
            content = [[], [], []],
            wrapperHtml = '<div class="column"></div>';

        for (var i = 0; i < array.length; i++) {
            var elem = array[i];

            if (i === 0) {
                content[0].push(elem);
            } else if (i % 2 === 0 && i % 3 !== 0) {
                content[0].push(elem);
            } else if (i % 3 === 0 ) {
                content[2].push(elem);
            } else {
                content[1].push(elem);
            }
        }

        $.each(content, function (i) {
            $(this).wrapAll($(wrapperHtml));
        });
    };

    exports.scrollTo = function(target, jump) {

        var targetOffset = $(target).offset().top;

        if (jump || Modernizr.touch) {
            body.scrollTop(targetOffset);
        } else {
            body.velocity('scroll', {
                duration: 600,
                easing: 'easeInOutCubic',
                offset: targetOffset
            });
        }

    };

    exports.createArtCollections = function(artCollection, galleries) {
        var artCollections = {},
            i = 0,
            len = galleries.length,
            gallery;

        for (i = 0; i < len; i++) {
            gallery = galleries.models[i].get('title');
            artCollections[gallery] = new Backbone.Collection(artCollection.where({
                'type': gallery
            }));
        }

        return artCollections;

    };

    return exports;
});
