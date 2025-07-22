const express = require('express');
const { shortenUrl, getStats, getByWallet,incrementClick } = require('../controllers/urlController');

const router = express.Router();

// ✅ Route functions must be functions, not undefined
router.post('/shorten', shortenUrl);
router.get('/stats/:shortCode', getStats);
router.get('/my-urls/:walletAddress', getByWallet);
router.patch("/click/:shortCode", incrementClick);

module.exports = router;
