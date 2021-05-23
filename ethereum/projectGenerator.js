import web3 from './web3';
import ProjectManager from './build/ProjectManager.json';

const instance = new web3.eth.Contract(
    ProjectManager.abi, 
    '0x8FF209b2902e6141525339E7F0F83c065cE4FF68'
);

export default instance;
