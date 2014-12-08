jQuery(document).ready(function ($) {

  function syncValidationLabels() {
    var $validated = $('.input-text');

    // Only watch validation items if required
    if (!$validated.length) return;

    // As to save on DOM rendering, we will grab and cache some things
    $validated.each(function () {
      $(this).data('label', $(this).parent().prev('label'));
    });

    // Every second, we'll check and update wrapper classes for input elements
    setInterval(function () {
      $validated.each(function () {
        $(this).data('label')[$(this).hasClass('validation-failed') ? 'addClass' : 'removeClass']('error');
      });
    }, 1000);
  }

  function equaliseProductListings() {

    // Firstly, we need to put all of the products into
    // the one grid list so they can be compared
    var $productsInlisting = $('.category-products .item');

    if (!$productsInlisting.length) return;

    // Add a watch class
    $productsInlisting.attr('data-equalizer-watch', '');

    var $newListing = $('<ul class="products-grid" data-equalizer></ul>');
    $newListing.append($('.products-grid > .item'));

    $('.category-products .products-grid').last().after($newListing);
    $('.category-products .products-grid').not($newListing).remove();
  }

  // Prepare some supporting JavaScript
  syncValidationLabels();
  equaliseProductListings();

  // Kickstart Foundation (must be after we prepare product listings)
  $(document).foundation({
    equalizer: {
      equalize_on_stack: true
    }
  });
});
