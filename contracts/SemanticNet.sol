
pragma solidity ^0.4.24;
//import "github.com/Arachnid/solidity-stringutils/strings.sol";
import "./strings.sol";
//import "./ConcatUtils.sol";


contract SemanticNet {
    
      using strings for *;
      

      
    event LogDebug(string gotTo);
    event AddingNode(address fromAddr, uint number,string fullName);
        
    address public owner;
    Node public mainNode;
    uint public nodeNumber = 0;
    //additional map to simplify the search in the tree
    //contains node number -> uniqueIdentifier of all nested items
    mapping(uint=>uint[]) public flattenTree;
    
    constructor() public {
        owner = msg.sender;
        mainNode.name = "Blockchain";
       // mainNode.name = sha3(mainNode.name);
         //mainNode.uniqueIdentifier = keccak256(abi.encodePacked(mainNode.name));
         mainNode.creator = msg.sender;
         mainNode.number = nodeNumber;
         flattenTree[0].push(nodeNumber);
         
         nodeNumber++;
        
         addNode(0,"Block"); //1
         addNode(1,"Transaction"); //2
         addNode(0,"Node"); //3
         
        //  addNode(3,"Peer",owner);//4
        //  addNode(0,"Miner",owner);//5
        //  addNode(0,"Wallet",owner);//6
    }
    
    //name,creator,resourcesJoined, childrenJoined
    function getNodeJson(uint nodeIndex) view public returns (string,address,string,string){
        require(nodeIndex<nodeNumber, "Please provide existing index");
        
        uint[] storage pathToNode = flattenTree[nodeIndex];
        Node storage  ourNode = mainNode;
        uint  index = 1;

        //constant speed of searching
        while(ourNode.number!= nodeIndex && index < pathToNode.length){
            
            uint nextItem = pathToNode[index];
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
          for (uint j=0; j< ourNode.childrenKeys.length; j++) {
          
          childrenItems = childrenItems
          .concat(uintToString(ourNode.children[ourNode.childrenKeys[j]].number).toSlice()).toSlice()
          //.concat(ourNode.children[ourNode.childrenKeys[j]].name.toSlice()).toSlice()
          .concat(",".toSlice()).toSlice();
         }
        
        //       string memory childrenItems = "{";
        //   for (uint j=0; j< ourNode.childrenKeys.length; j++) {
          
        //   uint number = ourNode.children[ourNode.childrenKeys[j]].number;
        //   string  numberStr = uintToString(number);
        //   string name = ourNode.children[ourNode.childrenKeys[j]].name;
        //   string pair = concatTwoStrings(numberStr,name,":");
          
        //   childrenItems = concatTwoStrings(childrenItems,pair, ""); 
        //   childrenItems
        //   .concat(ourNode.children[ourNode.childrenKeys[j]].name.toSlice()).toSlice()
        //   .concat(",".toSlice()).toSlice();
        //  }
        
        return (ourNode.name, ourNode.creator,resources.toString(),childrenItems.toString());
        
        
        // string[] memory resources;
        //  for (uint i=0; i< ourNode.resourcesKeys.length; i++) {
          
        //   strings.slice memory resourceKeyValue 
        //   = ourNode.resourcesKeys[i].toSlice().concat(":".toSlice()).toSlice()
        //   .concat(ourNode..toSlice()).toSlice();
        // }
        
        
        
        
    }
    
 
    
     function removeNode(uint parentNumber, uint nodeIndex)  public  {
         require(index<nodeNumber, "Please provide existing index");
        
        uint[] storage pathToNode = flattenTree[parentNumber];
        Node storage  parentNode = mainNode;
        uint  index = 1;


        while(parentNode.number!=parentNumber && index < pathToNode.length){
            
            uint nextItem = pathToNode[index];
            parentNode = parentNode.children[nextItem];

            index++;
        }
        
        Node storage ourNode = parentNode.children[nodeIndex];
        require(ourNode.childrenKeys.length==0, "You cannot delete confired node");
        require(ourNode.creator == msg.sender || ourNode.creator == owner, "Only the creator of node can delete it");
        
        delete parentNode.children[nodeIndex];
        
        delete parentNode.childrenKeys[parentNode.childrenKeys.length - 1];
        parentNode.childrenKeys.length--;
        
        nodeNumber--;
     }

    
    function addNode(uint parentNumber, string _name) public  returns (uint){ 
        

        uint[] storage pathToNode = flattenTree[parentNumber];
        Node storage  parentNode = mainNode;
        uint  index = 1;


        while(parentNode.number!=parentNumber && index < pathToNode.length){
            
            uint nextItem = pathToNode[index];
            parentNode = parentNode.children[nextItem];

            index++;
        }

       
       bool hasSameChild = false;
        //"foobie".toSlice().compare("foobie".toSlice()
        for (uint j=0; j<parentNode.childrenKeys.length; j++) {
            Node storage child = parentNode.children[parentNode.childrenKeys[j]];
            int compareResult = child.name.toSlice().compare(_name.toSlice());
            if(compareResult==0){
                hasSameChild = true;
                break;
            }
        }
        require(!hasSameChild,"You cannot add duplicate child on certain node");
        require(msg.sender!=parentNode.creator || msg.sender == owner,"You cannot add validate your node by your self");
        
     
        Node memory newNode;
        newNode.name = _name;
        newNode.creator = msg.sender;
        newNode.number = nodeNumber;

        
        //copy the path to the parent in the flatten array of the new Item: ???
        for (uint i=0; i<pathToNode.length; i++) {
          flattenTree[newNode.number].push(pathToNode[i]);
        }
        
        //keeping the flatten array actual
        flattenTree[newNode.number].push(newNode.number);
        
        
         
        
        parentNode.children[nodeNumber] = newNode;
        parentNode.childrenKeys.push(newNode.number);
        
        emit AddingNode(msg.sender,newNode.number,_name);
        nodeNumber++;  
        
        return newNode.number;
    }
    
    
      enum ReseurceType {
        url,doc,docx,ppt,pptx, sol,img
    }
    
   function uintToString(uint v) internal pure returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - 1 - j];
        }
        str = string(s);
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
       // bytes32 uniqueIdentifier;
        
        //TODO: think about if should be tree or Graph???
        
        //related terms in format unique Identifier => node
        mapping(uint => Node)  children;
        
        //helper arrrays 
        uint[] childrenKeys;
        
      
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