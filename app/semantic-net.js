$(function(){
    const semantiNetContractAddress = "0x124f14c8b1637ce9ad21f1176cda7ea7c09e251b";
    
    const semanticNetABI = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "parentNumber",
                    "type": "uint256"
                },
                {
                    "name": "_name",
                    "type": "string"
                }
            ],
            "name": "addNode",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "gotTo",
                    "type": "string"
                }
            ],
            "name": "LogDebug",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "fromAddr",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "number",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "fullName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "uniqueNumber",
                    "type": "bytes32"
                }
            ],
            "name": "AddingNode",
            "type": "event"
        },
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "flattenTree",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "nodeIndex",
                    "type": "uint256"
                }
            ],
            "name": "getNodeJson",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "mainNode",
            "outputs": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "uniqueIdentifier",
                    "type": "bytes32"
                },
                {
                    "name": "creator",
                    "type": "address"
                },
                {
                    "name": "votes",
                    "type": "int256"
                },
                {
                    "name": "parentNodeHash",
                    "type": "bytes32"
                },
                {
                    "name": "number",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "nodeNumber",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    // const IPFS = window.IpfsApi('localhost',5001);
    // const Buffer = IPFS.Buffer;

    let sn = web3.eth.contract(semanticNetABI).at(semantiNetContractAddress);
    
    // sn.addNode(0,"test",function (err, trxHash){
    //     if(err){
    //         console.log(err);
    //     }

    //     console.log(JSON.stringify(trxHash));

    //     sn.nodeNumber(function (err, result){
    //         if(err){
    //             console.log(err);
    //         }
    
    //         console.log(JSON.stringify(result));
    //     });
    // });

    sn.nodeNumber(function (err, result){
        if(err){
            console.log(err);
        }

        console.log(JSON.stringify(result));
    });

    sn.getNodeJson(0, function (err, result){
        if(err){
            console.log(err);
        }

        console.log(JSON.stringify(result));
    });
  

});