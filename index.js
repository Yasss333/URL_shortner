const express=require("express");
const URL=require("./Model/modelurl.js")
const urlroute=require("./Routes/routesUrl.js");
const {connecttoMongoDB}=require("./connectDB.js")
const app=express();


app.use(express.urlencoded({extended:true}));
app.use(express.json())
const PORT=3000;

connecttoMongoDB("mongodb://127.0.0.1:27017/URL-Shortner")
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err)
)

app.use("/url",urlroute);

app.get('/:shortID',async (req,res)=>{
    const shortId=req.params.shortID;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamps: Date.now(),
          }
        },
      }
    );
res.redirect(entry.redirectURL )
})


app.get("/",(req,res)=>{
    console.log("Helloo from Server");
    res.end("Hello from Server");
})



app.listen(PORT,()=>console.log(`The Server is running on ${PORT}`));
