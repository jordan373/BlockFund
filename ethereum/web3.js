import Web3 from 'web3';

let web3;

const getProvider = async () => {
    await window.web3.currentProvider.enable(); // request authentication
};

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
     // means we are in browser, and metamask is running.
     console.log("metamask op 1");
     web3 = new Web3(window.ethereum);
     getProvider();

} else {
    // we are in the server, or user is not running metamask.
    console.log("metamask op 2");
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/11fb63f43c3b4774be075f9e477e0d8b'
    );
    web3 = new Web3(provider);
}



export default web3;