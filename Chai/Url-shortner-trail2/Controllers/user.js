const User=require("../Model/user.js");
const {setUser}=require("../service/auth.js")

const {v4:uuidv4}=require("uuid")
async function handlerUserSignup(req,res){
    const {name,email,password}=req.body;
    await User.create({
        name,
        email,
        password
    });

    // return res.render("home");
    return res.redirect("/");
    return res.render("home", { newURL: null });
}
async function handlerUserLogin(req, res) {
  const { email,password } = req.body;
  const user=await User.findOne({
    email,password
  })

  if(!user)  return res.render("login", {
      error:"Invalid UserName or Password "
    });
//    const sessionID = uuidv4();

const token=    setUser(user);
   res.cookie("uid",token)


    return res.redirect("/");
}

module.exports={
    handlerUserSignup,
    handlerUserLogin
}