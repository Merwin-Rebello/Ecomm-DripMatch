const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
//Route imports

const product = require("./routes/productRoute");
const user = require("./routes/userRoutes");
app.use("/api/v1", product);
app.use("/api/v1", user);
//middleware for errors
app.use(errorMiddleware);

module.exports = app;
