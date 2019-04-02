const express = require('express');
const functions = require('./functions');

const router = new express.Router();

router.get('/what-is-your-current-marital-status', functions.maritalSelectGet);
router.post('/what-is-your-current-marital-status', functions.maritalSelectPost);

router.get('/what-date-did-you-get-married', functions.maritalStatusDateGet);
router.post('/what-date-did-you-get-married', functions.maritalStatusDatePost);

router.get('/what-date-did-you-get-divorced', functions.maritalStatusDateGet);
router.post('/what-date-did-you-get-divorced', functions.maritalStatusDatePost);

router.get('/what-date-was-your-civil-partnership-registered', functions.maritalStatusDateGet);
router.post('/what-date-was-your-civil-partnership-registered', functions.maritalStatusDatePost);

router.get('/what-date-was-your-civil-partnership-dissloved', functions.maritalStatusDateGet);
router.post('/what-date-was-your-civil-partnership-dissloved', functions.maritalStatusDatePost);

router.get('/what-date-were-you-widowed', functions.maritalStatusDateGet);
router.post('/what-date-were-you-widowed', functions.maritalStatusDatePost);

router.get('/about-your-spouse', functions.maritalPartnerDetailsGet);
router.post('/about-your-spouse', functions.maritalPartnerDetailsPost);

router.get('/about-your-civil-partner', functions.maritalPartnerDetailsGet);
router.post('/about-your-civil-partner', functions.maritalPartnerDetailsPost);

router.get('/about-your-ex-spouse', functions.maritalPartnerDetailsGet);
router.post('/about-your-ex-spouse', functions.maritalPartnerDetailsPost);

router.get('/about-your-ex-partner', functions.maritalPartnerDetailsGet);
router.post('/about-your-ex-partner', functions.maritalPartnerDetailsPost);

router.get('/about-your-late-spouse', functions.maritalPartnerDetailsGet);
router.post('/about-your-late-spouse', functions.maritalPartnerDetailsPost);

module.exports = router;
