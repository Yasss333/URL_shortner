const mongoose=require('mongoose');

async function connecttomongoDB(url) {
    return  mongoose.connect(url);
}


module.exports={
    connecttomongoDB,
}