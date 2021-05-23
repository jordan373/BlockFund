const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledProjMan = require('./build/ProjectManager.json');


const provider = new HDWalletProvider(
    'judge this dwarf rebel insane save tomorrow scrub brief detail blossom rabbit',
    'https://rinkeby.infura.io/v3/11fb63f43c3b4774be075f9e477e0d8b'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attempting to deploy from account', accounts[0]);
    const result = await new web3.eth.Contract(compiledProjMan.abi)
    .deploy({data: '0x' + compiledProjMan.evm.bytecode.object})
    .send({from: accounts[0], gas: '2000000'})

    console.log('contract deployed to', result.options.address);
};
deploy();