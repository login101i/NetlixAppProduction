const express = require("express");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const moviesRoute = require("./routes/movies");
const listRoute = require("./routes/lists");
const cors = require('cors')

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Mongo DB connected sucessfully".brightCyan);
  })
  .catch((err) => console.log(err));

  app.use(cors())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/list", listRoute);

app.listen(8880, () => {
  console.log("Serwer is running on port 8880".brightMagenta);
});
