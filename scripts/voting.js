const { ethers } = require('hardhat');
const hre = require('hardhat');

const {
  GOVERNANCE_ADDRESS,
  PROPOSAL_ID,
  TREASURY_ADDRESS,
} = require('./addresses.js');


async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.attach(GOVERNANCE_ADDRESS);

  const Treasury = await hre.ethers.getContractFactory('treasury');
  const treasur = await Treasury.attach(TREASURY_ADDRESS);

  await governance.connect(vote1).castVote(PROPOSAL_ID, 1);
  await governance.connect(vote2).castVote(PROPOSAL_ID, 1);
  await governance.connect(vote3).castVote(PROPOSAL_ID, 1);
  await governance.connect(vote4).castVote(PROPOSAL_ID, 1);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
