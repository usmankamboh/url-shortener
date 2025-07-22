const Url = require("../models/Url");

// 🚀 POST /api/shorten
exports.shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl, walletAddress,shortCode } = req.body;
    // Check for existing entry
    const existing = await Url.findOne({ originalUrl, walletAddress });
    if (existing) return res.json(existing);
    // Store in MongoDB
    const url = await Url.create({ originalUrl, shortCode, walletAddress });
    res.status(201).json(url);
  } catch (err) {
    console.error("shortenUrl error:", err.message);
    next(err);
  }
};

// 📊 GET /api/stats/:shortCode
exports.getStats = async (req, res, next) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: "URL not found" });
    res.json(url);
  } catch (err) {
    console.error("getStats error:", err.message);
    next(err);
  }
};

// 📋 GET /api/my-urls/:walletAddress
exports.getByWallet = async (req, res, next) => {
  try {
    const urls = await Url.find({ walletAddress: req.params.walletAddress });
    res.json(urls);
  } catch (err) {
    console.error("getByWallet error:", err.message);
    next(err);
  }
};

exports.incrementClick = async (req, res, next) => {
  try {
    const url = await Url.findOneAndUpdate(
      { shortCode: req.params.shortCode },
      { $inc: { clicks: 1 } },
      { new: true }
    );
    if (!url) return res.status(404).json({ error: "URL not found" });
    res.json(url);
  } catch (err) {
    console.error("incrementClick error:", err.message);
    next(err);
  }
};