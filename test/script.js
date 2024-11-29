// Import Web3.js
let web3;

// DOM Elements
const chainSelector = document.getElementById("chain-selector");
const connectWalletBtn = document.getElementById("connect-wallet");
const walletAddressEl = document.getElementById("wallet-address");
const buyTicketsBtn = document.getElementById("buy-tickets");
const ticketAmountInput = document.getElementById("ticket-amount");
const raffleStatusEl = document.getElementById("raffle-status");
const totalTicketsEl = document.getElementById("total-tickets");
const latestWinnerEl = document.getElementById("latest-winner");

// App State
let selectedChain = "1"; // Default to Ethereum
let walletAddress = "";

// Chain Selector
chainSelector.addEventListener("change", (e) => {
  selectedChain = e.target.value;
  console.log(`Selected Chain: ${selectedChain}`);
});

// Connect Wallet
connectWalletBtn.addEventListener("click", async () => {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      walletAddress = accounts[0];
      walletAddressEl.textContent = `Wallet Address: ${walletAddress}`;
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  } else {
    alert("MetaMask is not installed!");
  }
});

// Buy Tickets
buyTicketsBtn.addEventListener("click", async () => {
  if (!walletAddress) {
    alert("Please connect your wallet first!");
    return;
  }

  const ticketAmount = parseInt(ticketAmountInput.value);
  if (isNaN(ticketAmount) || ticketAmount <= 0) {
    alert("Enter a valid ticket amount!");
    return;
  }

  // Example: Contract ABI and Address (Replace these)
  const contractABI = []; // Your contract ABI here
  const contractAddress =
    selectedChain === "1"
      ? "0xYourEthereumContractAddress"
      : "0xYourBNBContractAddress";

  try {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const ticketPrice = web3.utils.toWei("0.01", "ether"); // Replace with your ticket price logic
    const totalCost = ticketPrice * ticketAmount;

    const tx = await contract.methods.buyTickets(ticketAmount).send({
      from: walletAddress,
      value: totalCost,
    });

    console.log("Transaction successful", tx);
    alert("Tickets purchased successfully!");

    // Update UI (example)
    raffleStatusEl.textContent = "Status: Active";
    totalTicketsEl.textContent = "Total Tickets Bought: Updated";
  } catch (error) {
    console.error("Transaction failed", error);
    alert("Failed to buy tickets!");
  }
});
