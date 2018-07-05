
pragma solidity ^0.4.24;
import "github.com/Arachnid/solidity-stringutils/strings.sol";



contract BlockchainSemanticTerminologyNet {
    
      using strings for *;
      
      event LogDebug(string gotTo);
      event AddingNode(address fromAddr, uint number,string fullName,bytes32 uniqueNumber);
        
    address private owner;
    Node public mainNode;
    uint public nodeNumber = 0;
    //additional map to simplify the search in the tree
    //contains node number -> uniqueIdentifier of all nested items
    mapping(uint=>bytes32[]) flattenTree;
    
    constructor() public{
        owner = msg.sender;
        mainNode.name = "Blockchain";
       // mainNode.name = sha3(mainNode.name);
         mainNode.uniqueIdentifier = keccak256(abi.encodePacked(mainNode.name));
         mainNode.creator = msg.sender;
         mainNode.number = nodeNumber;
         flattenTree[0].push(mainNode.uniqueIdentifier);
         
         nodeNumber++;
        
         addNode(0,"Block",owner); //1
         addNode(1,"Transaction",owner); //2
         addNode(0,"Node",owner); //3
         addNode(3,"Peer",owner);//4
         addNode(0,"Miner",owner);//5
         addNode(0,"Wallet",owner);//6
    }
    
    //name,creator,resourcesJoined, childrenJoined
    function getNodeJson(uint nodeIndex) view public returns (string,address,string,string){
        require(index<nodeNumber, "Please provide existing index");
        
        bytes32[] storage pathToNode = flattenTree[nodeIndex];
        Node  ourNode = mainNode;
        uint  index = 1;

        while(ourNode.number!= nodeIndex && index < pathToNode.length){
            
            bytes32 nextItem = pathToNode[index];
            ourNode = ourNode.children[nextItem];
            
            index++;
        }
        
        strings.slice memory resources;
           for (uint i=0; i< ourNode.resourcesKeys.length; i++) {
          
           resources = resources
           .concat(ourNode.resourcesKeys[i].toSlice()).toSlice()
           .concat(",".toSlice()).toSlice();
           
        }
        
            strings.slice memory childrenItems = "".toSlice();
           for (uint j=0; j< ourNode.cheldrenKeys.length; j++) {
          
           childrenItems = childrenItems
           .concat(ourNode.children[ourNode.cheldrenKeys[j]].name.toSlice()).toSlice()
           .concat(",".toSlice()).toSlice();
        }
        
        return (ourNode.name, ourNode.creator,resources.toString(),childrenItems.toString());
        
        
        // string[] memory resources;
        //  for (uint i=0; i< ourNode.resourcesKeys.length; i++) {
          
        //   strings.slice memory resourceKeyValue 
        //   = ourNode.resourcesKeys[i].toSlice().concat(":".toSlice()).toSlice()
        //   .concat(ourNode..toSlice()).toSlice();
        // }
        
        
        
        
    }
    
    
    function addNode(uint parentNumber, string _name, address _creator) public returns (uint){
        
        
        

        
        bytes32[] storage pathToNode = flattenTree[parentNumber];
        Node  parentNode = mainNode;
        uint  index = 1;
        // emit LogDebug("Got to 51");
        //prepare string to be concatenated
        strings.slice memory uniqueIdentifierPath = parentNode.name.toSlice().concat("->".toSlice()).toSlice();

        while(parentNode.number!=parentNumber && index < pathToNode.length){
            
            bytes32 nextItem = pathToNode[index];
            parentNode = parentNode.children[nextItem];
            
            //BUG: Blockchain->->Web Wallet???
            uniqueIdentifierPath = uniqueIdentifierPath
                                  .concat(parentNode.name.toSlice()).toSlice()
                                  .concat("->".toSlice()).toSlice();
            index++;
        }
        
        // emit LogDebug("Got to 65");
        
        uniqueIdentifierPath = uniqueIdentifierPath.concat(_name.toSlice()).toSlice();
        string memory fullName = uniqueIdentifierPath.toString();
     
        Node memory newNode;
        newNode.name = _name;
        newNode.creator = _creator;
        newNode.number = nodeNumber;
        newNode.uniqueIdentifier = keccak256(abi.encodePacked(fullName));
        // emit LogDebug("Got to 75");
        
        //copy the path to the parent in the flatten array of the new Item: ???
        for (uint i=0; i<pathToNode.length; i++) {
          flattenTree[newNode.number].push(pathToNode[i]);
        }
        
        //keeping the flatten array actual
        flattenTree[newNode.number].push(newNode.uniqueIdentifier);
        
        
        nodeNumber++;   
        
        parentNode.children[newNode.uniqueIdentifier] = newNode;
        parentNode.cheldrenKeys.push(newNode.uniqueIdentifier);
        
        emit AddingNode(_creator,newNode.number,fullName,newNode.uniqueIdentifier);
        
        return newNode.number;
    }
    
    
      enum ReseurceType {
        url,doc,docx,ppt,pptx, sol
    }
    
    
    //Represents entity in the Blockchain Semantic Net
    struct Node {
    
        //the term
        //shoud be unique in it's own chain (containing parent names)
        //for example: 
        //Blockchain->Node->Transaction is OK
        //|>address -> Transaction is OK
        string name;
        
        //keccak256 of the name + parent names recursivly 
        bytes32 uniqueIdentifier;
        
        //TODO: think about if should be tree or Graph???
        
        //related terms in format unique Identifier => node
        mapping(bytes32 => Node)  children;
        
        //helper arrrays 
        bytes32[] cheldrenKeys;
        
      
        //ipfs hash of term resource
        mapping(string=>ReseurceType)  resourcesHashes;
        
        string[] resourcesKeys;
        
        address  creator ;
        //can be positive or nagative value
        int votes;
        //The parent node if has any
        bytes32   parentNodeHash ;
        
        //autoincrement unique number;
        uint number;
        
    }



}

//Getting ideas from
//http://www.introprogramming.info/english-intro-csharp-book/read-online/chapter-17-trees-and-graphs/
//https://medium.com/coinmonks/linked-lists-in-solidity-cfd967af389b