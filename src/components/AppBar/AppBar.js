import React, { useState, useRef, useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { LogInState } from '../../index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider'

import { School, AttachMoney, Info } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuContainer: {
        maxWidth: '1280px',
        width: '100%',
        margin: 'auto'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1
    },
    item1: {

    },
    item2: {
        flexBasis: '140px'
    },
    list: {
        marginTop: '40px',
        width: 250
    },
}));

export default function ButtonAppBar() {
    let classes = useStyles();
    let history = useHistory()
    //登入狀態判斷
    let [loginState, setLoginState] = useContext(LogInState)
    //menuButotn狀態
    let [showMenu, setShowMenu] = useState(false)
    function loginHandle() {
        history.push('/登入')
    }
    function registerHandle() {
        history.push('/註冊')
    }
    function toggleDrawer(event) {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return
        }
        setShowMenu(false)
    }

    let systemButtom = <Button color="inherit">一般會員</Button>
    let visitorButton = <>
        <Button color="inherit" onClick={loginHandle}>登入</Button>|
        <Button color="inherit" onClick={registerHandle}>註冊</Button>
    </>


    return (
        <div className={classes.root}>
            <AppBar position="static"  >
                <Toolbar className={classes.menuContainer}>
                    <Hidden lgUp={true}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { setShowMenu(true) }}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor={'left'} open={showMenu} onClose={toggleDrawer}>
                            <List className={classes.list}>
                                <ListItem button divider>
                                    <ListItemIcon>
                                        <School />
                                    </ListItemIcon>
                                    <ListItemText primary={'學職活動'}  onClick={()=>{history.push('/學職活動')}}/>
                                </ListItem>
                                <ListItem button divider>
                                    <ListItemIcon>
                                        <AttachMoney />
                                    </ListItemIcon>
                                    <ListItemText primary={'派案競標'} />
                                </ListItem>
                                <ListItem button divider>
                                    <ListItemIcon>
                                        <Info />
                                    </ListItemIcon>
                                    <ListItemText primary={'關於我們'} />
                                </ListItem>
                                <ListItem button divider>
                                    <ListItemText primary={'登入'} onClick={()=>{history.push('/登入')}}/>
                                </ListItem>
                                <ListItem button divider>
                                    <ListItemText primary={'註冊'} onClick={()=>{history.push('/註冊')}}/>
                                </ListItem>
                            </List>
                        </Drawer>
                    </Hidden>

                    <Typography variant="h6" className={classes.title} onClick={() => { history.push("/") }}>
                        <span> FOIS 學職平台 <small>v1.2</small></span>
                    </Typography>

                    <Hidden smDown={true}>
                        <Typography className={classes.item1}>
                            <Button color="inherit" onClick={()=>{history.push('/學職活動')}}>學職活動</Button>
                            <Button color="inherit" onClick={loginHandle}>派案競標</Button>
                            <Button color="inherit" onClick={loginHandle}>關於我們</Button>
                        </Typography>

                        <Typography className={classes.item2}>
                            {loginState ? systemButtom : (visitorButton)}
                        </Typography>
                    </Hidden>


                </Toolbar>
            </AppBar>
        </div>
    );
}
