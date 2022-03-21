const array2Br = (array) => {
  if (typeof array !== 'object' || Array.isArray(array) === false) {
    throw new TypeError(`Expected array got ${typeof array}: ${array}`);
  }

  return array.join('<br />');
};

module.exports = array2Br;
