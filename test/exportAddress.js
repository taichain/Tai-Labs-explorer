const xlsx = require('node-xlsx')
var fs = require('fs')
require( '../db.js' );
var mongoose = require( 'mongoose' );
var Address = mongoose.model( 'Address' );
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://47.242.34.250:8787'));

async function setHeader(){
    let data = [] // 其实最后就是把这个数组写入excel 
   let title = ['address','balance']//这是第一行 俗称列名 
   data.push(title) // 添加完列名 下面就是添加真正的内容了
   let rows = await Address.find().sort({"balance":-1});
   for(var i=0;i<rows.length;i++){
    let arrInner = []
    arrInner.push(rows[i].addr)
    let bal = await web3.eth.getBalance(rows[i].addr);
    console.log("bal--",bal)
    arrInner.push(bal/10**18)
    data.push(arrInner)//data中添加的要是数组，可以将对象的值分解添加进数组，例如：['1','name','上海']
   }
   writeXls(data)
}
//5524355.425290064
function writeXls(datas){
    let buffer = xlsx.build([
        {
         name:'sheet1',
         data:datas
        }
       ]);
    fs.writeFileSync('./the_content.xlsx',buffer,{'flag':'w'})
    console.log("ok----")
}
setHeader()