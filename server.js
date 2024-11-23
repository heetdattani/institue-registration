const express = require("express");
const moongose = require("mongoose");
const bodyParse = require("body-parser");
const instituteRoute = require("./routes/institute");

const app = express();

app.use(bodyParse.json());

moongose
  .connect("mongodb://localhost:27017/institute-registration", {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongodb :>> ");
  })
  .catch((err) => {
    console.log("MongoDB connection error :>> ", err);
  });

app.use("/api/institute", instituteRoute);

app.get("/", (req, res) => {
  res.send("Institute Registration API");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
