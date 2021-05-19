import { Box } from '@material-ui/core';
import React from 'react';
import BottomNav from '../components/BottomNav.js'
import Menu from '../components/Menu.js'

export default (props) => {
    return ( 
        <div>
            <Menu>
            </Menu>

                {props.children}
        
        </div>
    );
}