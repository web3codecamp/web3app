
const main = async () => {
  const transaction = await hre.ethers.deployContract("Transactions");

  await transaction.waitForDeployment();

  console.log("Transactions was deployed to:", await transaction.getAddress());
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();
