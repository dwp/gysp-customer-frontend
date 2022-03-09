const redirectHelper = require('../lib/helpers/redirectHelper');

function allowedPaths(key, path, mountUrl) {
  const pathRegx = new RegExp(mountUrl, 'g');
  const pathNoMountUrl = path.replace(pathRegx, '/');
  const defaultPaths = [
    '/invitation-code',
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
      '/about-your-civil-partner',
      '/about-your-ex-spouse',
      '/about-your-ex-partner',
      '/about-your-late-spouse']).includes(pathNoMountUrl);
  }

  if (key === 'lived-abroad') {
    const matches = defaultPaths.concat([
      /have-you-ever-lived-outside-of-the-uk/,
      /where-have-you-lived-outside-the-uk/,
      /when-did-you-live-in-[a-z]*/,
      /what-countries-have-you-lived-in/,
    ]).filter((pattern) => new RegExp(pattern).test(pathNoMountUrl));

    return matches.length > 0;
  }

  if (key === 'worked-abroad') {
    const matches = defaultPaths.concat([
      /have-you-worked-outside-of-the-uk/,
      /where-have-you-worked-outside-the-uk/,
      /when-did-you-work-in-[a-z]*/,
      /what-countries-have-you-worked-in/,
    ]).filter((pattern) => new RegExp(pattern).test(pathNoMountUrl));

    return matches.length > 0;
  }

  if (key === 'alt-formats') {
    return defaultPaths.concat([
      '/alt-formats',
      '/alt-formats-choose']).includes(pathNoMountUrl);
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
    case 'alt-formats':
      return true;
    default:
      return false;
  }
}

function detectSectionChangedAndDisallowedRoute(req, mountUrl) {
  if (req.session.editSection
    && req.session.editSectionChanged
    && protectedSection(req.session.editSection)
    && !allowedPaths(req.session.editSection, req.path, mountUrl)) {
    return true;
  }
  return false;
}

module.exports = (mountUrl) => (req, res, next) => {
  // NB: When you navigate up to check-your-details page filling in mandatory/non-mandatory fields,
  //     then
  //     - click on any of the "Change" links in that page and then get to a section,
  //     - but not fill in relevant data in that section (especially in multi-page sub-sections,
  //       like marital-status, alt-formats)
  //     - and then try to navigate back using browser back button to get to check-your-details page.
  //     the user should be stopped from leaving data in session inconsistent (i.e partial data).
  //
  //     This middleware stops that by,
  //     - checking if the user has come from check-your-details page,
  //     - and edited any part of multi-page journey (like saying married in marital
  //       status but not filling in spouse details and clicking back button)
  //     - then it clears the session details for that sub-section and redirects user to the start
  //       of that sub-section with data required error. When data is cleared the empty session details
  //       are validated as well, so that data required errors could be manufactured on the fly.
  if (detectSectionChangedAndDisallowedRoute(req, mountUrl)) {
    req.session.editSectionShowError = true;
    const redirectUri = redirectHelper.redirectBasedOnEditSection(req.session.editSection);
    res.redirect(redirectUri);
  } else {
    next();
  }
};
