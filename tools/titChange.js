function toAddr(addr){
    if(addr && addr.substr(0,3)=='tit'){
        return "0x"+addr.substr(3);
    }
    return addr
}
function toTit(addr){
    if(addr && addr.indexOf("0x")==0){
        return "tit"+addr.substr(2)
    }
    return addr
}

function checkTit(addr){
    if(addr){
      if(addr.substr(0,2)=="0x"){
        return addr;
      }else if(addr.substr(0,3)=="tit"){
        return "0x"+addr.substr(3);
      }
    }
    return addr
  }

module.exports = {
    toAddr,
    toTit,
    checkTit
}