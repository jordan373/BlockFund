var IPFS_BF = artifacts.require("ethereum/contracts/BlockFundProject.sol");
module.exports = function(deployer) {
    deployer.deploy(IPFS_BF);
}