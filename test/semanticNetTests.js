const SemanticNet = artifacts.require('./SemanticNet.sol')

contract('SemanticNet', function ([owner]) {
    let semanticWeb;
    beforeEach('setup contract for each test', async function () {
        semanticWeb = await SemanticNet.new();
    });

    it('has an owner', async  ()=> {
        assert.equal(await semanticWeb.owner(), owner);
    });

    it('main node setup', async  () =>{

       // new Promise(() => console.log(JSON.stringify(await semanticWeb.mainNode())));
       // console.log(JSON.stringify(await semanticWeb.mainNode()));
    //    ["Blockchain","0xfa8871e962875d078135f1c5b27b0f184ab6f4dff8641dd81032226ea0ae9e8c",
    //    "0x627306090abab3a6e1400e9345bc60c78a8bef57","0","0x0000000000000000000000000000000000000000000000000000000000000000","0"]
        assert.equal((await semanticWeb.mainNode())[0], "Blockchain");
        assert.equal((await semanticWeb.mainNode())[1].length, 66);
        assert.equal((await semanticWeb.mainNode())[2], owner);
        assert.equal((await semanticWeb.mainNode())[3], 0);
        
    });

    it('nodes length update', async () => {
        assert.equal(await semanticWeb.nodeNumber(), 4);
    });

    it('flatten tree set', async  ()=> {
        
        //calling mapping from uint => []
        var firstId = await semanticWeb.flattenTree.call(0,0);
        assert.equal(firstId, (await semanticWeb.mainNode())[1]);

    });

    it('add node updates count', async  ()=> {
        
        var currentCount = (await semanticWeb.mainNode())[1];
        await semanticWeb.addNode.call(3,"test");
        //await semanticWeb.addNode({parentNumber:3,_name:"test"});
        assert.equal(currentCount++, (await semanticWeb.mainNode())[1]);
    });


    it('get node returns data', async  ()=> {
        
        
       var data = await semanticWeb.getNodeJson.call(1);
       assert.equal("Block", data[0]);
       assert.equal(owner, data[1]);
      // assert.equal("Block", data[0]);
       assert.equal("Transaction,", data[3]);
        //await semanticWeb.addNode({parentNumber:3,_name:"test"});
        //assert.equal(currentCount++, (await semanticWeb.mainNode())[1]);
    });
})