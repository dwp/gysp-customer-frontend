function countryFormatArray(countries, selectedValue) {
  const countriesArray = countries.map((country) => {
    const countryObject = {
      value: country.name,
      text: country.name,
      attributes: {
        'data-aliases': country.tokens.toString(),
      },
    };

    if (selectedValue !== undefined && country.name === selectedValue) {
      countryObject.selected = true;
    }

    return countryObject;
  });

  // Empty object so select has nothing selected as default
  countriesArray.unshift({});

  return countriesArray;
}

module.exports = {
  formatter(countries, selectedValue) {
    return countryFormatArray(countries, selectedValue);
  },
};
