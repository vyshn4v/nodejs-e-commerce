const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
dotEnv.config({ path: "./.env" });
const authRouter = require("./src/routes/Auth");
const userRouter = require("./src/routes/User");
const cors = require("cors")
mongoose
  .connect(process.env.mogoUrl)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cors())
app.use(express.json());
app.use("/authentication", authRouter);
app.use("/user", userRouter);
const port = process.env.port || 3001;
app.listen(port, () => {
  console.log("App is runnig on port " + port);
});
