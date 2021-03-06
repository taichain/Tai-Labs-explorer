### TAIExplorer 

* Live Version: [TAIscan.com](http://explorer.titprotocol.com/)
* Follow the project progress at: [TAI Block Explorer Development](http://TaiChain.org/) 

#### Local installation

* Make sure you already have installed node,if not,please refered [this](https://nodejs.org/en/)

``` download codes
git clone https://github.com/Tai-Labs/Tai-Labs-explorer.git
cd Tai-Labs-explorer
npm i
```

#### Install mongodb:

* MacOS: `brew install mongodb`
* Centos: `yum install -y mongodb`
* Ubuntu: `sudo apt-get install -y mongodb-org`

#### Populate the DB

* This will fetch and parse the entire blockchain.
* Configuration file: `/tools/grabber.js`
* modify the var "config" (near the file end) like follow basic settings:

``` config models
var config = {
    "rpc": 'http://47.242.34.250:8787',
    "blocks": [ {"start": 0, "end": "latest"}],
    "quiet": true,
    "terminateAtExistingDB": false,
    "listenOnly": false,//false:graber interval. true:grabe by listen new block.
    "out": "."
};
```

* rpc TaiChain rpc which your browser will grab data from
* blocks  is a list of blocks to grab. It can be specified as a list of block numbers or an interval of block numbers. When specified as an interval, it will start at the ```end``` block and keep recording decreasing block numbers. 
* terminateAtExistingDB will terminate the block grabber once it gets to a block it has already stored in the DB.
* quiet prints out the log of what it is doing. currently not use
* listenOnly,When true, the grabber will create a filter to receive the latest blocks from geth as they arrive. It will not continue to populate older block numbers. 
* When ```listenOnly``` is set to ```true```, the ```blocks``` option is ignored. 
Note 2: ```terminateAtExistingDB``` and ```listenOnly``` are mutually exclusive. Do not use ```terminateAtExistingDB``` when in ```listenOnly``` mode.</b>

#### Run Grabber:

``` node startup
nohup node ./tools/grabber.js >> ./grabber.log 2>&1 &  
```
