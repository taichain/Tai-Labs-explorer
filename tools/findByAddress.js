var db = require('../db.js');
var fs = require('fs')
var addr = "0xd99215bda0529052803cfbe2e7502d84eb574499";
async function find(){
    let tx = await db.Transaction.find({$or:[{"from":noLowUper(addr)},{"to":noLowUper(addr)}],"blockNumber":{$gte:26859609,$lte:29435455}}).sort({"blockNumber":-1})
    console.log("tx:",tx.length)
    for(var i=0;i<tx.length;i++){
        fs.appendFileSync("./data.json",JSON.stringify({"data":tx[i].input,"hash":tx[i].hash,"blockNumber":tx[i].blockNumber,"from":tx[i].from,"to":tx[i].to})+"\n");
    }
console.log("ok");
}
function noLowUper(addr){
    if(addr && addr!=undefined){
      return {$regex:String(addr),$options:"$i"}
    }
    return "" 
  }
find()
