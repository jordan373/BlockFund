import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title.js';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function ProjectBalance({ managerAddress, pBalance, minimumDonation }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Total Project Balance</Title>
      <Typography component="p" variant="h4">
        wei: {pBalance}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Minimum Donation: {minimumDonation} wei
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View recent donations
        </Link>
      </div>
    </React.Fragment>
  );
}