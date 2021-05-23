const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

console.log("test1");

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

console.log("test2");

const projectPath = path.resolve(__dirname, 'contracts', 'BlockFundProject.sol');
const source = fs.readFileSync(projectPath, 'utf8');

console.log("test3");

fs.ensureDirSync(buildPath);

console.log("test4");

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

console.log("test5");

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts;

//console.log(output);

console.log("test6");

for (let contractName in output['BlockFundProject']) {
    console.log(contractName);
    fs.outputJsonSync(
        path.resolve(buildPath, contractName + '.json'),
        output['BlockFundProject'][contractName]
    );

    console.log("test7");
}
