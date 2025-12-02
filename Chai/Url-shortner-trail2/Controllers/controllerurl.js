const URL = require("../Model/url.js");
const shortid = require("shortid");

async function handlerGenerateShortID(req, res) {
  const shortidd = shortid.generate(); 
  // ✅ correct usage
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // await URL.create({
  //   shortID: shortidd,
  //   redirectURL: body.url,
  //   visitedHistory: [],
  // });

// return res.render("home", { newURL });
const newURL = await URL.create({
  shortID: shortidd,
  redirectURL: body.url,
  visitedHistory: [],
});

return res.render("home", { newURL });

}

// async function handlerAnalytics(req,res){
//   const shortID=body.params.shortid;
//   const result =URL.findOne({shortID});
//   return res.json({
//     totalClicks:result.visitedHistory.length,
//     analystics:result.visitedHistory
//   })
// }



async function handlerAnalytics(req, res) {
  try {
    const shortID = req.params.shortID;
    
    const result = await URL.findOne({ shortID });

    if (!result) {
      return res.status(404).json(
        { error:"Short URL not found" }
      );
    }

    // ✅ Convert timestamps to readable format
    const analytics = result.visitedHistory.map((v) => ({
      time: new Date(v.timestamp).toLocaleString(),
    }));

    return res.json({
      totalClicks: result.visitedHistory.length,
      analytics,
    });
  } catch (error) {
    console.error("Error in analytics handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handlerGenerateShortID,
  handlerAnalytics,
};
