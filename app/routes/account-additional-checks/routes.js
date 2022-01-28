const express = require('express');

const router = new express.Router();

router.get('/additional-checks', (_req, res) => {
  res.render('pages/account-additional-checks');
});

router.post('/additional-checks', () => {
  throw new Error('Additional checks for bank validation not implemented yet');
});

module.exports = router;
