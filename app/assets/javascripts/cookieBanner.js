
var banner = document.querySelector('.govuk-cookie-banner');
var accept, reject, hide;

var ONE_YEAR = 365;

function setCookie(name, value, days) {
  var expDays = 1 || days;
  var date = new Date();
  var expires = '';
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  expires = '; expires=' + date.toUTCString();
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function handleConcent(consent) {
  var consentCookieName =  banner.getAttribute('data-consent-cookie-name');
  // Set all banner messages to hidden
  banner.querySelector('.govuk-cookie-banner__message').hidden = true;

  var confirmation = banner.querySelector('.cookie-banner__message--' + consent);

  // Unhide confirmation message
  confirmation.hidden = false;

  // Add focus to confirmation message
  confirmation.focus();

  setCookie(consentCookieName, consent, ONE_YEAR);
}

function handleAcceptClick(event) {
  var googleAnalyticsTrackingID = banner.getAttribute('data-ga-id');
  var googleAnalyticsDomain = banner.getAttribute('data-ga-domain');
  initGoogleAnalytics(googleAnalyticsTrackingID, googleAnalyticsDomain);
  handleConcent('yes');
  event.preventDefault();
}

function handleRejectClick(event) {
  handleConcent('no');
  event.preventDefault();
}

function handleHideClick(event) {
  banner.hidden = true;
  event.preventDefault();
}

function initGoogleAnalytics(gaTrackingId, gaDomain) {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', gaTrackingId, gaDomain);
  ga('set', 'anonymizeIp', true);
  ga('send', 'pageview');
  ga('set', 'nonInteraction', true);
}

function init() {
  if (!banner) {
    return;
  }
  banner.hidden = false;
  accept = banner.querySelector('.cookie-banner__button--accept');
  reject = banner.querySelector('.cookie-banner__button--reject');
  hide = banner.querySelectorAll('.cookie-banner__button--hide');
  accept.addEventListener('click', handleAcceptClick.bind(this));
  reject.addEventListener('click', handleRejectClick.bind(this));
  hide.forEach(function(item) {
    item.addEventListener('click', handleHideClick.bind(this));
  });
}

init();
