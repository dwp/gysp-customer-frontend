const cleanSortCode = (sortCode) => {
  if (sortCode && typeof sortCode === 'string') {
    return sortCode.replace(/\s/g, '').replace(/-/g, '');
  }
  return sortCode;
};

module.exports = {
  cleanSortCode,
};
