const SemanticNet = artifacts.require('./SemanticNet.sol')

contract('SemanticNet', function ([owner]) {
    let semanticWeb;
    beforeEach('setup contract for each test', async function () {
        semanticWeb = await SemanticNet.new()
    });

    it('has an owner', async function () {
        assert.equal(await semanticWeb.owner(), owner)
    });
})