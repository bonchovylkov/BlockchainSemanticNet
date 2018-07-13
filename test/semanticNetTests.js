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
        assert.equal((await semanticWeb.mainNode())[1], owner);
        assert.equal((await semanticWeb.mainNode())[2], 0); //initial votes
       
        assert.equal((await semanticWeb.mainNode())[4], 0); //first number
        
    });

    it('nodes length update', async () => {
        assert.equal(await semanticWeb.nodeNumber() >0, true);
    });

    it('flatten tree set', async  ()=> {
        
        //calling mapping from uint => []
        var firstId = await semanticWeb.flattenTree.call(0,0); // gets the flattenTree[1][1]
        //console.log(firstId.toNumber());
        
        assert.equal(firstId.toNumber(), (await semanticWeb.mainNode())[4].toNumber());

    });

    it('add node updates count', async  ()=> {
        
        var currentCount = (await semanticWeb.nodeNumber()).toNumber();
        //console.log(currentCount);
        
        await semanticWeb.addNode.call(3,"test");
        //await semanticWeb.addNode({parentNumber:3,_name:"test"});
        assert.equal(currentCount++, (await semanticWeb.nodeNumber()).toNumber());
    });


    it('get node returns data', async  ()=> {
        
        
       var data = await semanticWeb.getNodeJson.call(1);
       assert.equal("Block", data[0]);
       assert.equal(owner, data[1]);
      // assert.equal("Block", data[0]);
      var children =  data[3].split(',');
      children = children.filter(function(n){ return n != "" }); 
      
       assert.equal(true, children.length > 0);

    });


    it('remove node by creator works', async  ()=> {
        
        var data = await semanticWeb.getNodeJson.call(1);
        var children =  data[3].split(',');
        children = children.filter(function(n){ return n != "" }); 

        await semanticWeb.removeNode.call(1,2);
        
        var dataAfter = await semanticWeb.getNodeJson.call(1);
        var childrenAfter =  dataAfter[3].split(',');
        childrenAfter = childrenAfter.filter(function(n){ return n != "" && n != undefined  && n != null}); 
        //console.log(childrenAfter);

        assert.equal(children.length--, childrenAfter.length);

    });

    it('vote positive', async  ()=> {
        
        var data = await semanticWeb.getNodeJson.call(1);
        (await semanticWeb.vote(true,0));

        var dataAfterVote = await semanticWeb.getNodeJson.call(1);
        assert.equal(data[4]++, dataAfterVote[4]);

    });

    it('add resource', async  ()=> {
        

       var result = await semanticWeb.addResources.call(0,1,"QmSQ2xakSEG6KXvRGNp1o1amgd7A69BbeoLP9h4t1P9hYk","image/jpeg");
       setTimeout(async () => {
        var data = await semanticWeb.getNodeJson.call(0);
        console.log(data);
        
        assert.equal(data[2], "QmSQ2xakSEG6KXvRGNp1o1amgd7A69BbeoLP9h4t1P9hYk-image/jpeg,");
      }, 1000);
       
        

    });
})