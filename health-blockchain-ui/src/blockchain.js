import { ethers } from "ethers";
// import deployedAddress from "./deployedAddress.json"; // ✅ importing deployed address from src
import deployed from "./deployedAddress.json";
const CONTRACT_ADDRESS = deployed.contractAddress;


// const CONTRACT_ADDRESS = deployedAddress.address;

const ABI = [ 
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "patient",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "age",
        "type": "uint256"
      }
    ],
    "name": "RecordAdded",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "_name", "type": "string" },
      { "internalType": "uint256", "name": "_age", "type": "uint256" },
      { "internalType": "string", "name": "_gender", "type": "string" },
      { "internalType": "string", "name": "_allergies", "type": "string" },
      { "internalType": "string", "name": "_history", "type": "string" }
    ],
    "name": "addMedicalRecord",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_patient", "type": "address" }
    ],
    "name": "getMedicalRecord",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "name", "type": "string" },
          { "internalType": "uint256", "name": "age", "type": "uint256" },
          { "internalType": "string", "name": "gender", "type": "string" },
          { "internalType": "string", "name": "allergies", "type": "string" },
          { "internalType": "string", "name": "history", "type": "string" }
        ],
        "internalType": "struct HealthRecord.Record",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Function to connect MetaMask
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      return accounts[0];
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  } else {
    alert("Please install MetaMask");
  }
};

// Get contract instance
export const getEthereumContract = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  } else {
    console.log("Ethereum wallet not detected");
    return null;
  }
};
