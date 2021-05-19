import web3 from './web3';
import ProjectManager from './build/ProjectManager.json';

const instance = new web3.eth.Contract(
    ProjectManager.abi, 
    '0x2929f91E80Dee8b96EdB8d0e4bF0857991791E21'
);

export default instance;
