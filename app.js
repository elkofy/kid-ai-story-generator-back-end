const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({ extended: false }));

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const sequelize = new Sequelize("mysql://root:@localhost:3306/bdd_ia_story");


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// To parse cookies from the HTTP Request
app.use(cookieParser());

// ----- simple route -------
app.get("/", (req, res) => {
  res.json({ message: "hello World!" });
});

app.get("/home", (req, res) => {
  res.json({ message: "Home page" });
});
// ------------------------

//require("./app/routes/auth.routes")(app);
//require("./app/routes/user.routes")(app);

require("./app/routes/openai.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
