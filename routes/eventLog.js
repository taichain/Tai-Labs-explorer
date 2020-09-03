var titChange = require('../tools/titChange')
module.exports = function(req, res){
  var respData = "";
  var mongoose = require( 'mongoose' );
  var LogEvent = mongoose.model( 'LogEvent' );

    try{
      logEventFind = LogEvent.find({txHash:req.body.txHash}).lean(true);
      logEventFind.exec(function (err, docs) {
        for(var i=0;i<docs.length;i++){
          docs[i].address = titChange.toTit(docs[i].address)
          docs[i].txHash = titChange.toTit(docs[i].txHash)
          docs[i].contractAdd = titChange.toTit(docs[i].contractAdd)
          docs[i].from = titChange.toTit(docs[i].from)
          docs[i].to = titChange.toTit(docs[i].to)
          docs[i].data = titChange.toTit(docs[i].data)
          if(docs[i].topics && docs[i].topics.length>0){
            for(var j=0;j<docs[i].topics.length;j++){
              docs[i].topics[j] = titChange.toTit(docs[i].topics[j])
            }
          }
        }
        respData = JSON.stringify(docs);
        res.write(respData);
        res.end();
      });
    } catch (e) {
      console.error(e);
      res.write("[]");
      res.end();
    }

    
  
}; 