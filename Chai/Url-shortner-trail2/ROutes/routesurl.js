
const express=require("express");
const {handlerGenerateShortID,handlerAnalytics}=require("../Controllers/controllerurl.js")
const router=express.Router();

router.post("/", handlerGenerateShortID ) ;
router.get("/analytics/:shortID",handlerAnalytics) ;

module.exports=router ;
