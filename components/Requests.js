import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title.js';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router'
import AddIcon from '@material-ui/icons/Add';
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles';
import Project from '../ethereum/project.js';
import web3 from '../ethereum/web3.js';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#00e676',
    },
  },
});

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Requests({ usrAddress, usrRequests, usrReqCount, usrApprovalCount }) {
  const router = useRouter();
  const classes = useStyles();

  var date = new Date();
  var curDate = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();

  console.log(usrAddress);

  const onSubmit = async () => {
    router.push(`/projects/${usrAddress}/createRequest`);
    console.log(usrAddress);
  }

  const onApprove = async (index) => {
    const project = Project(usrAddress);
    const accounts = await web3.eth.getAccounts();
    await project.methods.approveRequest(index).send({
      from: accounts[0]
    });
  }

  const onFinalize = async (index) => {
    const project = Project(usrAddress);
    const accounts = await web3.eth.getAccounts();
    await project.methods.finalize(index).send({
      from: accounts[0]
    });
  }

  return (
    <React.Fragment>
      <Title>Requests</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Amount (wei)</TableCell>
            <TableCell>Recipient</TableCell>
            <TableCell>Approvals</TableCell>
            <TableCell>Approve</TableCell>
            <TableCell>Complete</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {usrRequests.map((request, index) => (//requests.map
            <TableRow key={index}>
              <TableCell>{curDate}</TableCell>
              <TableCell>{request.desc}</TableCell>
              <TableCell>{request.val}</TableCell>
              <TableCell>{request.receiver}</TableCell>
              <TableCell>{request.donorApprCnt} / {usrApprovalCount}</TableCell>
              <TableCell >
              <ThemeProvider theme={theme}>
                <Button variant="contained" align="center" color="secondary" onClick={() => onApprove(index)}>
                  Approve
                </Button>
              </ThemeProvider>
              </TableCell>
              <TableCell >
              <ThemeProvider theme={theme}>
                <Button variant="contained" align="center" color="primary" onClick={() => onFinalize(index)}>
                  Complete
                </Button>
              </ThemeProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
            
      </div>
      <Grid container justify="center">
      <Button onClick={onSubmit} variant="contained" align="center" color="primary">
            Create New Request
            <AddIcon />
      </Button>
      </Grid>
    </React.Fragment>
  );
}
