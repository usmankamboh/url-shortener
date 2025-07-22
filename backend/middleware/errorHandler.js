module.exports = (err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(500).json({ error: err.message || "Server Error" });
};
