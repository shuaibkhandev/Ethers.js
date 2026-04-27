import {useEffect} from 'react'
import { ethers } from 'ethers';

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



const App = () => {
  useEffect(()=>{
const writeSM = async () => {
  try {
    // 1. Check MetaMask
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    // 2. Connect wallet
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // 3. Create provider + signer
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const userAddress = await signer.getAddress();
    console.log("Connected wallet:", userAddress);

    // 4. Create contract instance
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );

    // =========================
    // 🔍 READ FROM CONTRACT
    // =========================
    const value = await contract.getValue();
    console.log("Stored value:", value.toString());

    const contractBal = await contract.contractBalance();
    console.log("Contract Balance:", contractBal.toString());

    // =========================
    // ✏️ WRITE TO CONTRACT
    // =========================
    const tx1 = await contract.setValue(5);
    await tx1.wait();
    console.log("Value updated to 5");

    // =========================
    // 💸 SEND ETH TO CONTRACT
    // =========================
    const tx2 = await contract.sendEtContract({
      value: ethers.parseEther("0.01"),
    });
    await tx2.wait();
    console.log("ETH sent to contract");

    // =========================
    // 💸 SEND ETH TO USER
    // =========================
    const tx3 = await contract.sendEthUser(
      userAddress, // sending back to self (example)
      {
        value: ethers.parseEther("0.005"),
      }
    );
    await tx3.wait();
    console.log("ETH sent to user");

  } catch (error) {
    console.error("Error:", error);
  }
};
  writeSM()
},[])
  return (
    <div>
      
    </div>
  )
}

export default App
