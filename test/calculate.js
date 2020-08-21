require( '../db.js' );
var mongoose = require( 'mongoose' );
var Transaction     = mongoose.model( 'Transaction' );

async function calTrans(addr){
    let txList = await Transaction.find({$or:[{"from":addr},{"to":addr}]});
    let tran_out=0;
    let tran_in=0;
    for(var i=0;i<txList.length;i++){
        if(txList[i].from.toLowerCase()==addr){
            tran_out+=Number(txList[i].value);
        }else{
            tran_in+=Number(txList[i].value);
        }
        
    }
    console.log("转出---",tran_out)
    console.log("转入---",tran_in)
}
calTrans("0xad3d35b9c4fee544397cfb36b8698d0002caff95");