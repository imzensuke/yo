// Initialize Web3 instances for both Ethereum and Shibarium
const ethWeb3 = new Web3(window.ethereum); // Ethereum Web3 instance
const shibWeb3 = new Web3(window.ethereum); // Shibarium Web3 instance

// Define Ethereum and Shibarium contract ABIs and addresses
const ethContractABI = [...];  // Add the Ethereum contract ABI here
const ethContractAddress = '0x...';  // Replace with Ethereum contract address
const shibContractABI = [...];  // Add the Shibarium contract ABI here
const shibContractAddress = '0x...';  // Replace with Shibarium contract address

// Initialize contract instances
let activeContract = null; // The active contract instance

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
            console.log("Switched to Shibarium network");
        } catch (error) {
            console.error("Error switching to Shibarium:", error);
            alert("Please make sure you have the Shibarium network added in MetaMask.");
        }
    }
}

// Handle network change from dropdown
document.getElementById('network-select').addEventListener('change', (event) => {
    const selectedNetwork = event.target.value; // Get selected network (eth or shib)
    switchNetwork(selectedNetwork);
});

// Listen for ticket purchases and interact with the active contract
async function listenForTicketPurchases() {
    if (activeContract) {
        activeContract.events.TicketPurchased()
            .on('data', (event) => {
                const { participant, count } = event.returnValues;
                console.log(`Ticket purchased by ${participant}, Number of tickets: ${count}`);
                // Additional logic to handle ticket purchase, update UI, etc.
            })
            .on('error', (error) => {
                console.error("Error listening for ticket purchases:", error);
            });
    } else {
        console.error("No active contract selected.");
    }
}

// Initialize the page by setting up the default network and contract
(async () => {
    const currentNetwork = await ethWeb3.eth.net.getId();
    if (currentNetwork === networkIds.eth) {
        activeContract = new ethWeb3.eth.Contract(ethContractABI, ethContractAddress);
        console.log("Connected to Ethereum network");
    } else if (currentNetwork === networkIds.shib) {
        activeContract = new shibWeb3.eth.Contract(shibContractABI, shibContractAddress);
        console.log("Connected to Shibarium network");
    }

    // Start listening for ticket purchases
    listenForTicketPurchases();
})();
