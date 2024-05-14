const express = require("express");
const path = require("path");
const app = express();
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogify')
    .then(() => console.log('mongodb connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err)); // Add error handling for MongoDB connection

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.use("/user", userRoute);

app.get("/", (req, res) => {
    res.render("home");
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
