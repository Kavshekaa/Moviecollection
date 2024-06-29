const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/mymoviecollection", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const moviesRoute = require("./routes/movies");

app.use("/api/movies", moviesRoute);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
