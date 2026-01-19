const { ethers } = require("hardhat");
const config = require("./social_config.json");

async function main() {
    const social = await ethers.getContractAt("SocialNetwork", config.CONTRACT_ADDRESS);

    const count = await social.postCount();
    console.log(`Total Posts: ${count}`);

    // Fetch the last post
    if (count > 0) {
        const post = await social.getPost(count);
        console.log("\n--- Latest Post ---");
        console.log(`ID: ${post.id}`);
        console.log(`Author: ${post.author}`);
        console.log(`Content: ${post.content}`);
        console.log(`Tips Earned: ${ethers.formatEther(post.tipAmount)} ETH`);
        console.log(`Time: ${new Date(Number(post.timestamp) * 1000).toLocaleString()}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
