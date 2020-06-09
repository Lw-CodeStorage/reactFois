
import React, { Component, useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
    palette: {
        // type:'dark',
        primary: {
            main: '#009688',
          }
      
    },
    status: {
        danger: 'orange',
    },
});
export default theme;