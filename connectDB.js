const mongoose=require("mongoose");

async function connecttoMongoDB(url){
    try {
        return await  mongoose.connect(url);
        console.log("COnnected to MongoUrl");
        
    } catch (error) {
        console.error("MOngo COnnection failed",error.message);
        
    }
};


module.exports={
    connecttoMongoDB
}