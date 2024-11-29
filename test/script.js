// Initialize Web3.js
let web3;
let selectedNetwork = null; // To keep track of the selected network (Ethereum or BNB)

window.onload = async () => {
    // Initialize Web3
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            // Request accounts if not connected yet
            await window.ethereum.request({ method: "eth_requestAccounts" });
        } catch (err) {
            console.error("User denied account access");
        }
    } else {
        alert("MetaMask is not installed. Please install it to continue.");
    }
};

// Function to check and switch network if necessary
async function checkAndSwitchNetwork(chainId) {
    const currentChainId = await web3.eth.getChainId();

    if (currentChainId !== chainId) {
        try {
            // Request to switch the network to the selected one
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: Web3.utils.toHex(chainId) }],
            });
            console.log("Network switched successfully");
        } catch (switchError) {
            if (switchError.code === 4902) {
                // If the network isn't available in MetaMask, we can prompt them to add it
                alert(`Please add the required network (ID: ${chainId}) to MetaMask.`);
            } else {
                console.error("Error switching network:", switchError);
            }
        }
    } else {
        console.log("You are already on the correct network.");
    }
}

// Network buttons click event listeners
document.getElementById("eth-network").addEventListener("click", async () => {
    selectedNetwork = "ethereum";
    const ethChainId = 1; // Mainnet Ethereum chain ID
    await checkAndSwitchNetwork(ethChainId);

    document.getElementById("doorDetails").textContent = "SWITCH TO Shibarium for Details..."
});

document.getElementById("bnb-network").addEventListener("click", async () => {
    selectedNetwork = "bnb";
    const bnbChainId = 56; // Mainnet Binance Smart Chain ID
    await checkAndSwitchNetwork(bnbChainId);
});

// Handle the purchase of tickets
document.getElementById("buy-tickets").addEventListener("click", async () => {
    const ticketCount = document.getElementById("ticket-count").value;

    if (!ticketCount || ticketCount <= 0) {
        alert("Please enter a valid number of tickets.");
        return;
    }

    if (selectedNetwork === "ethereum") {
        // Call Ethereum contract function (to be implemented)
        console.log("Buying tickets on Ethereum");
        // Example: buyTicketsOnEthereum(ticketCount);
    } else if (selectedNetwork === "bnb") {
        // Call Binance Smart Chain contract function (to be implemented)
        console.log("Buying tickets on BNB");
        // Example: buyTicketsOnBNB(ticketCount);
    } else {
        alert("Please select a network first.");
    }
});
