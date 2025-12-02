const express=require("express");
const router=express.Router();


router.get("/", (req, res) => {
  res.render("home", { newURL: null });
});

router.get("/signup", (req, res) => {
  res.render("signup");  // load signup.ejs
});
router.get("/login", (req, res) => {
  res.render("login");  
});





module.exports=router;