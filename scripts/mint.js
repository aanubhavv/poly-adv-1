// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/rawrNFT.sol/rawrNFT.json");
require("dotenv").config();

const tokenAddress = "0xE153Cbba8732236c3b5e58120731f12ec84f9260"; // place your erc20 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x9BD5EE362566B0eB960fD9Ad7975119B09CD9264"; // place your public address for your wallet here

async function main() {
  const imageUrls = [
    "https://bafybeihfa4kxlbq7rq364qi76kq3xpg4ot2fpzk6qxpgqc7wboji2atgry.ipfs.dweb.link/",
    "https://bafybeiep5f5nwruxsmbi4pgiizdm7t4u222uy26yg7o4ds2zm5syptwdsy.ipfs.dweb.link/",
    "https://bafybeibyr5tc4qkvftb47cpiicfwyxnerxlujhdrcuf4orkzd7gblw3ooe.ipfs.dweb.link/",
    "https://bafybeif272oslaqvdjma4c7nk3p4nnq2gsjkdcoufgpkp74skl7g3w4c24.ipfs.dweb.link/",
    "https://bafybeibffxqcgdel6ca5p637q5pkfdwv7boodr64bc57dp6cgr77g5ihy4.ipfs.dweb.link/",
  ];

  const prompts = [
    "imagine an image of super snake with 7 heads. Make it a deity with super powers",
    "imagine an image of an eagle soaring through the sky, with magical super power aura around it",
    "imagine an image of a ninja in shadowy background with a shiny and reflecting blade",
    "imagine an image of earth. Make the earth wear goggles driving a kart",
    "imagine an image of a cat as a superman with glowing eyes and super energy beam with super power aura",
  ];

  const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

  const tx = await token.mintNft(imageUrls, prompts);
  await tx.wait();

  console.log(`You now have minted ${imageUrls.length} NFTs`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
