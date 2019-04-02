const express = require('express');
const livedFunctions = require('./lived/functions');
const workedFunctions = require('./worked/functions');

const router = new express.Router();

router.get('/have-you-ever-lived-outside-of-the-uk', livedFunctions.livedAbroadGet);
router.post('/have-you-ever-lived-outside-of-the-uk', livedFunctions.livedAbroadPost);

router.get('/when-did-you-live-in-:country', livedFunctions.whenDidYouLiveGet);
router.post('/when-did-you-live-in-:country', livedFunctions.whenDidYouLivePost);

router.get('/have-you-worked-outside-of-the-uk', workedFunctions.workedAbroadGet);
router.post('/have-you-worked-outside-of-the-uk', workedFunctions.workedAbroadPost);

router.get('/when-did-you-work-in-:country', workedFunctions.whenDidYouWorkGet);
router.post('/when-did-you-work-in-:country', workedFunctions.whenDidYouWorkPost);

router.get('/what-countries-have-you-lived-in', livedFunctions.whatCountriesHaveYouLivedInCountriesGetCached);
router.post('/what-countries-have-you-lived-in', livedFunctions.whatCountriesHaveYouLivedInCountriesPostCached);

router.get('/what-countries-have-you-worked-in', workedFunctions.whatCountriesHaveYouWorkedInCountriesGetCached);
router.post('/what-countries-have-you-worked-in', workedFunctions.whatCountriesHaveYouWorkedInCountriesPostCached);

router.get('/where-have-you-lived-outside-the-uk', livedFunctions.whatCountriesHaveYouLivedInCountriesGetCached);
router.post('/where-have-you-lived-outside-the-uk', livedFunctions.whatCountriesHaveYouLivedInCountriesPostCached);

module.exports = router;
