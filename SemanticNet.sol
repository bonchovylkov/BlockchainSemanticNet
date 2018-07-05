
pragma solidity ^0.4.24;
import "github.com/Arachnid/solidity-stringutils/strings.sol";

//Represents entity in the Blockchain Semantic Net
contract Node {
    
    using strings for *;
    
   enum ReseurceType {
        url,doc,docx,ppt,pptx, sol
    }
    
    //the term
    //shoud be unique in it's own chain (containing parent names)
    //for example: 
    //Blockchain->Node->Transaction is OK
    //|>address -> Transaction is OK
    string public name;
    
    //keccak256 of the name + parent names recursivly 
    string public uniqueIdentifier;
    
    
    
    //related terms in format unique Identifier => node
    mapping(string => Node)  children;
    
    //helper arrrays 
    string[] public cheldrenKeys;
    
    function getCheldrenCount() public view  returns (uint) {
        return cheldrenKeys.length;
    }
  
    //ipfs hash of term resource
    mapping(string=>ReseurceType)  resourcesHashes;
    
    address public creator ;
    //can be positive or nagative value
    int votes;
    //The parent node if has any
    string  public parentNodeHash ;
    
    constructor(string _name,string _uniqueIdentifier,string  _parentNode) public {
        name = _name;
        uniqueIdentifier = _uniqueIdentifier;
        parentNodeHash = _parentNode;
        creator = msg.sender;
    }
    
    function addNode(string _uniqueIdentifier,  Node child) public {
        
        children[_uniqueIdentifier] = child;
        //this doesn't work
       // Node newNode = new Node(_name,_uniqueIdentifier,"0x12"); 
    }
    
    function getNodeInfo() public view returns (string,string,address,string,uint){
        return (name,uniqueIdentifier,creator,parentNodeHash,cheldrenKeys.length );
        
        //children.length can be return with helper array
    }
    
    //   function getNodeInfo(string nodeId) public view returns (string){
    //       Node child = children[nodeId];
          
    //       string memory openbracket = "{'name':'";
    //       string memory comma = "',";
    //       string memory closeBracket = "'}";
    //       string memory jsonResult = 
    //       openbracket.toSlice().concat(child.name.toSlice()).concat(comma.toSlice());
    //     //   + "'uniqueIdentifier':'" + child.uniqueIdentifier + "',"
    //     //     + "'creator':'" + child.creator + "',"
    //     //       + "'parentNodeHash':'" + child.parentNodeHash + "',"
    //             // "'cheldrenCount':'" + child.getCheldrenCount() + "'}";
    //       return jsonResult;
        
    //     //children.length can be return with helper array
    // }
    
    // //can't return mapping ... of course
    //  function getChildrenJson() public  returns (string){
    //     return "children";
        
    //     //children.length can be return with helper array
    // }
    
    
   function addResource(string resourceHash, uint resourceType) public {
       
        resourcesHashes[resourceHash] = ReseurceType(resourceType);
    }
    
    function removeResource(string resourceHash) public {
       
       //https://ethereum.stackexchange.com/questions/15277/how-to-delete-an-element-from-a-mapping
       delete resourcesHashes[resourceHash];
    }
    
}

contract BlockchainSemanticTerminologyNet {
    
  address private owner;
  uint private initialTokenSupply;
  mapping(address=> uint) private deposits;
  uint  private contractCreationTime;
  uint constant contractDurationSec = 60;
  
    modifier notExpired()
    {
        require(
            contractCreationTime + contractDurationSec > now,
            "Contract has expired."
        );
        // Do not forget the "_;"! It will
        // be replaced by the actual function
        // body when the modifier is used.
        _;
    }
  
  
  event ByTokens(address fromAddr, uint value);

  
    constructor(uint initalSupply) public {
        owner = msg.sender;
        contractCreationTime = block.timestamp;
        initialTokenSupply = initalSupply;
    }
    
    function buyTokens(uint amount) public notExpired returns  (uint)  {
        require(amount<initialTokenSupply);
        initialTokenSupply-=amount;
        
        deposits[msg.sender]+=amount;
        
        // Invoke the event to log its arguments
        emit ByTokens(msg.sender,amount); 
    }
    
    
      
    function getBalance() public view returns (uint)  {
        return deposits[msg.sender];
    }

}

//Getting ideas from
//http://www.introprogramming.info/english-intro-csharp-book/read-online/chapter-17-trees-and-graphs/
//https://medium.com/coinmonks/linked-lists-in-solidity-cfd967af389b