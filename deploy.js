const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying Social Contract with:", deployer.address);

    const Social = await ethers.getContractFactory("SocialNetwork");
    const social = await Social.deploy();
    await social.waitForDeployment();
    const address = await social.getAddress();

    console.log(`SocialNetwork deployed at: ${address}`);

    // Save Config
    const config = { CONTRACT_ADDRESS: address };
    fs.writeFileSync("social_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
