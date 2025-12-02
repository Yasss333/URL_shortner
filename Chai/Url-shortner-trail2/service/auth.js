const jwt=require("jsonwebtoken");
const secret="Yash123";

function setUser(id,user){

return jwt.sign({
    _id:user._id,
    email:user.email,
    // password:user.password
},secret);

}

function getUser(token){
//   return   sessionIdToUserMap.get(id);
if(!token) return null;
return jwt.verify(token,secret)
}

module.exports={
   setUser,getUser
}