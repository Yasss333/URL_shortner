const fs = require("fs");
const { stringify } = require("querystring");

const data = fs.readFileSync("./MOCK_DATA.json", "utf8");
const users = JSON.parse(data);

const ok =JSON.stringify(users);
console.log( typeof users);
console.log(typeof data);       
console.log(typeof ok );       

