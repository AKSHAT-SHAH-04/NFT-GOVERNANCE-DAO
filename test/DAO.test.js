const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('DAO Test', () => {
  let myNFT;
  let NFT;
  let TimeLock;
  let timeLock;
  let Treasury;
  let treasury;
  let Governance;
  let governance;
  let walletAddress;
  let propId;
  beforeEach(async () => {
    [owner, proposer, executor, vote1, vote2, vote3, vote4, vote5] =
      await ethers.getSigners();

    
    myNFT = await ethers.getContractFactory('NFT');
    NFT = await myNFT.deploy();
    await NFT.deployed();
    NFTAddress = NFT.address;

   
    TimeLock = await hre.ethers.getContractFactory('TimeLock');
    timeLock = await TimeLock.deploy(
      1,
      [],
      ['0x0000000000000000000000000000000000000000']
    );

    await timeLock.deployed();

    
    Governance = await hre.ethers.getContractFactory('Governance');
    governance = await Governance.deploy(NFT.address, timeLock.address);

    await governance.deployed();

    // Treasury Contract (wallet address for accept the ETH or withdraw)
    walletAddress = '0xb41b7589ae02a4594cd9314f6b500b387027250b';
    Treasury = await hre.ethers.getContractFactory('treasury');
    treasury = await Treasury.deploy();

    await treasury.deployed();

    // send ether to treasury
    const transactionHash = await owner.sendTransaction({
      to: treasury.address,
      value: ethers.utils.parseEther('1.0'),
    });

    await transactionHash.wait();

    console.log(transactionHash);

    await treasury.transferOwnership(timeLock.address);

    await NFT.safeMint(executor.address,"https://qph.cf2.quoracdn.net/main-qimg-92751987d7f1e6f35f643ba6f4050110-lq");
    await NFT.safeMint(vote1.address, "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg");
    await NFT.safeMint(vote2.address, "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80");
    await NFT.safeMint(vote3.address, "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80");
    await NFT.safeMint(vote4.address, "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHdvcmt8ZW58MHx8MHx8&w=1000&q=80");

    await NFT.connect(executor).delegate(executor.address);
    await NFT.connect(vote1).delegate(vote1.address);
    await NFT.connect(vote2).delegate(vote2.address);
    await NFT.connect(vote3).delegate(vote3.address);
    await NFT.connect(vote4).delegate(vote4.address);

    await timeLock.grantRole(
      await timeLock.PROPOSER_ROLE(),
      governance.address
    );
  });

  it('Should mint the NFT ', async () => {
    await NFT.safeMint(executor.address,"https://qph.cf2.quoracdn.net/main-qimg-92751987d7f1e6f35f643ba6f4050110-lq");
    await NFT.safeMint(vote1.address,"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg");
    await NFT.safeMint(vote2.address,"https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80");
    await NFT.safeMint(vote3.address, "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80");
    await NFT.safeMint(vote4.address, "https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHdvcmt8ZW58MHx8MHx8&w=1000&q=80");
  });

  it('Should delegate the NFT ', async () => {
    await NFT.connect(executor).delegate(executor.address);
    await NFT.connect(vote1).delegate(vote1.address);
    await NFT.connect(vote2).delegate(vote2.address);
    await NFT.connect(vote3).delegate(vote3.address);
    await NFT.connect(vote4).delegate(vote4.address);
  });

  it('Should grant the role ', async () => {
    await timeLock.grantRole(
      await timeLock.PROPOSER_ROLE(),
      governance.address
    );
  });

  it('Should propose the DAO ', async () => {
    const txnPro = await governance.propose(
      [treasury.address],
      [0],
      [
        treasury.interface.encodeFunctionData('withdrawFunds', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      'Buy an Estate'
    );

    // await network.provider.send('evm_mine');
    const txn = await txnPro.wait();

    propId = await txn.events[0].args.proposalId;
    console.log(propId);

    await governance.connect(vote1).castVote(propId, 1);
    await governance.connect(vote2).castVote(propId, 1);
    await governance.connect(vote3).castVote(propId, 1);
    await governance.connect(vote4).castVote(propId, 1);

    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');
    await network.provider.send('evm_mine');

    // await network.provider.send('evm_mine');

    // proposer.address,

    const state1 = await governance.state(propId);
    console.log(state1);

    // latest block
    // const latestBlock = await hre.ethers.provider.getBlock('latest');
    // console.log(latestBlock);

    // const deadline = await governance.proposalDeadline(propId);
    // console.log(deadline);

    await governance.queue(
      [treasury.address],
      [0],
      [
        await treasury.interface.encodeFunctionData('withdrawFunds', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Buy an Estate'))
    );

    const propState = await governance.state(propId);
    console.log(propState);

    await network.provider.send('evm_mine');

    await governance.execute(
      [treasury.address],
      [0],
      [
        treasury.interface.encodeFunctionData('withdrawFunds', [
          owner.address,
          ethers.utils.parseUnits('1', 18),
        ]),
      ],
      ethers.utils.keccak256(ethers.utils.toUtf8Bytes('Buy an Estate'))
    );

    const propState1 = await governance.state(propId);
    console.log(propState1);
  });
});
