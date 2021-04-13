function isEmailAndTelephoneComplete() {
  if (!gaEnabled) {
    return;
  }
  var checkBoxes = 'checkbox';
  if ($("#homeTelephoneNumber").val() !== '') {
    checkBoxes += ' home';
  }
  if ($("#mobileTelephoneNumber").val() !== '') {
    checkBoxes += ' mobile';
  }
  if ($("#workTelephoneNumber").val() !== '') {
    checkBoxes += ' work';
  }
  if (checkBoxes !== 'checkbox') {
    GOVUK.performance.sendGoogleAnalyticsEvent('contact-details', 'submitted-box', checkBoxes);
  }
  if ($("#email").val() !== '') {
    GOVUK.performance.sendGoogleAnalyticsEvent('contact-details', 'submitted-box', 'email');
  }
}

function isRadioOrBankSelected() {
  if (!gaEnabled) {
    return;
  }
  if ($('input[name=paymentMethod]:checked').val() !== '') {
    GOVUK.performance.sendGoogleAnalyticsEvent('account-details', 'submitted-radio', $('input[name=paymentMethod]:checked').val());
  }
}

function isPersonalDataSubmitClicked() {
  if (!gaEnabled) {
    return;
  }
  if ($('input[name=personalDataPermission]:checked').val() !== '') {
    GOVUK.performance.sendGoogleAnalyticsEvent('personal-data', 'submitted-radio', $('input[name=personalDataPermission]:checked').val());
  }
}

// HMRC Session Timeout Dialog
var $TimeoutDialog = document.querySelector('meta[name="hmrc-timeout-dialog"]');
if ($TimeoutDialog) {
  new TimeoutDialog($TimeoutDialog).init();
}

$(window).load(function() {

  if (gaEnabled) {
    GOVUK.performance.stageprompt.setupForGoogleAnalytics();

    var journeyHelpers = $('[data-journey-events]');

    if (journeyHelpers) {
      journeyHelpers.each(function() {
      var events = GOVUK.performance.stageprompt.splitAction($(this).attr('data-journey-events'));
        GOVUK.performance.sendGoogleAnalyticsEvent(events[0],events[1],events[2]);
      });
    }
  }

  $('form').on('submit', function(event) {
    $('input[type=submit], button[id=form-submit]', this).each(function() {
      var $button = $(this);
      if ($button.data('ga-check') === 'check-if-contact-page') {
        isEmailAndTelephoneComplete();
      }

      if ($button.data('ga-check') === 'check-if-bank-page') {
        isRadioOrBankSelected();
      }

      if ($button.data('ga-check') === 'check-if-personal-data-page') {
        isPersonalDataSubmitClicked();
      }
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
