const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
//const {interface, bytecode} = require("../compile.js");

const compiledProjMan = require('../ethereum/build/ProjectManager.json');
const compiledProj = require('../ethereum/build/Project.json');
const { strictEqual } = require('assert');

let accounts;
let project_manager;
let projectAddr;
let project;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    project_manager = await new web3.eth.Contract(compiledProjMan.abi)
        .deploy({data: '0x' + compiledProjMan.evm.bytecode.object})
        .send({from: accounts[0], gas: '1000000'});

    await project_manager.methods.createProject('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [projectAddr] = await project_manager.methods.get_deployed_projects().call();
    project = await new web3.eth.Contract(
        compiledProj.abi,
        projectAddr
    );
});

describe('Projects', () => {
    it('deploys a project manager and project', () => {
        assert.ok(project_manager.options.address);
        assert.ok(project.options.address);
    });

    it('marks caller as the project manager', async () => {
        const manages = await project.methods.contract_manager().call();
        assert.strictEqual(accounts[0], manages);
    });

    it('allows users to donate money and adds them as approvers', async () => {
        await project.methods.donate().send({
            value: '200',
            from: accounts[1]
        });
        const isDonor = await project.methods.approving_donors(accounts[1]).call();
        assert(isDonor);
    })

    it('requires a min dontation', async () => {
        try {
            await project.methods.donate().send({
                value: '5',
                from: accounts[1]
            });
            assert(false);
        } catch (err) {
            assert(err);
        }
    })
    it('allows a manager to make a payment request', async () => {
        await project.methods.createReq(accounts[1], 'buy item', '100').send({
            from: accounts[0],
            gas: '1000000'
        });
        const request = await project.methods.requests(accounts[1]).call();
        strictEqual('buy item', request.desc);
    });
});