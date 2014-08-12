/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2011-2014 Webcomm Pty Ltd
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

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
