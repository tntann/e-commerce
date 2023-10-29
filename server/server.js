const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/dbConnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    method: ["POST", "GET", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();

initRoutes(app);

app.listen(port, () => {
  console.log("Server running on port: " + port);
});
