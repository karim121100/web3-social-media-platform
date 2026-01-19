const { ethers } = require("hardhat");
const config = require("./social_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const social = await ethers.getContractAt("SocialNetwork", config.CONTRACT_ADDRESS, user);

    console.log("Publishing new post...");

    const content = "Hello Web3! This is my first immutable post on the blockchain. #GM";
    
    const tx = await social.createPost(content);
    await tx.wait();

    console.log("Post published to chain!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
