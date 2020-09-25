require("dotenv").config();
var mongoose = require("mongoose");
var express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My Routes
const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/card");
//DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => {
    console.log(error);
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
//Routes
app.use("/api", authRoutes);
app.use("/api", cardRoutes);
//Ports
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
