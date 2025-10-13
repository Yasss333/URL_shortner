const { error, log } = require("console");
const fs=require("fs");

// fs.writeFileSync("./test.txt","hello Man");

// fs.rename("test.txt",'newtest.txt',(err)=>{
//     if (err) throw err;
//     console.log("Rename Complete");
    
// });

// fs.appendFile('newtest.txt',"hello new line \n",(err)=>{
//     if(err) throw err;
//     console.log("Append COmplete");
    
// })

// fs.mkdirSync("./newdirectory")

const result=fs.readFileSync("./newtest.txt","utf-8");
console.log(result);
