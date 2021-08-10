module.exports = {
  extract(url) {
    let domain;
    if (url !== undefined) {
      const [segment1, segment2] = url.split('/').filter((segment) => segment !== '');
      if (url.indexOf('://') > -1) {
        domain = segment2;
      } else {
        domain = segment1;
      }

      const [domainPart1] = domain.split(':');
      domain = domainPart1;
    }
    return domain;
  },
  extractPath(req, url, mountUrl) {
    if (!url) {
      return null;
    }
    const escapeRegExp = (str) => str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1'); // NOSONAR
    const replaceAll = (str, find, replace) => str.replace(new RegExp(escapeRegExp(find), 'g'), replace).replace(new RegExp(mountUrl), '/');
    return replaceAll(url, `${req.protocol}://${req.get('host')}`, '');
  },
};
