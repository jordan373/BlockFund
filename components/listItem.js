import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Link from 'next/link';

export const mainListItems = (
  <div>
  <Link href="/">
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    </Link>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="My Projects" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Favorites</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Favorite 1" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Favorite 2" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
      <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Favorite 3" />
    </ListItem>
  </div>
);