const { ethers } = require("hardhat");
const config = require("./social_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const social = await ethers.getContractAt("SocialNetwork", config.CONTRACT_ADDRESS);

    const profile = await social.profiles(user.address);

    if (profile.exists) {
        console.log("--- User Profile ---");
        console.log(`Username: ${profile.username}`);
        console.log(`Bio: ${profile.bio}`);
    } else {
        console.log("No profile found for this address.");
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
