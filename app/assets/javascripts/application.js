$(window).load(function() {
  $('form').on('submit', function(event) {
    $('input[type=submit], button[id=form-submit]', this).each(function() {
      var $button = $(this);
      // only disable button if they contain 'double-submit-protect' data attribute
      if ($button.data('double-submit-protect')) {
        $button.prop('disabled', true);
        $button.prop('aria-disabled', true);
        $button.addClass('govuk-button--disabled');
        $button.parent().attr('tabindex', '-1').focus(); // this is so page is not re-read in JAWS
      }
    });
  });
});
