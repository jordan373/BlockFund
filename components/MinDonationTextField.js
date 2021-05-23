import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button'
import instance from '../ethereum/projectGenerator.js'
import { Box } from '@material-ui/core';
import web3 from '../ethereum/web3.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import { useRouter } from 'next/router'
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import PostAddTwoToneIcon from '@material-ui/icons/PostAddTwoTone';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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
    fabProgress: {
      color: green[500],
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
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

export default function MinDonation() {
    const router = useRouter();
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const timer = React.useRef();
    const buttonClassname = clsx({
      [classes.buttonSuccess]: success,
    });

    React.useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);
  
    const [values, setValues] = React.useState({
      amount: '',
      name: '',
      desc: ''
    });

const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
};

const onSubmit = async () => {
    setOpen(true);
    setSuccess(false);
    setLoading(true);
    console.log(values.amount);
    //const accounts;
    try {
      const accounts = await web3.eth.getAccounts();
      await instance.methods.createProject(values.amount, values.name, values.desc).send({
      from: accounts[0]
    });
    console.log(accounts[0]);

    setSuccess(true);
    setLoading(false);
    setOpen(false);


    router.push('/');

    } catch(err) {
      setSuccess(false);
      setLoading(false);
      setOpen(false);
      console.log("Error: " + err.message);
    }
    
    // await instance.methods.createProject(values.amount) .send({
    //   from: accounts[0]
    // })
}

return (
    <div className={classes.root}>
        {/* <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Minimum donation amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">wei</InputAdornment>}
            labelWidth={194}
          />
        </FormControl> */}
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddTwoToneIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create A New Project To Be Funded
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Enter Project Name"
            name="name"
            autoFocus
            value={values.name}
            onChange={handleChange('name')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="desc"
            label="Enter Project Description"
            id="desc"
            value={values.desc}
            onChange={handleChange('desc')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="amount"
            label="Enter Minimum Donation Amount In wei"
            id="amount"
            value={values.amount}
            onChange={handleChange('amount')}
          />
          
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
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
        <Box textAlign='center' m={4}>
          {/* <Button onClick={onSubmit} variant="contained" align="center" className={buttonClassname} color="primary" disabled={loading}>
            Create project
          </Button> */}
          <Backdrop className={classes.backdrop} open={open}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
        
    </div>
)

};
