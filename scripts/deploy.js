const hre = require('hardhat');

async function main() {
  [proposer, executor, vote1, vote2, vote3, vote4, vote5] =
    await ethers.getSigners();

  const NFT = await hre.ethers.getContractFactory('NFT');
  const NFTCont = await NFT.deploy();

  await NFTCont.deployed();

  console.log('NFT deployed to:', NFTCont.address);

  const TimeLock = await hre.ethers.getContractFactory('TimeLock');
  const timeLock = await TimeLock.deploy(
    1,
    [],
    ['0x0000000000000000000000000000000000000000']
  );

  await timeLock.deployed();

  console.log('TimeLock deployed to:', timeLock.address);

  const Governance = await hre.ethers.getContractFactory('Governance');
  const governance = await Governance.deploy(
    NFTCont.address,
    timeLock.address
  );

  await governance.deployed();

  console.log('Governance deployed to:', governance.address);

  const Treasury = await hre.ethers.getContractFactory('treasury');
  const treasur = await Treasury.deploy();

  await treasur.deployed();

  console.log('Treasury Contract deployed to:', treasur.address);

  await treasur.transferOwnership(timeLock.address);

  await timeLock.grantRole(await timeLock.PROPOSER_ROLE(), governance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
