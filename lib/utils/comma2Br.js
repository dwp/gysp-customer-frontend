const comma2Br = (string) => {
  if (typeof string !== 'string') {
    throw new TypeError(`Expected string got ${typeof string}: ${string}`);
  }

  return string.replace(/,/gi, '<br />');
};

module.exports = comma2Br;
