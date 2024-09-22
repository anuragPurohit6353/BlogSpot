require('dotenv').config();
const express = require("express");
const path = require("path");
const userRoutes = require("./routes/user");
const Blog = require("./models/blog");
const blogRoutes = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie }= require("./middlewears/auth");
const app = express();
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
.then(() => { console.log("connected sucessfully")})
.catch((e) => { console.log(e) });



app.use(express.static(path.resolve('./public')));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.urlencoded({extended:false}));   // middleweare for form data uses
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use("/user", userRoutes);
app.use("/blog",blogRoutes);


app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({})
    res.render("home",{
        user : req.user,
        blogs : allBlogs,
    });
})



app.listen(PORT, () => { console.log(`server will be stareted at ${PORT}`) })