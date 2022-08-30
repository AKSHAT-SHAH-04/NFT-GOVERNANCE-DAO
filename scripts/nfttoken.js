const { ethers } = require("hardhat");
const { NFT_ADDRESS } = require("./addresses");

async function main() {
 const [vote1,vote2,vote3,vote4] = await ethers.getSigners();

 const NFT = await ethers.getContractFactory("NFT");
 const NFTCont = await NFT.attach(NFT_ADDRESS);

  await NFTCont.safeMint(vote1.address,"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg");
  await NFTCont.safeMint(vote2.address,"https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80");
  await NFTCont.safeMint(vote3.address,"https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80");
  await NFTCont.safeMint(vote4.address,"https://images.unsplash.com/photo-1483389127117-b6a2102724ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHdvcmt8ZW58MHx8MHx8&w=1000&q=80");

  console.log(`Minting NFT to users`);

  await NFTCont.connect(vote1).delegate(vote1.address);
  await NFTCont.connect(vote2).delegate(vote2.address);
  await NFTCont.connect(vote3).delegate(vote3.address);
  await NFTCont.connect(vote4).delegate(vote4.address);


 console.log(`Delegated NFT to users`);
}

main()
 .then(() => process.exit(0))
 .catch((error) => {
  console.error(error);
  process.exit(1);
 });