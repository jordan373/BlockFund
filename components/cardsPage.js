import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Toolbar from '@material-ui/core/Toolbar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Hidden from '@material-ui/core/Hidden'
//import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import AddIcon from '@material-ui/icons/Add'
import Link from 'next/link'
import { useRouter } from 'next/router'

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/zBfBXHCaLmk)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.7)'
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4),
      paddingRight: 0
    }
  },

  newProjectButton: {
    justifyContent: 'center'
  },

  leftIcon: {
    marginRight: theme.spacing(1)
  },

  card: {
    display: 'flex'
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  }
}))

const CardsPage = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const featuredPosts = props.projects.map((addresses) => {
    return {
      title: addresses.name,
      date: 'may 23 2021',
      description: addresses.desc,
      address: addresses.addr,
      images: 'https://source.unsplash.com/random'
    }
  })

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
           
          </Typography>
        </Toolbar>
        <main>
          {/* Main featured post */}
          <Paper className={classes.mainFeaturedPost}>
            {/* Increase the priority of the hero background image */}
            {
              <img
                style={{ display: 'none' }}
                src="https://source.unsplash.com/zBfBXHCaLmk"
                alt="background"
              />
            }
            <div className={classes.overlay} />
            <Grid container>
              <Grid item md={6}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                    Welcome to BlockFund where payments are decentralized.
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    Here you can see projects that need funding, these can be any type of projects from art to software development. Feel free to donate.
                  </Typography>
                  <Link variant="subtitle1" href="#">
                    Learn more...
                  </Link>
                </div>
              </Grid>
            </Grid>
          </Paper>
          {/* End main featured post */}

          <Box textAlign='center' m={4}>
          <Link href="projects/newProject">
          <Button className={classes.newProjectButton} variant="contained" align="center" color="primary">
          <AddIcon className={classes.leftIcon} />
            Create project
          </Button>
          </Link>
          </Box>

          {/* Sub featured posts */}
          <Grid container spacing={4}>
            {featuredPosts.map(post => (
              <Grid item key={post.title} xs={12} md={6}>
              <Link as={`/projects/${post.address}/dashboard`} href={{
                pathname: "/projects/[address]/dashboard",
                query: {
                  title: post.title,
                  address: post.address
                }
              }}>
                <CardActionArea component="a">
                  <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                      <CardContent>
                        <Typography component="h2" variant="h5">
                          {post.title}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {post.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.description}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {post.address}
                        </Typography>
                        
                          <Typography variant="subtitle1" color="primary">
                          
                            View Project...
                          
                          </Typography>
                  
                      </CardContent>
                    </div>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={post.images}
                        title="Image title"
                      />
                    </Hidden>
                  </Card>
                </CardActionArea>
               </Link>
              </Grid>
            ))}
          </Grid>
          {/* End sub featured posts */}
        </main>
      </Container>
    </>
  )
}

export default CardsPage