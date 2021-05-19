// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ProjectManager {
    address[] public deployedProjects;
    
    function createProject(uint min) public {
        Project newProject = new Project(msg.sender, min);
        address newProjAddr = address(newProject);
        deployedProjects.push(newProjAddr);
    }
    
    function get_deployed_projects() public view returns (address[] memory) {
        return deployedProjects;
    }
}

contract Project {
    struct Request {
        address receiver;
        string desc;
        uint val;
        bool complete;
        uint donorApprCnt;
        mapping (address => bool) approved;
    }
    
    //uint req_counter;
    mapping (uint => Request) public requests;
    uint public total_requests;
    uint num_requests;
    
    address public contract_manager;
    uint public min_donation; //minimum donation amount
    
    uint public appr_counter;
    mapping (address => bool) public approving_donors;
    
    modifier restrict_manager() {
        require(msg.sender == contract_manager);
        _;
    }
    
    constructor(address manager, uint min) {
        contract_manager = manager;
        min_donation = min;
    }
    
    function donate() public payable {
        require(msg.value > min_donation);
        approving_donors[msg.sender] = true;
        appr_counter++;
    }
    
    function createReq(address receiver, string memory desc, uint val) public restrict_manager {
        Request storage newReq = requests[num_requests++];

        newReq.receiver = receiver;
        newReq.desc = desc;
        newReq.val = val;
        newReq.complete = false;
        newReq.donorApprCnt = 0;

        //total_requests++;
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approving_donors[msg.sender]);
        require(!request.approved[msg.sender]);
        
        request.approved[msg.sender] = true;
        request.donorApprCnt++;
    }

    function finalizeTest(uint index) public view returns (address) {
        Request storage request = requests[index];

        return (
            request.receiver
        );
    }
    
    function finalize(uint index) public payable {
        Request storage request = requests[index];
        
        require(request.donorApprCnt > (appr_counter/2));
        require(!request.complete);
        
        payable(request.receiver).transfer(request.val);
        request.complete = true;
    }

    function projectDetails() public view returns (uint, uint, uint, uint, address) {
        return (
            min_donation,
            address(this).balance,
            total_requests,
            appr_counter,
            contract_manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return num_requests;
    }
}

