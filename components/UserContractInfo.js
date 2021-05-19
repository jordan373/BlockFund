
import React, { useEffect } from 'react';
import {useRouter} from 'next/router';
import Project from '../ethereum/project.js';
import { Component } from 'react';

const ProjectsDisplay = ({userAddress, minDonation, balance, reqCount, approvalCount, contractManager}) => {

    return (
        {address: userAddress},
        {minDonation},
        {balance},
        {reqCount},
        {approvalCount},
        {contractManager}
    )
}

ProjectsDisplay.getInitialProps = async ({ query }) => {
    const { address } = query
    const project = Project(address);
    const display = await project.methods.projectDetails().call();
    return {
        userAddress: address,
        minDonation: display[0],
        balance: display[1],
        reqCount: display[2],
        approvalCount: display[3],
        contractManager: display[4]
    }
}

export default ProjectsDisplay;