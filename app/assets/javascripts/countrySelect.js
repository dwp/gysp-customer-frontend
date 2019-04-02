var maxCountries = 3;

var url = window.location.pathname;

function countryCheckHasRemoveLink(element) {
  if ($(element).find('a').length === 0) {
    addRemoveCountryLink(element);
  }
}

function countryAddLink() {
  if ($('.country-wrapper.js-hidden').length !== 0) {
    if ($('#show-country').length === 0) {
    	var addCountry= $('#add-country');
    	var linkText= addCountry.data("link-text");
    	addCountry.append('<a href="#" id="show-country" class="govuk-link govuk-!-font-size-19">'+linkText+'</a>');
    }
  }
}

function countryCheckRemoveLinks() {
  if ($('div.country-wrapper:not(".js-hidden")').length !== 1) {
    $('div.country-wrapper:not(".js-hidden") label').each(function () {
      addRemoveCountryLink(this);
    });
  }
}

function countryShowNext() {
  var element = $('.country-wrapper.js-hidden:first label');
  var form = element.closest('form');
  var isOverseas = form.data('overseas');
  var gaLabel = isOverseas ? 'where-have-you-lived-add-country' : 'add-country';
  GOVUK.performance.sendGoogleAnalyticsEvent(url, 'link', gaLabel);
  addRemoveCountryLink($('.country-wrapper.js-hidden:first label'));
  $('.country-wrapper.js-hidden:first').removeClass('js-hidden');
}

function countryCheckMin() {
  if ($('.country-wrapper.js-hidden').length === maxCountries) {
    $('div[id="country-name[0]-wrapper"] .govuk-form-group label a').remove();
  }
}
function countryReorderList(blockID) {
  var countryIndex = 0;
  if (blockID !== undefined) {
    countryIndex = $('div[id="' + blockID + '"]').data('index');
  }
  $('select.govuk-select option:selected').each(function (index) {
    if (index > countryIndex) {
      var prevIndex = (index - 1);
      $('input[id="country-name[' + prevIndex + ']-input"]').val($(this).text());
      $('div[id="country-name[' + prevIndex + ']"]-wrapper .govuk-form-group').removeClass('govuk-form-group--error');
      $('select[id="country-name[' + prevIndex + ']"]').val($(this).text()).change();
    }
  });
}

function removeCountry(element) {
  var form = $(element).closest('form');
  var isOverseas = form.data('overseas');
  var gaLabel = isOverseas ? 'where-have-you-lived-remove-country' : 'remove-country';
  GOVUK.performance.sendGoogleAnalyticsEvent(url, 'link', gaLabel);
  // if remove is last element them hide
  var blockID = $(element).parent().parent().parent().attr('id');
  var lastElementID = $('div.country-wrapper:not(".js-hidden")').last().attr('id');
  if (blockID === lastElementID) {
    resetValueLast();
    $('div[id="' + blockID + '"]').addClass('js-hidden');
  } else {
    countryReorderList(blockID);
    resetValueLast();
    $('div[id="' + lastElementID + '"]').addClass('js-hidden');
  }
  $('.js-error div').remove();
  // else switch around elements
  countryCheckMin();
  countryAddLink();
}

function addRemoveCountryLink(element) {
	var form = $(element).closest('form');
	var linkText = form.data('link-text-remove');
  if ($(element).find('a').length === 0) {
    $(element).append(' <a href="#" id="remove-link" class="govuk-link govuk-!-font-weight-regular remove-link">'+linkText+'</a>');
  }
}

function countryCheckMax() {
  if ($('.country-wrapper.js-hidden').length === 0) {
    $('#show-country').remove();
  }
}

function resetValueLast() {
  $('div.country-wrapper:not(".js-hidden") div').removeClass('govuk-form-group--error');
  $('div.country-wrapper:not(".js-hidden") .govuk-error-message').remove();
  $('div.country-wrapper:not(".js-hidden") input').last().val('');
  $('div.country-wrapper:not(".js-hidden") select option:selected').last().attr('selected', false);
}

function validateEmpty(e) {
  var invalid = 0;
  var input = $('.country-wrapper:not(".js-hidden") input');
  var form = input.closest('form');
  var errorTitle = form.data('error-title');
  var errorDescription = form.data('error-description');
  var errorMessage = form.data('empty-error-messages');
  var isOverseas = form.data('overseas');
  var errorSummaryMessages = [];

  input.each(function (index) {
    $('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group span.govuk-error-message').remove();
    if ($(this).val() === '') {
      invalid++;
      $('<span class="govuk-error-message">' + errorMessage[1] + '</span>').insertAfter('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group label');
      $('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group').addClass('govuk-form-group--error');
      errorSummaryMessages.push({
        id: 'country-name[' + index + ']-input',
        text: errorMessage[0] + ' - ' + errorMessage[1]
      });
    } else {
      $('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group').removeClass('govuk-form-group--error');
    }
  });
  if (invalid === 0) {
    validateDuplicates(e);
  } else {
    e.preventDefault();
    var gaLabel = isOverseas ? 'where-have-you-lived-country-name' : 'country-name';
    GOVUK.performance.sendGoogleAnalyticsEvent(url, 'error', gaLabel);
    var html = errorSummary(errorTitle, errorDescription, errorSummaryMessages);
    $('.js-error').html(html);
    $('.govuk-error-summary').focus();
  }
}

function validateDuplicates(e) {
  var invalid = 0;
  var countries = [];
  var input = $('.country-wrapper:not(".js-hidden") input');
  var form = input.closest('form');
  var errorTitle = form.data('error-title');
  var errorDescription = form.data('error-description');
  var errorMessage = form.data('duplicate-error-messages');
  var errorMessage1 = errorMessage[1];
  var isOverseas = form.data('overseas');

  var errorSummaryMessages = [];
  input.each(function (index) {
    $('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group span.govuk-error-message').remove();
    if ($.inArray($(this).val(), countries) >= 0) {
      invalid++;
      $('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group').addClass('govuk-form-group--error');
      $('<span class="govuk-error-message">' + errorMessage[1] + '</span>').insertAfter('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group label');
      errorSummaryMessages.push({
        id: 'country-name[' + index + ']-input',
        text: errorMessage[0] + ' - ' + errorMessage[1]
      });
    } else {
      $('div[id="country-name[' + index + ']-wrapper"] .govuk-form-group').removeClass('govuk-form-group--error');
    }
    countries.push($(this).val());
  });
  if (invalid !== 0) {
    e.preventDefault();
    var gaLabel = isOverseas ? 'where-have-you-lived-country-name' : 'country-name';
    GOVUK.performance.sendGoogleAnalyticsEvent(url, 'error', gaLabel);
    errorMessage[1] = errorMessage1;
    var html = errorSummary(errorTitle, errorDescription, errorSummaryMessages);
    $('.js-error').html(html)
    $('.govuk-error-summary').focus();
  }
}

function countryEvent() {
  var isOverseas = $('form').data('overseas');
  var gaLabel = isOverseas ? 'where-have-you-lived-country-name' : 'country-name';
  GOVUK.performance.sendGoogleAnalyticsEvent(url, 'clicked-box', gaLabel);
}

function updateAutocompleteValue() {
  $('form').find('input.govuk-select').attr('autocomplete', 'stop-autocomplete');
}

function countrySetup() {
  countryAddLink();
  countryCheckRemoveLinks();
  updateAutocompleteValue();
}

$(window).load(function () {
  $('select').selectToAutocomplete();
  countrySetup();
  $(document).on('click touchend', function (e) {
    // add country
    if (e.target.id === 'show-country') {
      e.preventDefault();
      countryCheckHasRemoveLink($('div[id="country-name[0]-wrapper"] .govuk-form-group label'));
      countryShowNext();
      countryCheckMax();
      return false;
    }

    // remove country
    if (e.target.id === 'remove-link') {
      removeCountry(e.target);
      return false;
    }

    // validate page
    if (e.target.id === 'form-submit') {
      validateEmpty(e);
    }
  });
});

function errorSummary(title, description, messages) {
  var html = '<div class="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabindex="-1" data-module="error-summary">';
      html += '<h2 class="govuk-error-summary__title" id="error-summary-title">' + title + '</h2>';
      html += '<div class="govuk-error-summary__body">' +
              '<p>' + description + '</p>' +
              '<ul class="govuk-list govuk-error-summary__list">';
              for (i = 0; i < messages.length; i++) {
                html += '<li class="govuk-error-message"><a href="#' + messages[i].id + '">' + messages[i].text + '</a></li>';
              }
      html += '</ul></div></div>';

  return html;
}
