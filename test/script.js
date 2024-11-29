// Initialize Web3 instances for both Ethereum and Shibarium
const ethWeb3 = new Web3(window.ethereum); // Ethereum Web3 instance
const shibWeb3 = new Web3(window.ethereum); // Shibarium Web3 instance

// Define Ethereum and Shibarium contract ABIs and addresses
const ethContractABI = [];  // Add the Ethereum contract ABI here
const ethContractAddress = '';  // Replace with Ethereum contract address
const shibContractABI = [{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"addRewardToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTickets","type":"uint256"}],"name":"buyTicket","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endRaffle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_ticketToken","type":"address"},{"internalType":"address[]","name":"_rewardTokens","type":"address[]"},{"internalType":"uint256[]","name":"_rewardAmounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"raffleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"winner","type":"address"}],"name":"RaffleEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"raffleId","type":"uint256"}],"name":"RaffleStarted","type":"event"},{"inputs":[{"internalType":"address","name":"add","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"registerParticipant","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"raffleId","type":"uint256"},{"indexed":false,"internalType":"address","name":"participant","type":"address"}],"name":"TicketBought","type":"event"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"},{"internalType":"uint256","name":"newAmount","type":"uint256"}],"name":"updateRewardAmount","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currentRaffleId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardDetails","outputs":[{"internalType":"address[]","name":"","type":"address[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"getTicketsBoughtByAddress","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalTicketsBought","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"participants","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardAmounts","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rewardTokens","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ticketPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"ticketsBought","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ticketToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalEntries","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];  // Add the Shibarium contract ABI here
const shibContractAddress = '0x4B5A30e46a688a3E5bD850B75146C3188b8E101D';// Replace with Shibarium contract address
const tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"},{"name":"decimals","type":"uint8"},{"name":"totalSupply","type":"uint256"},{"name":"feeReceiver","type":"address"},{"name":"tokenOwnerAddress","type":"address"}],"payable":true,"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
const shibShibAddress = '0x495eea66B0f8b636D441dC6a98d8F5C3D455C4c0';
const shibEthAddress = '0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce';

// Initialize contract instances
let activeContract = null; // The active contract instance
let activeToken = null;

// Define network IDs for Ethereum and Shibarium
const networkIds = {
    eth: 1,  // Ethereum mainnet ID
    shib: 109, // Shibarium mainnet ID (chainId = 109)
};

// Function to switch network and update contract
async function switchNetwork(selectedNetwork) {
    const currentNetwork = await ethWeb3.eth.net.getId(); // Check current network

    // If the selected network is Ethereum (ETH) and current is not ETH
    if (selectedNetwork === 'eth' && currentNetwork !== networkIds.eth) {
        try {
            // Request MetaMask to switch to Ethereum
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x1' }], // 0x1 is the chainId for Ethereum
            });

            // Set the active contract to Ethereum contract
            activeContract = new ethWeb3.eth.Contract(ethContractABI, ethContractAddress);
            activeToken = new ethWeb3.eth.Contract(tokenABI, shibEthAddress);
            console.log("Switched to Ethereum network");
        } catch (error) {
            console.error("Error switching to Ethereum:", error);
            alert("Please make sure you have the Ethereum network added in MetaMask.");
        }
    }

    // If the selected network is Shibarium (SHIB) and current is not Shibarium
    if (selectedNetwork === 'shib' && currentNetwork !== networkIds.shib) {
        try {
            // Request MetaMask to switch to Shibarium
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x6d' }], // 0x6d is the chainId for Shibarium (109)
            });

            // Set the active contract to Shibarium contract
            activeContract = new shibWeb3.eth.Contract(shibContractABI, shibContractAddress);
            activeToken = new shibWeb3.eth.Contract(tokenABI, shibShibAddress);
            console.log("Switched to Shibarium network");
        } catch (error) {
            console.error("Error switching to Shibarium:", error);
            alert("Please make sure you have the Shibarium network added in MetaMask.");
        }
    }
}

document.getElementById("eth-network").addEventListener("click", async () => {
    selectedNetwork = "eth";
    const ethChainId = 1; // Mainnet Ethereum chain ID
    switchNetwork(selectedNetwork);
});

document.getElementById("bnb-network").addEventListener("click", async () => {
    selectedNetwork = "shib";
    const bnbChainId = 109; // Mainnet Binance Smart Chain ID
    switchNetwork(selectedNetwork);
});

// Function to buy tickets
async function buyTickets(ticketCount) {
    if (!activeContract) {
        console.error("No active contract selected.");
        return;
    }

    // Get the user's address (from MetaMask)
    const accounts = await ethWeb3.eth.getAccounts();
    const userAddress = accounts[0];

    // Ensure the user has selected a valid ticket count
    if (ticketCount <= 0) {
        alert("Please select a valid number of tickets.");
        return;
    }

    // Estimate the gas required for the transaction
    try {
        const ticketPrice = await activeContract.methods.ticketPrice().call(); // Get ticket price from the contract

        // Prepare the transaction to buy tickets
        const tx = activeContract.methods.buyTicket(ticketCount).send({from: userAddress}).then( function (result) {
            console.log(result);
            alert("Bought tickets!");
        });// Assuming `buyTickets` is a function in your contract
    } catch (error) {
        console.error("Error buying tickets:", error);
        alert("An error occurred while buying tickets. Please try again.");
    }
}

document.getElementById('approveShib').addEventListener("click", async () => {
    const accounts = await ethWeb3.eth.getAccounts();
    const userAddress = accounts[0];
    const event = activeToken.methods.approve("0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce","100000000000000000000000000000").send({from: userAddress }).then(function (result) {
        console.log(result);
    });
});

// Example usage: Buy 5 tickets
document.getElementById('buy-tickets').addEventListener("click", async () => {
    const ticketCount = parseInt(document.getElementById('ticket-count').value); // Get ticket count from input field
    buyTickets(ticketCount); // Call the function to buy tickets
});

// Initialize the page by setting up the default network and contract
(async () => {
    const currentNetwork = await ethWeb3.eth.net.getId();
    if (currentNetwork === networkIds.eth) {
        activeContract = new ethWeb3.eth.Contract(ethContractABI, ethContractAddress);
        activeToken = new ethWeb3.eth.Contract(tokenABI, shibEthAddress);
        console.log("Connected to Ethereum network");
    } else if (currentNetwork === networkIds.shib) {
        activeContract = new shibWeb3.eth.Contract(shibContractABI, shibContractAddress);
        activeToken = new shibWeb3.eth.Contract(tokenABI, shibShibAddress);
        console.log("Connected to Shibarium network");
    }
})();
