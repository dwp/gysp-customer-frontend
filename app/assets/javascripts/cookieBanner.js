
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
  var gtmContainerId = banner.getAttribute('data-gtm-container-id');
  initGoogleTagManager(gtmContainerId);
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

function initGoogleTagManager(gtmContainerId) {
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer', gtmContainerId);
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
