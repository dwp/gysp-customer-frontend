const BLACK_LISTED_URLS = {
  'kbv-questions': [
    'security-question-*',
  ].map((page) => new RegExp(page)),
  'account-details': [
    'account-details',
    'account-details-overseas',
  ].map((page) => new RegExp(page)),
};

const cleanPath = (url) => {
  if (url) {
    const urlParts = url.split('/');
    if (urlParts.length > 0) {
      return urlParts[urlParts.length - 1];
    }
  }
  return url;
};

const blackListedPagesAfterKBV = Object.keys(BLACK_LISTED_URLS).flatMap((sectionName) => BLACK_LISTED_URLS[sectionName]);

const isAccessingRestrictedPaths = (currentPath, pages) => pages.filter((page) => page.test(currentPath)).length > 0;

const middleware = (req, res, next) => {
  const { kbvAnswered: transunionKbvAnswered, accountDetailsEntered } = req.session;
  const currentPath = cleanPath(req.path);
  if (transunionKbvAnswered && isAccessingRestrictedPaths(currentPath, blackListedPagesAfterKBV)) {
    return res.redirect('cannot-go-back-to-questions');
  }

  if (accountDetailsEntered && isAccessingRestrictedPaths(currentPath, BLACK_LISTED_URLS['account-details'])) {
    return res.redirect('cannot-go-back');
  }

  return next();
};

module.exports = middleware;
