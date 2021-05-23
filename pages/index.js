import React, { Component } from 'react';
import projectGenerator from '../ethereum/projectGenerator';
import Link from 'next/link'
//import SimpleCard from '../views/projectCard.js'
//import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CardsPage from '../components/cardsPage.js';
import Layout from '../components/Layout.js';
import { Grid } from '@material-ui/core';
import project from '../ethereum/project';

class ProjIndex extends Component {
    static async getInitialProps() {
        const projectAddr = await projectGenerator.methods.get_deployed_projects().call();
        // const projectName = await projectGenerator.methods.get_deployed_projects_name().call();
        // const projectDesc = await projectGenerator.methods.get_deployed_projects_desc().call();
        console.log(projectAddr);
        return { projectAddr };
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <CardsPage projects={this.props.projectAddr}/>
                </Grid>
            </Layout>
        );
    }
}

export default ProjIndex;

// export default function Index() {
//     return (
//       <Container maxWidth="sm">
//         <Box m={10}>
//           <SimpleCard />
//         </Box>
//       </Container>
//     );
//   }