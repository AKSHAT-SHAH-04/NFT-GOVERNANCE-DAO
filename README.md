# DAO

## Contract: NFT.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0x7B8Bc476F7f40Dcc634B9872FA4E7Eba93Ce285E#code) at:

```script
0x7B8Bc476F7f40Dcc634B9872FA4E7Eba93Ce285E
```

This contract deploys an **ERC721 token with voting rights**.

- Name: "NFTToken"
- Symbol: "NTK"

- This ERC721 token will be used to vote on proposals created in the DAO contract.

- Users would need to call **delegate()** function and pass their own address as argument in order to create a snapshot of their voting power, as only holding the tokens does not give an address the equivalent voting power.

---

## Contract: Treasury.sol
- Contract deployed on [rinkeby test network]https://rinkeby.etherscan.io/address/0x3aF185cA7444dBE1a305E618071987Fe8D85Db4F) at:

```script
0x3aF185cA7444dBE1a305E618071987Fe8D85Db4F
```

- This contract will hold ether and ERC721 tokens and will be used to send ether or ERC721 tokens as donation to charities.

- The members of the DAO can create a proposal where they can specify the receiving address and the amount of ether/ ERC721 token to send as donation.

- If the DAO members pass in favor of the proposal, then the said amount will be sent to the charity address.

- The TimeLock contract is given the ownership of this contract, so that the only way of moving funds out is by creating a proposal and passing it.

---

## Contract: TimeLock.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0xE789BeC0Dc64915f605326be4a361647826c9F3b) at:

```script
0xE789BeC0Dc64915f605326be4a361647826c9F3b
```

- This contract is set as the **owner of the Treasury contract**.

- It sets a minimum delay time(number of blocks), that a passed proposal has to wait before getting executed.

- The DAO contract is set as the only PROPOSER, which means that only the DAO contract can suggest this contract to do a transaction through the Treasury contract.

- The Null Address is set as the EXECUTOR, which gives each and every address the right to execute a passed proposal, given that it has waited out the proposed delay time.

---

## Contract: Governance.sol

- Contract deployed on [rinkeby test network](https://rinkeby.etherscan.io/address/0x14eA1f366cD6c43aEA24354101b62187f26E7Ccd#code) at:

```script
0x14eA1f366cD6c43aEA24354101b62187f26E7Ccd
```

- This contract creates the DAO ecosystem in which an user can create a proposal and vote on it using the ERC20 BlazeToken.

- Users can create a proposal, cancel it, vote on it, queue it and execute it.

- The proposal stages are as follows:

```script
    Number          Stage

    0               Pending
    1               Active
    2               Canceled
    3               Defeated
    4               Succeeded
    5               Queued
    6               Expired
    7               Executed
```

---

- An user can interact with the **proposal()** function to create a new proposal, which returns the proposal id of the newly created proposal.

- Users can interact with the **castVote()** function to cast their vote on a proposal. It takes 2 arguments, the proposal id and user's choice.

- User has 3 choices when voting:

```script
    Choice      Meaning

    0           Against the proposal
    1           For/ In favor of the proposal
    2           Abstain
```

- If the proposal passes, then any user can interact with the **queue()** function to queue the proposal for execution.

- After that, when the delay period has passed, any user can interact with the **execute()** function which will execute the proposal and the funds will be sent to the charity.

---
---

### Screenshots

- NFT Contract Deploying and delegating the authority.

<img width="1440" alt="Screenshot 2022-08-05 at 12 02 49 PM" src="https://user-images.githubusercontent.com/86094155/183016132-83304ab4-dc6a-4e3e-9ef2-b2bc805fd204.png">



- Calling The Grant role to TimeLock Contract

<img width="1440" alt="Screenshot 2022-08-05 at 12 04 54 PM" src="https://user-images.githubusercontent.com/86094155/183016370-253e3a9d-19ed-4e7d-9c72-52f8b80b40a9.png">




- Creating a Proposal in The Governance Contract
<img width="1440" alt="Screenshot 2022-08-05 at 12 06 24 PM" src="https://user-images.githubusercontent.com/86094155/183016634-79d50080-5e5c-4bc9-8d78-be393af3149d.png">



- Casting The Vote For The Proposal
<img width="1440" alt="Screenshot 2022-08-05 at 12 06 24 PM" src="https://user-images.githubusercontent.com/86094155/183016736-0ca38c49-402c-4f85-8e53-07fbc3744014.png">



- Queueing The Proposal
<img width="1440" alt="Screenshot 2022-08-05 at 12 07 56 PM" src="https://user-images.githubusercontent.com/86094155/183016815-9558dced-af9d-4ce2-accd-01fb9da44aee.png">



- Executing The Proposal
<img width="1440" alt="Screenshot 2022-08-05 at 12 08 24 PM" src="https://user-images.githubusercontent.com/86094155/183016867-4823435d-df85-4154-987c-2e385fd77244.png">





### Example Proposal

- Created a proposal to buy an estate.
- Voting was done and the proposal passed.
- Then it was queued for execution.
- After that, the proposal was executed and Actions were taken with the voting medium being an NFT.

---


### LICENSE
UNKNOWN

### Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case.

```shell
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```