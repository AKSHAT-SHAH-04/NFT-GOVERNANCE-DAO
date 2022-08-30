const { ethers } = require('hardhat');
const hre = require('hardhat');
const { GOVERNANCE_ADDRESS, PROPOSAL_ID } = require('./addresses.js');


async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.attach(GOVERNANCE_ADDRESS);

  const checkState = await governance.state(PROPOSAL_ID);
  console.log(checkState);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
