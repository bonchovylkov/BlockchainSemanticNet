export const STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVER_ERROR: 500
};



export class Constants {

    //public static semantiNetContractAddress = "0x124f14c8b1637ce9ad21f1176cda7ea7c09e251b";
    public static semantiNetContractAddress = "0x0beab1aea1ac3c06270f6f38e59f19a04b8381a6";// "0x8009810201163a2bed3a4f05ff10110ffb5966cf";
    
    public static semanticNetABI = [
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
                }
            ],
            "name": "AddingNode",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "parentNumber",
                    "type": "uint256"
                },
                {
                    "name": "nodeIndex",
                    "type": "uint256"
                }
            ],
            "name": "removeNode",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
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
                    "type": "uint256"
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
}

