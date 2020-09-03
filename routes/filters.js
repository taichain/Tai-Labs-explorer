'use strict';
var etherUnits = require(__lib + "etherUnits.js")
var BigNumber = require('bignumber.js');
var titChange = require('../tools/titChange')
/*
  Filter an array of TX 
*/
function filterTX(txs, value) {
  return txs.filter(benefitAdd).map(function(tx){
    tx.from = titChange.toTit(tx.from)
    tx.to = titChange.toTit(tx.to)
    //return [tx.hash, tx.blockNumber, tx.from, tx.to, etherUnits.toEther(new BigNumber(tx.value), 'ether'), tx.gas, tx.timestamp, tx.status]
    return [titChange.toTit(tx.hash), tx.blockNumber, titChange.toTit(tx.from), titChange.toTit(tx.to), String(tx.value), tx.gas, tx.timestamp, tx.status]
  })
}

function benefitAdd(tx){
  return !(tx.to.toLowerCase()=="0xdd212d8efe11ac1fb4a503be9d3306a621afc428" && tx.from.toLowerCase() == "0xcaaf10244e0f891a2c4f066f3d137914b47f1dce");
}

function filterTrace(txs, value) {
  return txs.map(function(tx){
    var t = tx;
    if (t.type == "suicide") {
      if (t.action.address)
        t.from = titChange.toTit(t.action.address);
      if (t.action.balance)
        t.value = etherUnits.toEther( new BigNumber(t.action.balance), "wei");
      if (t.action.refundAddress)
        t.to = titChange.toTit(t.action.refundAddress);
    } else {
      if (t.action.to)
        t.to = titChange.toTit(t.action.to);
        t.from = titChange.toTit(t.action.from); 
      if (t.action.gas)
        t.gas = new BigNumber(t.action.gas).toNumber();
      if ((t.result) && (t.result.gasUsed))
        t.gasUsed = new BigNumber(t.result.gasUsed).toNumber();
      if ((t.result) && (t.result.address))
        t.to = titChange.toTit(t.result.address);
      t.value = etherUnits.toEther( new BigNumber(t.action.value), "wei");            
    }
    return t;
  })
}

function filterBlock(block, field, value) {
  var tx = block.transactions.filter(function(obj) {
    return obj[field]==value;   
  });
  tx = tx[0];
  if (typeof tx !== "undefined")
    tx.timestamp = block.timestamp; 
    tx.from = titChange.toTit(tx.from)
    tx.to = titChange.toTit(tx.to)
    tx.hash = titChange.toTit(tx.hash)
    // tx.parentHash = titChange.toTit(tx.parentHash);
    // tx.sha3Uncles = titChange.toTit(tx.sha3Uncles);
    // tx.stateRoot = titChange.toTit(tx.stateRoot);
    // tx.transactionsRoot = titChange.toTit(tx.transactionsRoot);
    // tx.hash = titChange.toTit(tx.hash);
    // tx.extraData = titChange.toTit(tx.extraData)
  return tx;
}

/* make blocks human readable */
function filterBlocks(blocks) {
  if (blocks.constructor !== Array) {
    var b = blocks;
    b.miner = titChange.toTit(b.miner)
    b.parentHash = titChange.toTit(b.parentHash);
    b.sha3Uncles = titChange.toTit(b.sha3Uncles);
    b.stateRoot = titChange.toTit(b.stateRoot);
    b.transactionsRoot = titChange.toTit(b.transactionsRoot);
    b.hash = titChange.toTit(b.hash);
    b.extraData = titChange.toTit(b.extraData)
    b.extraData = hex2ascii(b.extraData);
    if(b.extraData && b.extraData.length>5){
      b.extraData = b.extraData.charCodeAt(3)+"."+b.extraData.charCodeAt(4)+"."+b.extraData.charCodeAt(5);
    }
    return b;
  }
  return blocks.map(function(block) {
    var b = block;
    b.extraData = hex2ascii(block.extraData);
    b.miner = titChange.toTit(b.miner)
    b.parentHash = titChange.toTit(b.parentHash);
    b.sha3Uncles = titChange.toTit(b.sha3Uncles);
    b.stateRoot = titChange.toTit(b.stateRoot);
    b.transactionsRoot = titChange.toTit(b.transactionsRoot);
    b.hash = titChange.toTit(b.hash);
    b.extraData = titChange.toTit(b.extraData)
    b.extraData = hex2ascii(b.extraData);
    if(b.extraData && b.extraData.length>5){
      b.extraData = b.extraData.charCodeAt(3)+"."+b.extraData.charCodeAt(4)+"."+b.extraData.charCodeAt(5);
    }
    return b;
  })
}

/* stupid datatable format */
function datatableTX(txs) {
  return txs.map(function(tx){
    return [titChange.toTit(tx.hash), tx.blockNumber, titChange.toTit(tx.from), titChange.toTit(tx.to), 
            etherUnits.toEther(tx.value, 'wei'), tx.gas, tx.timestamp]
  })
}

function internalTX(txs) {
  return txs.map(function(tx){
    return [titChange.toTit(tx.transactionHash), tx.blockNumber, titChange.toTit(tx.action.from), titChange.toTit(tx.action.to), 
            etherUnits.toEther(tx.action.value), 'wei', tx.action.gas, tx.timestamp]
  })
}


var hex2ascii = function (hexIn) {
  if(hexIn){
    var hex = hexIn.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }
    return null
    
}

module.exports = {
  filterBlock: filterBlock,
  filterBlocks: filterBlocks,
  filterTX: filterTX,
  filterTrace: filterTrace,
  datatableTX: datatableTX,
  internalTX: internalTX
}
