require( '../db.js' );
var mongoose = require( 'mongoose' );
var Block     = mongoose.model( 'Block' );
var Transaction     = mongoose.model( 'Transaction' );
var Contract     = mongoose.model( 'Contract' );
var InerTransaction     = mongoose.model( 'InerTransaction' );
var LogEvent     = mongoose.model( 'LogEvent' );
var Address     = mongoose.model( 'Address' );
var Witness = mongoose.model('Witness');
var TokenTransfer = mongoose.model('TokenTransfer');


async function changeAddr(){
    let txList = await Address.find().sort({"balance":-1})
    if(txList && txList.length>0){
        for(var i=0;i<txList.length;i++){
            if(txList[i].addr.substr(0,2)=="0x"){
                console.log("addr--",txList[i].addr)
                // let new_addr ="tit"+txList[i].addr.substr(2);
                // await Address.update({"_id":txList[i]._id},{$set:{"addr":new_addr}})
            }
        }
        console.log("ok---")
    }
    
}
// changeAddr();
async function changeBlock(){
    let txList = await Block.find({},{"miner":true}).limit(10000)
    if(txList && txList.length>0){
        for(var i=0;i<txList.length;i++){
            if(txList[i].miner.substr(0,2)=="0x"){
                console.log("addr--",txList[i].miner)
                let new_addr ="tit"+txList[i].miner.substr(2);
                await Block.update({"_id":txList[i]._id},{$set:{"addr":new_addr}})
            }
        }
        console.log("ok---")
    }
    
}
changeBlock();