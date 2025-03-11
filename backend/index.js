const app = require("./app");
const path = require("path");
const express = require("express");
require("dotenv").config();
// Serve static files (images)
const staticPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(staticPath));
console.log("Static files served from:", staticPath);

// Serve sitemap.xml from frontend's public folder
app.get("/sitemap.xml", (req, res) => {
  res.sendFile(
    path.join("../frontend/public", "sitemap.xml")
  );
});
const port = 5000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
