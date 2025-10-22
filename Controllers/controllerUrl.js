
const shortID=require("short-id");
const router=require("../Routes/routesUrl.js");
const URL=require("../Model/modelurl.js")

async function handleCreateshortUrl(req, res) {
  const body=req.body;
  const sdi = shortID.generate(); 
  if(!body.url) return res.status(400).json({
   error:"All fields are requied"
  });
  await URL.create({
    shortID: sdi,
    redirectURL: body.url,
    visithistory: [],
  });

  return res.json({id:sdi});
}
module.exports={
  handleCreateshortUrl
}