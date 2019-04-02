module.exports = {
  toObject(gender, formDateOfBirth) {
    const json = { gender, dob: `${formDateOfBirth.dateYear}-${formDateOfBirth.dateMonth}-${formDateOfBirth.dateDay}T00:00:00.000Z` };
    return json;
  },
};
