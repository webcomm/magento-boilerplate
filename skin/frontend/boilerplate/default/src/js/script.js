jQuery.noConflict();
;(function($) {
    'use strict';

    function Site(settings) {

        this.windowLoaded = false;

    }

    Site.prototype = {
        constructor: Site,

        start: function() {
            var me = this;

            $(window).load(function() {
                me.windowLoaded = true;
            });

            this.attach();
        },

        attach: function() {
            this.attachBootstrapPrototypeCompatibility();
            this.attachMedia();
        },

        attachBootstrapPrototypeCompatibility: function() {

            // Bootstrap and Prototype don't play nice, in the sense that
            // prototype is a really wacky horrible library. It'll
            // hard-code CSS to hide an element when a hide() event
            // is fired. See http://stackoverflow.com/q/19139063
            // To overcome this with dropdowns that are both
            // toggle style and hover style, we'll add a CSS
            // class which has "display: block !important"
            $('*').on('show.bs.dropdown show.bs.collapse', function(e) {
                $(e.target).addClass('bs-prototype-override');
            });

            $('*').on('hidden.bs.collapse', function(e) {
                $(e.target).removeClass('bs-prototype-override');
            });
        },

        attachMedia: function() {
            var $links = $('[data-toggle="media"]');
            if ( ! $links.length) return;

            // When somebody clicks on a link, slide the
            // carousel to the slide which matches the
            // image index and show the modal
            $links.on('click', function(e) {
                e.preventDefault();

                var $link = $(this),
                   $modal = $($link.attr('href')),
                $carousel = $modal.find('.carousel'),
                    index = parseInt($link.data('index'));

                $carousel.carousel(index);
                $modal.modal('show');

                return false;
            });
        }
    };

    jQuery(document).ready(function($) {
        var site = new Site();
        site.start();
    });

})(jQuery);
