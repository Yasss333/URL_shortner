const express=require("express");
const router=express.Router();
const {handlerUserSignup,handlerUserLogin}=require("../Controllers/user.js")

router.post("/",handlerUserSignup)
router.post("/login",handlerUserLogin)

module.exports=router;