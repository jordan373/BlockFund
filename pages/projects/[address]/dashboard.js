import React, { useEffect } from 'react';
import {useRouter} from 'next/router';
import Project from '../../../ethereum/project.js';
import { Component } from 'react';
//import getAddress from '../about.js'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//import { mainListItems, secondaryListItems } from './listItems';
import Chart from '../../../components/Chart.js';
import ProjectBalance from '../../../components/ProjectBalance.js';
import Requests from '../../../components/Requests.js';
import MakeDonation from '../../../components/makeDonation.js'
import { mainListItems, secondaryListItems } from '../../../components/listItem.js';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  textField: {
    width: 10,
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const ProjectsDisplay = ({userAddress, minDonation, balance, reqCount, approvalCount, contractManager, userRequests}) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Project Dashboard
          </Typography>
          <IconButton color="inherit">
            {/* <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge> */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>

        <div className={classes.appBarSpacer} />


          <Grid container spacing={0} direction="column" alignItems="center" justify="center">
          <MakeDonation address={userAddress} align="center"/>
          </Grid>

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>

            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart apprCount={approvalCount}/>
              </Paper>
            </Grid>

            {/* Project Balance */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <ProjectBalance managerAddress={contractManager} pBalance={balance} minimumDonation={minDonation}/>
              </Paper>
            </Grid>

            {/* Recent requests */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Requests usrAddress={userAddress} usrRequests={userRequests} usrReqCount={reqCount} usrApprovalCount={approvalCount}/>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
           
          </Box>
        </Container>
      </main>
    </div>
  );
}

ProjectsDisplay.getInitialProps = async ({ query }) => {
    const { address } = query;
    const project = Project(address);
    const display = await project.methods.projectDetails().call();
    const apprCount = await project.methods.appr_counter().call();
    

    const requestCount = await project.methods.getRequestsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount)).fill().map((element, index) => {
        return project.methods.requests(index).call();
      })
    );

    console.log(requests);

    return {
        userAddress: address,
        minDonation: display[0],
        balance: display[1],
        reqCount: display[2],
        approvalCount: display[3],
        contractManager: display[4],
        userRequests: requests,
        reqCount: requestCount,
        approvalCount: apprCount
    }
}
    
export default ProjectsDisplay
