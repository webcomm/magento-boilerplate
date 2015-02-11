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

    // Add equalizer attributs to all product in listings
    $('.products-grid').attr('data-equalizer', '');
    $('.products-grid .item').attr('data-equalizer-watch', '');
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
