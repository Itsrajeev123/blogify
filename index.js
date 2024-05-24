const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require('./models/blog'); 

const app = express();
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const PORT = 8000;

mongoose.connect('mongodb://localhost:27017/blogify')
    .then(() => console.log('mongodb connected'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

app.set("view engine", "ejs"); 
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find(); // Fetch blogs from the database
        res.render("home", {
            user: req.user,
            blogs: blogs // Pass blogs to the template
        });
    } catch (err) {
        console.error('Error fetching blogs:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
