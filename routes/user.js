const express = require("express");
const User = require("../models/user");
const router = express.Router();
//signin
router.get("/signin",(req,res) => {
    res.render("signin");
});
router.post("/signin" ,async (req,res) => {
    try{
        const { email , password} = req.body;
        const token =await User.matchPasswordAndGenereteToken(email,password);
     
        return res.cookie("token",token).redirect("/");
    }
    catch(err) {
      return  res.render('signin', {
        error : 'incorrect Password or Email',
      })
    }
   
})
//logout : 

router.get("/logout",(req,res) =>{
    res.clearCookie("token").redirect("/");
})
//signup
router.get("/signup",(req,res) => {
    res.render("signup");
});
router.post('/signup',async (req,res) => {
    const { fullName,email,password } = req.body;
    await User.create({
        fullName ,
        email,
        password,
    });
    return res.redirect('/')
})
module.exports = router;