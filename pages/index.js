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

class ProjIndex extends Component {
    static async getInitialProps() {
        const projectAdd = await projectGenerator.methods.get_deployed_projects().call();
        console.log(projectAdd);
        return { projectAdd };
    }

    render() {
        return (
            <Layout>
                <Grid>
                    <CardsPage projects={this.props.projectAdd}/>
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