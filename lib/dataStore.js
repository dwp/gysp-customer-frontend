const deleteSession = require('./deleteSession');

module.exports = {
  get(req, key) {
    return req.session[key];
  },
  getAll(req) {
    return req.session;
  },
  save(req, key, details) {
    req.session[key] = details;
    return true;
  },
  delete(req, key) {
    delete req.session[key];
  },
  checkAndSave(req, key, details, editMode) {
    if (req.session[key] === undefined) {
      req.session[key] = details;
    } else if (JSON.stringify(req.session[key]) !== JSON.stringify(details)) {
      if (editMode) {
        req.session.editSectionChanged = true;
        if (req.session.editSectionShowError) {
          delete req.session.editSectionShowError;
        }
        deleteSession.bySection(req, key, details);
      } else {
        deleteSession.afterKey(req, key);
      }
      req.session[key] = details;
    }
    return true;
  },
  checkAndSaveCountryList(req, key, details, editMode) {
    if (details.length === 0) {
      delete req.session[key];
    } else if (req.session[key] === undefined) {
      req.session[key] = details;
    } else {
      const checkLoop = [];
      if (req.session[key][0] !== undefined) {
        checkLoop[0] = { name: req.session[key][0].name, url: req.session[key][0].url };
      }

      if (req.session[key][1] !== undefined) {
        checkLoop[1] = { name: req.session[key][1].name, url: req.session[key][1].url };
      }

      if (req.session[key][2] !== undefined) {
        checkLoop[2] = { name: req.session[key][2].name, url: req.session[key][2].url };
      }

      if (req.session[key][3] !== undefined) {
        checkLoop[3] = { name: req.session[key][3].name, url: req.session[key][3].url };
      }

      if (JSON.stringify(checkLoop) !== JSON.stringify(details)) {
        if (editMode) {
          req.session[key] = this.rebuildCountryDetailsObject(req, key, details);
        } else {
          deleteSession.afterKey(req, key);
          req.session[key] = details;
        }
      }
    }
    return true;
  },
  checkAndSaveCountryIndividual(req, key, index, details, editMode) {
    if (req.session[key][index].data === undefined) {
      req.session[key][index].data = details;
    } else if (JSON.stringify(req.session[key][index].data) !== JSON.stringify(details)) {
      if (editMode === false) {
        deleteSession.afterCountryIndex(req, key, index);
      }
      req.session[key][index].data = details;
    }
    return true;
  },
  filterAccountDetails(form) {
    const formDetails = form;
    if (form.paymentMethod === 'bank') {
      delete formDetails.buildingAccountHolder;
      delete formDetails.buildingAccountNumber;
      delete formDetails.buildingSortCodeField1;
      delete formDetails.buildingSortCodeField2;
      delete formDetails.buildingSortCodeField3;
      delete formDetails.buildingRoll;
    } else {
      delete formDetails.bankAccountHolder;
      delete formDetails.bankAccountNumber;
      delete formDetails.bankSortCodeField1;
      delete formDetails.bankSortCodeField2;
      delete formDetails.bankSortCodeField3;
    }
    return formDetails;
  },
  filterContactDetails(form) {
    const formDetails = form;
    if (form.cbHomeTelephoneNumber !== 'true') {
      delete formDetails.cbHomeTelephoneNumber;
    }

    if (form.cbMobileTelephoneNumber !== 'true') {
      delete formDetails.cbMobileTelephoneNumber;
    }

    if (form.cbWorkTelephoneNumber !== 'true') {
      delete formDetails.cbWorkTelephoneNumber;
    }

    if (form.cbHomeTelephoneNumber !== 'true') {
      delete formDetails.homeTelephoneNumber;
    }
    if (form.cbMobileTelephoneNumber !== 'true') {
      delete formDetails.mobileTelephoneNumber;
    }
    if (form.cbWorkTelephoneNumber !== 'true') {
      delete formDetails.workTelephoneNumber;
    }
    return formDetails;
  },
  rebuildCountryDetailsObject(req, key, details) {
    const object = details;
    if (req.session[key][0] !== undefined && details[0] !== undefined) {
      const countryDetails = req.session[key].find((element) => element.url === details[0].url);
      if (countryDetails !== undefined) {
        object[0].data = countryDetails.data;
      }
    }

    if (req.session[key][1] !== undefined && details[1] !== undefined) {
      const countryDetails = req.session[key].find((element) => element.url === details[1].url);
      if (countryDetails !== undefined) {
        object[1].data = countryDetails.data;
      }
    }

    if (req.session[key][2] !== undefined && details[2] !== undefined) {
      const countryDetails = req.session[key].find((element) => element.url === details[2].url);
      if (countryDetails !== undefined) {
        object[2].data = countryDetails.data;
      }
    }

    if (req.session[key][3] !== undefined && details[3] !== undefined) {
      const countryDetails = req.session[key].find((element) => element.url === details[3].url);
      if (countryDetails !== undefined) {
        object[3].data = countryDetails.data;
      }
    }
    return object;
  },
};
