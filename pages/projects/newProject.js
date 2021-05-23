import { Box } from '@material-ui/core';
import { Label } from '@material-ui/icons';
import React, { Component } from 'react';
import Layout from '../../components/Layout.js'
import MinDonation from '../../components/MinDonationTextField.js'
import Button from '@material-ui/core/Button'

class ProjectNew extends Component {
    state = {
        amount: ''
    }
    render() {
        return (
            <Layout>
                <Box>
                    <MinDonation>
                    </MinDonation>
                </Box>
            </Layout>
        )
    }
}

export default ProjectNew;