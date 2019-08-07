const redirectHelper = require('../helpers/redirectHelper');

function allowedPaths(key, path) {
  const defaultPaths = [
    '/confirm-identity',
    '/cookie-policy',
  ];

  if (key === 'marital-select') {
    return defaultPaths.concat([
      '/what-is-your-current-marital-status',
      '/what-date-did-you-get-married',
      '/what-date-was-your-civil-partnership-registered',
      '/what-date-did-you-get-divorced',
      '/what-date-was-your-civil-partnership-dissloved',
      '/what-date-were-you-widowed',
      '/about-your-spouse',
      'about-your-civil-partner',
      'about-your-ex-spouse',
      'about-your-ex-partner',
      'about-your-late-spouse']).includes(path);
  }

  if (key === 'lived-abroad') {
    const matches = defaultPaths.concat([
      /have-you-ever-lived-outside-of-the-uk/,
      /where-have-you-lived-outside-the-uk/,
      /when-did-you-live-in-[a-z]*/,
      /what-countries-have-you-lived-in/,
    ]).filter(pattern => new RegExp(pattern).test(path));

    return matches.length > 0;
  }

  if (key === 'worked-abroad') {
    const matches = defaultPaths.concat([
      /have-you-worked-outside-of-the-uk/,
      /where-have-you-worked-outside-the-uk/,
      /when-did-you-work-in-[a-z]*/,
      /what-countries-have-you-worked-in/,
    ]).filter(pattern => new RegExp(pattern).test(path));

    return matches.length > 0;
  }

  return false;
}

function protectedSection(section) {
  switch (section) {
  case 'marital-select':
    return true;
  case 'lived-abroad':
    return true;
  case 'worked-abroad':
    return true;
  default:
    return false;
  }
}

function detectSectionChangedAndDisallowedRoute(req) {
  if (req.session.editSection
    && req.session.editSectionChanged
    && protectedSection(req.session.editSection)
    && !allowedPaths(req.session.editSection, req.path)) {
    return true;
  }
  return false;
}

module.exports = () => (req, res, next) => {
  if (detectSectionChangedAndDisallowedRoute(req)) {
    req.session.editSectionShowError = true;
    const redirectUri = redirectHelper.redirectBasedOnEditSection(req.session.editSection);
    res.redirect(redirectUri);
  } else {
    next();
  }
};
