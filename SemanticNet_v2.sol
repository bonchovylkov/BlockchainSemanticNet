
pragma solidity ^0.4.24;
import "https://github.com/Arachnid/solidity-stringutils/strings.sol";



contract BlockchainSemanticTerminologyNet {
    
      using strings for *;
      
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
        
    }
    
    
    
    function addNode(uint parentNumber, string _name, address _creator) public {
        
        
        

        
        bytes32[] storage pathToNode = flattenTree[parentNumber];
        Node storage parentNode = mainNode;
        uint  index = 1;
        
        //prepare string to be concatenated
        strings.slice memory uniqueIdentifierPath = parentNode.name.toSlice().concat("->".toSlice()).toSlice();
        
        while(parentNode.number!=parentNumber){
            bytes32 nextItem = pathToNode[index];
            parentNode = parentNode.children[nextItem];
            uniqueIdentifierPath = uniqueIdentifierPath
                                  .concat(parentNode.name.toSlice()).toSlice()
                                  .concat("->".toSlice()).toSlice();
            index++;
        }
        
        uniqueIdentifierPath = uniqueIdentifierPath.concat(_name.toSlice()).toSlice();
        string memory fullName = uniqueIdentifierPath.toString();
     
        Node memory newNode;
        newNode.name = _name;
        newNode.creator = _creator;
        newNode.number = nodeNumber;
        newNode.uniqueIdentifier = keccak256(abi.encodePacked(fullName));
        
        //keeping the flatten array actual
        flattenTree[newNode.number].push(newNode.uniqueIdentifier);
        
        nodeNumber++;   
        
        emit AddingNode(_creator,newNode.number,fullName,newNode.uniqueIdentifier);
    }
    
    // function findNodeByNumber()  private returns (Node) {
    //     returns mainNode;
    // }
    
    
    
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