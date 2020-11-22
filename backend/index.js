const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const config = require("./config/key");

app.use(cors());
app.use(express.json());

mongoose.connect(config.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});

mongoose.connection.on("error", (err) => {
  console.log("Error", err);
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
