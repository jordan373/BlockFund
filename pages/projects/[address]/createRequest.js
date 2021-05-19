import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PostAddTwoToneIcon from '@material-ui/icons/PostAddTwoTone';
import Project from '../../../ethereum/project.js'
import web3 from '../../../ethereum/web3.js';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },

}));

export default function RequestForm({ userAddress }) {
  const classes = useStyles();

  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const [request, setRequest] = React.useState({
      description: '',
      amount: '',
      recipient: ''
  });

  const handleChange = (prop) => (event) => {
    setRequest({ ...request, [prop]: event.target.value });
  };

  const onSubmit = async () => {
    setSuccess(false);
    setLoading(true);

    console.log(userAddress);
    const project = Project(userAddress);

    try {
        setOpen(true);
        const accounts = await web3.eth.getAccounts();
        await project.methods.createReq(request.recipient, request.description, request.amount)
        .send({from: accounts[0]});

        setSuccess(true);
        setLoading(false);
        setOpen(false);

        router.push(`/projects/${userAddress}/dashboard`);

    }catch(err) {
        setSuccess(false);
        setLoading(false);
        setOpen(false);
        console.log("Error: " + err.message);
    }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create New Request
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="desc"
            label="Enter description"
            name="desc"
            value={request.description}
            onChange={handleChange('description')}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Amount in WEI"
            id="amount"
            value={request.amount}
            onChange={handleChange('amount')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="recipient"
            label="Recipient Address"
            id="recipient"
            value={request.recipient}
            onChange={handleChange('recipient')}
          />
          
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Create
          </Button>
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}

RequestForm.getInitialProps = async ({query}) => {
    const {address} = query;
    console.log("hmm: " + address);
    return {
        userAddress: address
    }
}