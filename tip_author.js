const { ethers } = require("hardhat");
const config = require("./social_config.json");

async function main() {
    const [_, tipper] = await ethers.getSigners(); // Use 2nd account
    const social = await ethers.getContractAt("SocialNetwork", config.CONTRACT_ADDRESS, tipper);

    const postId = 1; // Tipping the first post
    const tipAmount = ethers.parseEther("0.05"); // 0.05 ETH

    console.log(`Sending 0.05 ETH tip to author of Post ${postId}...`);

    const tx = await social.tipPost(postId, { value: tipAmount });
    await tx.wait();

    console.log("Tip sent successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
