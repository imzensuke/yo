// Web3 Initialization
let web3;
let selectedNetwork = '';

// Contract addresses for Ethereum and Binance Smart Chain
const ETH_CONTRACT_ADDRESS = '0xYourEthereumContractAddress';
const BNB_CONTRACT_ADDRESS = '0xYourBinanceContractAddress';

// ABI (replace this with your actual ABI)
const CONTRACT_ABI = [
    // Add your contract ABI here
];

// DOM Elements
const ticketCountInput = document.getElementById('ticket-count');
const statusValue = document.getElementById('status-value');
const ethNetworkButton = document.getElementById('eth-network');
const bnbNetworkButton = document.getElementById('bnb-network');
const buyTicketsButton = document.getElementById('buy-tickets');

// Connect to Metamask and set network
async function connectWallet(network) {
    if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask!');
        return;
    }

    try {
        // Request wallet connection
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Set selected network
        selectedNetwork = network;
        alert(`${network} network selected. Wallet connected.`);
        console.log(account);
    } catch (error) {
        console.error('Wallet connection failed:', error);
        alert('Failed to connect wallet.');
    }
}

// Interact with the selected contract
async function buyTickets() {
    if (statusValue.innerText !== 'Live') {
        alert('The raffle is currently paused. Please try again later!');
        return;
    }

    const ticketCount = parseInt(ticketCountInput.value, 10);
    if (isNaN(ticketCount) || ticketCount <= 0) {
        alert('Please enter a valid number of tickets.');
        return;
    }

    if (!web3) {
        alert('Please connect your wallet first.');
        return;
    }

    const contractAddress =
        selectedNetwork === 'Ethereum'
            ? ETH_CONTRACT_ADDRESS
            : BNB_CONTRACT_ADDRESS;

    const contract = new web3.eth.Contract(CONTRACT_ABI, contractAddress);

    try {
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];

        // Call the smart contract method to buy tickets
        const ticketPrice = await contract.methods.ticketPrice().call(); // Adjust if ticket price is a variable
        const totalCost = ticketPrice * ticketCount;

        await contract.methods
            .buyTickets(ticketCount)
            .send({ from: account, value: totalCost });

        alert(`Successfully bought ${ticketCount} ticket(s)!`);
    } catch (error) {
        console.error('Error during ticket purchase:', error);
        alert('Failed to buy tickets. Please try again.');
    }
}

// Event Listeners
ethNetworkButton.addEventListener('click', () => connectWallet('Ethereum'));
bnbNetworkButton.addEventListener('click', () => connectWallet('Binance Smart Chain'));
buyTicketsButton.addEventListener('click', buyTickets);
