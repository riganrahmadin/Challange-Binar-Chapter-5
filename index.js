//create express server
const logger = require("morgan");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const router = require("./routes");
const session = require("express-session");
const cookieParse = require("cookie-parser");
const flash = require("connect-flash");

const PORT = 8080 
//express server
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// config flash msg
app.use(cookieParse("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);


app.get("/api/v1", (req, res, next) => {
  try {
      res.send(200).json(PORT);
  } catch (e) {
    console.error(e.message);
  }
});
app.use("/api/v1/cars", require("./routes/index.js"));


app.listen(PORT, () => {
  console.log(`Server Runing listening at http://localhost:${PORT}`);
});

