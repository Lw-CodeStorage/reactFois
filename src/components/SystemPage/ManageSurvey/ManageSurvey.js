import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useRouteMatch } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/core/Switch';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Fade from "@material-ui/core/Fade";
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from "@material-ui/core/CircularProgress";

let useStyles = makeStyles(theme => ({

    root: {
        padding: '20px',
        margin: 'auto',
    },
    selfTextField: {
        '& input': {
            textAlign: 'center',
        },
        '& select': {
            textAlignLast: 'center',
        }

    }

}))

export default function ManageSurvey() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();
    let history = useHistory()
    const [value, setValue] = React.useState(0); //tabs
    const handleChange = (event, newValue) => {
        console.log(newValue);
        setValue(newValue);
    };//tabs

    return (
        <>
            <Box mb={2}>
                <Paper >
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        variant="fullWidth"
                        onChange={handleChange}
                    >
                        <Tab label="MBTI性格測驗" component={Link} to={`${url}/個資`} />
                        <Tab label="時間管理" component={Link} to={`${url}/學歷`} />
                        <Tab label="跨文化價值測評" component={Link} to={`${url}/學歷`} />
                    </Tabs>
                </Paper>
            </Box>

            <Switch>
                
                <Route path={`${path}/個人效能`}  />
                
            </Switch>
        </>



    )
}