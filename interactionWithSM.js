const {ethers} = require("ethers");

const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/bGsBw4Fep9G8mSA0YAGq9");
const contractAddress = "0x2810eC661deFB92DCEdBc5829b66d283A07B97e8";
const contractABI = [
	{
		"inputs": [],
		"name": "sendEtContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "sendEthUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "accountBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const contractInteraction = async () => {
    const walletContract = new ethers.Contract(contractAddress, contractABI, provider);

	const contractName = await walletContract.name();
	console.log(contractName);
	const getValue = await walletContract.getValue();
	console.log(getValue);
	const contractBalance = await walletContract.contractBalance();
	console.log(contractBalance);
	const accountBalance = await walletContract.accountBalance("0x39497504303b93Ae6B58fd16eB265395F4C12582");
	console.log(accountBalance);
	
	
	
}

contractInteraction();
