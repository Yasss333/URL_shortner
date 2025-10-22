const express=require("express");
const {handleCreateshortUrl}=require("../Controllers/controllerUrl.js")

const router=express.Router();

router.post("/",handleCreateshortUrl);

module.exports=router;