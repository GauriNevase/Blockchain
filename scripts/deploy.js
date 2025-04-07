// scripts/deploy.js
const fs = require("fs");
const path = require("path");

async function main() {
  const HealthRecord = await ethers.getContractFactory("HealthRecord");
  const contract = await HealthRecord.deploy();
  await contract.waitForDeployment();

  const deployedAddress = await contract.getAddress();
  console.log("✅ Contract deployed at:", deployedAddress);

  // Path to frontend location (adjust if different)
  const frontendPath = path.join(__dirname, "../health-blockchain-ui/src/deployedAddress.json");

  // Save deployed address to frontend
  fs.writeFileSync(
    frontendPath,
    JSON.stringify({ contractAddress: deployedAddress }, null, 2)
  );

  console.log("📦 Contract address saved to deployedAddress.json");
}

main().catch((error) => {
  console.error("❌ Deployment error:", error);
  process.exitCode = 1;
});
