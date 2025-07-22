require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const walletRoutes = require("./routes/walletRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", urlRoutes);
app.use("/api", walletRoutes);

const Url = require("./models/Url");

app.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({ shortCode: req.params.shortCode });
    if (!url) return res.status(404).json({ error: "Invalid short code" });

    url.clicks += 1;
    await url.save();

    res.redirect(url.originalUrl);
  } catch (err) {
    console.error("Redirect error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log("🚀 Server running on port", process.env.PORT)
    )
  )
  .catch((err) => console.error("❌ MongoDB connection error:", err));
