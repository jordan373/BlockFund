const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const projectPath = path.resolve(__dirname, 'contracts', 'BlockFundProject.sol');
const source = fs.readFileSync(projectPath, 'utf8');

fs.ensureDirSync(buildPath);

const input = {
    language: 'Solidity',
    sources: {
        ['BlockFundProject']: {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

//console.log(output);

for (let contractName in output['BlockFundProject']) {
    console.log(contractName);
    fs.outputJsonSync(
        path.resolve(buildPath, contractName + '.json'),
        output['BlockFundProject'][contractName]
    );
}
