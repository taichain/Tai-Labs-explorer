require( '../db.js' );
var mongoose = require( 'mongoose' );
var Transaction     = mongoose.model( 'Transaction' );
var fs = require("fs")

async function calTrans(addr){
    let txList = await Transaction.find({$or:[{"from":addr},{"to":addr}]});
    await fs.writeFileSync('./findAddressTx.json',JSON.stringify(txList))
    console.log("ok--")
}
calTrans("0xad3d35b9c4fee544397cfb36b8698d0002caff95");