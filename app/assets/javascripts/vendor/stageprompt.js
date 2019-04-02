var GOVUK = GOVUK || {};

GOVUK.performance = GOVUK.performance || {};

GOVUK.performance.stageprompt = (function () {

  var setup, setupForGoogleAnalytics, splitAction;

  splitAction = function (action) {
    var parts = action.split(':');
    if (parts.length <= 3) return parts;
    return [parts.shift(), parts.shift(), parts.join(':')];
  };

  setup = function (analyticsCallback, dimensionsCallBack) {
    var journeyStage = $('[data-journey]').attr('data-journey'),
        journeyHelpers = $('[data-journey-click]'),
        dimensionHelpers = $('[data-dimension-click]');

    if (journeyStage) {
      analyticsCallback.apply(null, splitAction(journeyStage));
    }

    journeyHelpers.on('click', function (event) {
      analyticsCallback.apply(null, splitAction($(this).data('journey-click')));
    });

    dimensionHelpers.on('click', function (event) {
      dimensionsCallBack.apply(null, splitAction($(this).data('dimension-click')));
		});
  };

  setupForGoogleAnalytics = function () {
    setup(GOVUK.performance.sendGoogleAnalyticsEvent, GOVUK.performance.sendDimension);
  };

  return {
    setup: setup,
    splitAction: splitAction,
    setupForGoogleAnalytics: setupForGoogleAnalytics
  };
}());

GOVUK.performance.sendGoogleAnalyticsEvent = function (category, event, label) {
  if (window.ga && typeof(window.ga) === 'function') {
    ga('send', 'event', category, event, label);
  } else {
    _gaq.push(['_trackEvent', category, event, label, undefined, true]);
  }
};

GOVUK.performance.sendDimension = function (dimension, category, eventAndLabel) {
  var valueToPass = {};
  var eventsLabelArray = eventAndLabel.split(':');
  if (eventsLabelArray[2]) {
    valueToPass[dimension] = eventsLabelArray[2];
  } else {
    valueToPass[dimension] = eventsLabelArray[1];
  }
	ga('send', 'event', category, eventsLabelArray[0], eventsLabelArray[1], valueToPass);
};
