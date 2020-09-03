
/**
 * Checks if the given string is strictly an address
 *
 * @method isStrictAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isStrictAddress = function (address) {
    return /^0x[0-9a-f]{40}$/i.test(address);
};

/**
 * Checks if the given string is an address
 *
 * @method isAddress
 * @param {String} address the given HEX adress
 * @return {Boolean}
*/
var isAddress = function (address) {
    if((address && address.length ==42 && address.substr(0,2)=="0x" )|| (address && address.length==43 && address.substr(0,3)=="tit")){
        return true;
    }else{
        return false
    }
};

var isTransaction = function (tx) {
    if(tx && tx.length==66 && tx.indexOf("0x")==0){
        return true;
    }
    if(tx && tx.length==67 && tx.indexOf("tit")==0){
        return true;
    }
    return false;
};