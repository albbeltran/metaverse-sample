import abi from "./abi/abi.json" assert {type: "json"};

const blockchain = new Promise((resolve, reject) => {

    // if Metamask is not available
    if(typeof window.ethereum == 'undefined') {
        reject("You should install Metamask to use it!");

        // Web3 instance
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(abi, 0x1Bb3022900e4eb49B1E94Aa265E3E6bae393BD4F);

        // Get my Metamask address
        web3.eth.requestAccounts().then((accounts) => {
            console.log("My account is ", accounts[0])
        });

        // Get the current supply of NFT Tokens
        web3.eth.requestAccounts().then((accounts) => {
            // We use .call because totalSupply is a view function
            contract.methods.totalSupply().call({from: accounts[0]}).then(supply => {
                console.log("-> Current supply of NFT Tokens is: ", supply);
            });
        });

        // Get the maximum supply of NFT Tokens
        web3.eth.requestAccounts().then((accounts) => {
            // We call the public variable maxSupply since it has a default getter
            contract.methods.maxSupply().call({from: accounts[0]}).then(maxSupply => {
                console.log("-> Maximum supply of NFT Tokens is: ", maxSupply);
            });
        });

        // Your buildings made in the Metaverse
        web3.eth.requestAccounts().then((accounts) => {
            // We call the public variable maxSupply since it has a default getter
            contract.methods.getOwnerBuildings().call({from: accounts[0]}).then(buildings => {
                console.log("-> Your buildings: ", buildings);
            });
        });

        // Get all the buildings made in the Metaverse
        web3.eth.requestAccounts().then((accounts) => {
            // Get the number of buildings
            contract.methods.totalSupply().call({from: accounts[0]}).then(supply => {
                // Get the buildings
                contract.methods.getBuildings().call({from: accounts[0]}).then(data => {
                    resolve({supply: supply, building: data})
                });
            });
        });
    }
});