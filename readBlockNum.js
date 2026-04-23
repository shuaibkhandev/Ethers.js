const {ethers} = require("ethers")

const provider = new ethers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/5LHqGZsU3flV-QGr7omhC`);

const queryBlockchain = async () => {
    const currenBlock = await provider.getBlockNumber();
    console.log("Current Block Number is: ",currenBlock);
}

queryBlockchain();