const { ethers } = require('hardhat');
const hre = require('hardhat');
const { GOVERNANCE_ADDRESS, TREASURY_ADDRESS } = require('./addresses.js');


async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.attach(GOVERNANCE_ADDRESS);

  const Treasury = await hre.ethers.getContractFactory('treasury');
  const treasur = await Treasury.attach(TREASURY_ADDRESS);

  // Create proposal
  const callPropose = await governance.propose(
    [TREASURY_ADDRESS],
    [0],
    [
      await treasur.interface.encodeFunctionData('withdrawFunds', [
        proposer.address,
        ethers.utils.parseUnits('1', 18),
      ]),
    ],
    'Buy an Estate'
  );
  // console.log(treasur.interface.encodeFunctionData('withdrawFunds', []));

  const txn = await callPropose.wait(1);
  // console.log(txn);

  // await ethers.provider.send('evm_mine');

  const propId = await txn.events[0].args.proposalId;

  console.log(propId);

  const checkState = await governance.state(propId);
  console.log(checkState);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
