function toAddr(addr){
    if(addr && addr.length==43 && addr.substr(0,3)=='tit'){
        return "0x"+addr.substr(3);
    }
    return addr
}
function toTit(addr){
    if(addr && addr.length==42 && addr.substr(0,2)=="0x"){
        return "tit"+addr.substr(2)
    }
    return addr
}
module.exports = {
    toAddr,
    toTit
}