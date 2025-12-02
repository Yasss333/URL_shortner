const express = require("express");
const cookieParser=require("cookie-parser");
const { connecttomongoDB } = require("./connect");
const path = require("path");
const urlroutes = require("./ROutes/routesurl");
const {restrictLogedinUsersonly}=require("./middleware/auth.js")
const URL = require("./Model/url");
const staticroute=require("./ROutes/staticrouter.js")
const userRoute=require("./ROutes/user.js")
const app = express();

const PORT = 3000;

// View engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

// DB
connecttomongoDB(`mongodb://localhost:27017/URllll-shortnerrr`)
  .then(() => console.log("Mongo Connected"))
  .catch(() => console.error("No"))
  .finally(() => console.log("Finally"));

// Routes
app.use("/url",restrictLogedinUsersonly, urlroutes);
app.use("/user",userRoute );  
app.use("/",staticroute)



app.get("/", (req, res) => {
  res.send("👋 Hello from the Express server! Everything is running fine 🚀");
});

// TEST ROUTE
app.get("/test", async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", { allurls });
});

// ⚠️ MUST BE LAST — Catch short IDs & redirect
app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;

  try {
    const entry = await URL.findOneAndUpdate(
      { shortID },
      {
        $push: {
          visitedHistory: { timestamp: new Date() },
        },
      },
      { new: true }
    );

    if (!entry) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error fetching shortID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => console.log(`App running on ${PORT}`));
