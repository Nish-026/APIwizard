const express = require("express");
var cors = require("cors");
require("dotenv").config();

const port = process.env.port;
const { connection } = require("./config/config");
const { userRoute } = require("./route/user.route");
const { apiRoute } = require("./route/api.route");
const { authenticate } = require("./middleware/authenticate.middleware");
const {authRoute}= require("./route/auth.route")
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to apiace");
});




app.use(userRoute);
app.use("/auth", authRoute);
app.use(authenticate);
app.use(apiRoute);


app.listen(port, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
  console.log("Server is running at port:", port);
});
