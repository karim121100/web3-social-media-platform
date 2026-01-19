const { ethers } = require("hardhat");
const config = require("./social_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const social = await ethers.getContractAt("SocialNetwork", config.CONTRACT_ADDRESS, user);

    console.log("Setting up profile...");
    
    const tx = await social.setProfile("CryptoKing", "Building the decentralized future.");
    await tx.wait();

    console.log("Profile Created Successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
