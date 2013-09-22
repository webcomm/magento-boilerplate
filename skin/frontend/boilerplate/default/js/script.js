jQuery.noConflict();
;(function($) {
    'use strict';

    function Site(settings) {

        this.windowLoaded = false;

    }

    Site.prototype = {
        constructor: Site

        , start: function() {
            var me = this;

            $(window).load(function() {
                me.windowLoaded = true;
            });

            this.attach();
        }

        , attach: function() {
            this.attachMedia();
        }

        , attachMedia: function() {
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
    }

    jQuery(document).ready(function($) {
        var site = new Site();
        site.start();
    });

})(jQuery);
