const express=require("express");

const app=express();

const PORT=3000;

app.get("/",(req,res)=>{
    console.log("Helloo from Server");
    res.end("Hello from Server");
    
})


app.listen(PORT,()=>console.log(`The Server is running on ${PORT}`));
