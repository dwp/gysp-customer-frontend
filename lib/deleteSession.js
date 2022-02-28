const safeDelete = (req, key) => {
  if (req.session[key] !== undefined) {
    delete req.session[key];
  }
};

module.exports = {
  afterCountryIndex(req, key, index) {
    if (index === 0) {
      this.deleteCountryDetailsByIndex(req, key, 1);
      this.deleteCountryDetailsByIndex(req, key, 2);
      this.deleteCountryDetailsByIndex(req, key, 3);
    } else if (index === 1) {
      this.deleteCountryDetailsByIndex(req, key, 2);
      this.deleteCountryDetailsByIndex(req, key, 3);
    } else if (index === 2) {
      this.deleteCountryDetailsByIndex(req, key, 3);
    }
    this.afterKey(req, key);
  },
  deleteCustomerFormData(req) {
    this.afterKey(req, 'all');
  },
  afterKey(req, key) {
    if (key === 'all') {
      this.deletePrison(req);
      this.deleteLivedAbroad(req);
      this.deleteLivedAbroadCountries(req);
      this.deleteLivedAbroadCountriesDetails(req);
      this.deleteWorkedAbroad(req);
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAltFormats(req);
      this.deleteAccountDetails(req);
      this.deleteTransunionKBVRelatedData(req);
      this.deletePersonalData(req);
      this.deleteConfirmIdentity(req);
      this.deleteVerifyDetails(req);
    }
    if (key === 'dob-details') {
      this.deleteClaimFromDate(req);
      this.deletePrison(req);
      this.deleteLivedAbroad(req);
      this.deleteLivedAbroadCountries(req);
      this.deleteLivedAbroadCountriesDetails(req);
      this.deleteWorkedAbroad(req);
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteContact(req);
      this.deleteAltFormats(req);
      this.deleteAccountDetails(req);
      this.deletePersonalData(req);
      this.deleteConfirmIdentity(req);
      this.deleteVerifyDetails(req);
    }
    if (key === 'verify') {
      this.deleteDob(req);
      this.deleteClaimFromData(req);
      this.deletePrison(req);
      this.deleteLivedAbroad(req);
      this.deleteLivedAbroadCountries(req);
      this.deleteLivedAbroadCountriesDetails(req);
      this.deleteWorkedAbroad(req);
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAltFormats(req);
      this.deleteAccountDetails(req);
      this.deleteTransunionKBVRelatedData(req);
      this.deletePersonalData(req);
      this.deleteConfirmIdentity(req);
      this.deleteVerifyDetails(req);
      this.deleteNiStatus(req);
      this.deleteCustomerDetails(req);
      this.deleteEditSection(req);
      this.deleteSystemData(req);
    }

    if (key === 'prison') {
      this.deleteLivedAbroad(req);
      this.deleteLivedAbroadCountries(req);
      this.deleteLivedAbroadCountriesDetails(req);
      this.deleteWorkedAbroad(req);
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAltFormats(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'lived-abroad') {
      this.deleteLivedAbroadCountries(req);
      this.deleteLivedAbroadCountriesDetails(req);
      this.deleteWorkedAbroad(req);
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAltFormats(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'lived-abroad-countries') {
      this.deleteLivedAbroadCountriesDetails(req);
      this.deleteWorkedAbroad(req);
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAltFormats(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'lived-abroad-countries-details') {
      this.deleteWorkedAbroad(req);
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAltFormats(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'worked-abroad') {
      this.deleteWorkedAbroadCountries(req);
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'worked-abroad-countries') {
      this.deleteWorkedAbroadCountriesDetails(req);
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'worked-abroad-countries-details') {
      this.deletePartnerStatus(req);
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'marital-select') {
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAccountDetails(req);
    }

    if (key.includes('marital-date-')) {
      this.deletePartnerDetails(req);
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAccountDetails(req);
    }

    if (key.includes('marital-partner-')) {
      this.deleteBenefits(req);
      this.deleteContact(req);
      this.deleteAccountDetails(req);
    }

    if (key === 'benefits') {
      this.deleteContact(req);
      this.deleteAccountDetails(req);
    }

    if (key.includes('contact-details')) {
      this.deleteAccountDetails(req);
    }
  },
  bySection(req, key, details) {
    if (key === 'lived-abroad') {
      if (details.livedAbroad === 'no') {
        this.deleteLivedAbroadCountries(req);
        this.deleteLivedAbroadCountriesDetails(req);
      }
    }
    if (key === 'worked-abroad') {
      if (details.workedAbroad === 'no') {
        this.deleteWorkedAbroadCountries(req);
        this.deleteWorkedAbroadCountriesDetails(req);
      }
    }
    if (key === 'marital-select') {
      this.deletePartnerDate(req);
      this.deletePartnerDetails(req);
    }
  },
  deleteCountryDetailsByIndex(req, key, index) {
    if (req.session[key][index] !== undefined) {
      delete req.session[key][index].data;
    }
  },
  deleteDob(req) {
    if (req.session['dob-details'] !== undefined) {
      delete req.session['dob-details'];
    }
  },
  deleteClaimFromData(req) {
    if (req.session.claimFromDate !== undefined) {
      delete req.session.claimFromDate;
    }
  },
  deletePrison(req) {
    if (req.session.prison !== undefined) {
      delete req.session.prison;
    }
  },
  deleteLivedAbroad(req) {
    if (req.session['lived-abroad'] !== undefined) {
      delete req.session['lived-abroad'];
    }
  },
  deleteLivedAbroadCountries(req) {
    if (req.session['lived-abroad-countries'] !== undefined) {
      delete req.session['lived-abroad-countries'];
    }
  },
  deleteLivedAbroadCountriesDetails(req) {
    if (req.session['lived-abroad-countries-details'] !== undefined) {
      delete req.session['lived-abroad-countries-details'];
    }
  },
  deleteWorkedAbroad(req) {
    if (req.session['worked-abroad'] !== undefined) {
      delete req.session['worked-abroad'];
    }
  },
  deleteWorkedAbroadCountriesDetails(req) {
    if (req.session['worked-abroad-countries-details'] !== undefined) {
      delete req.session['worked-abroad-countries-details'];
    }
  },
  deleteWorkedAbroadCountries(req) {
    if (req.session['worked-abroad-countries'] !== undefined) {
      delete req.session['worked-abroad-countries'];
    }
  },
  deletePartnerStatus(req) {
    if (req.session['marital-select'] !== undefined) {
      delete req.session['marital-select'];
    }
  },
  deletePartnerDate(req) {
    if (req.session['marital-date-married'] !== undefined) {
      delete req.session['marital-date-married'];
    }
    if (req.session['marital-date-civil'] !== undefined) {
      delete req.session['marital-date-civil'];
    }
    if (req.session['marital-date-widowed'] !== undefined) {
      delete req.session['marital-date-widowed'];
    }
    if (req.session['marital-date-divorced'] !== undefined) {
      delete req.session['marital-date-divorced'];
    }
    if (req.session['marital-date-dissolved'] !== undefined) {
      delete req.session['marital-date-dissolved'];
    }
  },
  deletePartnerDetails(req) {
    if (req.session['marital-partner-married'] !== undefined) {
      delete req.session['marital-partner-married'];
    }
    if (req.session['marital-partner-civil'] !== undefined) {
      delete req.session['marital-partner-civil'];
    }
    if (req.session['marital-partner-widowed'] !== undefined) {
      delete req.session['marital-partner-widowed'];
    }
    if (req.session['marital-partner-divorced'] !== undefined) {
      delete req.session['marital-partner-divorced'];
    }
    if (req.session['marital-partner-dissolved'] !== undefined) {
      delete req.session['marital-partner-dissolved'];
    }
  },
  deleteBenefits(req) {
    if (req.session.benefits !== undefined) {
      delete req.session.benefits;
    }
  },
  deleteContact(req) {
    if (req.session['contact-details'] !== undefined) {
      delete req.session['contact-details'];
    }
  },
  deleteAltFormats(req) {
    if (req.session['alt-formats'] !== undefined) {
      delete req.session['alt-formats'];
    }

    if (req.session['alt-formats-choose'] !== undefined) {
      delete req.session['alt-formats-choose'];
    }
  },
  deleteAccountDetails(req) {
    if (req.session['account-details'] !== undefined) {
      delete req.session['account-details'];
    }
    if (req.session['account-details-overseas'] !== undefined) {
      delete req.session['account-details-overseas'];
    }
    safeDelete(req, 'accountStatus');
  },
  deleteTransunionKBVRelatedData(req) {
    const questions = [1, 2, 3];
    questions
      .map((questionNum) => `security-question-${questionNum}`)
      .forEach((key) => safeDelete(req, key));
    safeDelete(req, 'kbvFlag');
    safeDelete(req, 'kbvPassed');
    safeDelete(req, 'kbvAnswered');
    safeDelete(req, 'kbvQuestions');
    safeDelete(req, 'translatedKbvQuestions');
  },
  deletePersonalData(req) {
    if (req.session['personal-data'] !== undefined) {
      delete req.session['personal-data'];
    }
  },
  deleteConfirmIdentity(req) {
    if (req.session['confirm-identity'] !== undefined) {
      delete req.session['confirm-identity'];
    }
  },
  deleteVerifyDetails(req) {
    if (req.session['verify-details'] !== undefined) {
      delete req.session['verify-details'];
    }
  },
  deleteNiStatus(req) {
    if (req.session.isNorthernIreland !== undefined) {
      delete req.session.isNorthernIreland;
    }
  },
  deleteClaimFromDate(req) {
    if (req.session.claimFromDate !== undefined) {
      delete req.session.claimFromDate;
    }
  },
  deleteSystemData(req) {
    if (req.session.userPassedAuth !== undefined) {
      delete req.session.userPassedAuth;
    }
    if (req.session.isOverseas !== undefined) {
      delete req.session.isOverseas;
    }
    if (req.session.inviteKey !== undefined) {
      delete req.session.inviteKey;
    }
    if (req.session.inviteKeyHash !== undefined) {
      delete req.session.inviteKeyHash;
    }
    if (req.session.userDateOfBirthInfo !== undefined) {
      delete req.session.userDateOfBirthInfo;
    }
    if (req.session.isBeforeSpa !== undefined) {
      delete req.session.isBeforeSpa;
    }
    if (req.session.isInviteCodeLogin !== undefined) {
      delete req.session.isInviteCodeLogin;
    }
    if (req.session.userHasCompleted !== undefined) {
      delete req.session.userHasCompleted;
    }
    if (req.session.redirectComplete !== undefined) {
      delete req.session.redirectComplete;
    }
  },
  deleteCustomerDetails(req) {
    if (req.session.customerDetails !== undefined) {
      delete req.session.customerDetails;
    }
  },
  deleteEditSection(req) {
    if (req.session.editSection !== undefined) {
      delete req.session.editSection;
    }
    if (req.session.editSectionChanged !== undefined) {
      delete req.session.editSectionChanged;
    }
    if (req.session.editSectionShowError !== undefined) {
      delete req.session.editSectionShowError;
    }
  },
  destroySessionExcludingLangauge(req) {
    this.afterKey(req, 'all');
    this.deleteDob(req);
    this.deleteClaimFromData(req);
    this.deleteCustomerDetails(req);
    this.deleteEditSection(req);
    this.deleteSystemData(req);
  },
};
