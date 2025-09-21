const Web3TalentChain = artifacts.require("Web3TalentChain");

module.exports = function(deployer) {
  deployer.deploy(Web3TalentChain);
};