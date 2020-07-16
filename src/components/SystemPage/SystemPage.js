import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route, Link, Redirect, useRouteMatch, useHistory } from "react-router-dom";
import UserImage from './UserImage'
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import MenuIcon from '@material-ui/icons/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import '../SystemPage/SystemPage.css'

import ResumePage from './ResumePage/ResumePage'
import PersonalSurvey from './PersonalSurvey/PersonalSurvey.js'
import ManageSurvey from './ManageSurvey/ManageSurvey.js'

export const UserData = React.createContext(null);
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  let history = useHistory();
  let { path, url } = useRouteMatch();
  let classes = useStyles();
  let theme = useTheme();
  let [mobileOpen, setMobileOpen] = React.useState(false); //手機版menu收折
  let [open, setOpen] = useState(true)
  let [progress, setProgress] = useState(false) //加載條 目前沒用到 useContext用
  let [userData, setUserData] = useState('') // 使用者資訊 useContext用

  useEffect(() => {
    history.push('/系統/問卷測評/個人效能/職業興趣')
    let cookies = document.cookie.split(';')
    let state = ''
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].indexOf('state') >= 0) {
        state = cookies[i].split('=')[1]
      } 
    }
    fetch('https://demo.fois.online/Fois_Class/Main.php', {
      method: 'POST',
      body: JSON.stringify({
        'key': 'memberReadResumeData',
        'JWT': state,
      })
    }).then(res => {
      return res.json()
    }).then(result => {
      (result.狀態 === '查詢成功') ? setUserData(result.結果) : console.log(result.error);
      console.log(result);
    }).catch(error => console.log(error))
  }, [])

  let handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function logout() {
    history.push('/')
    document.cookie = `state='';max-age =0.1; path=/`;

  }

  let drawer = (
    <div>
      <UserImage></UserImage>
      <Divider />
      <List>
        {/*  */}
        <ListItem button component={Link} to={`${url}/編輯履歷/個資`}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary='編輯履歷' />
        </ListItem>

        <ListItem button onClick={() => { setOpen(!open) }}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary='問卷測評' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            {/* 標準測評 */}
            <ListItem button  component={Link} to={`${url}/問卷測評/個人效能/職業興趣`}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="個人效能" />
            </ListItem>

            {/* 校準測評 */}
            <ListItem button component={Link} to={`${url}/問卷測評/管理職能`}>
              <ListItemIcon>
                {/* <StarBorder /> */}
              </ListItemIcon>
              <ListItemText primary="管理職能" />
            </ListItem>

          </List>
        </Collapse>

        <ListItem button >
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary='IDP 設定' />
        </ListItem>
        <Divider />
        <ListItem button onClick={logout}>
          <ListItemIcon><InboxIcon /></ListItemIcon>
          <ListItemText primary='登出' />
        </ListItem>
      </List>
    </div>
  );



  return (
    <UserData.Provider value={[userData, setUserData, progress, setProgress]}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color='primary' className={classes.appBar}>
          <Toolbar className='appBarContainer'>
            <div className='appBarContainerLeftFix'>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography color='buttonText' variant="h6" noWrap>
                FOIS <small>v1.2</small>
              </Typography>
            </div>
            <div>
              <Button size="small" variant="contained" color="primary" disableElevation>學職活動</Button>
              <Button size="small" variant="contained" color="primary" disableElevation>派案競標</Button>
            </div>
          </Toolbar>
          {progress ? <LinearProgress /> : null}
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              // container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path={`${path}/編輯履歷`} component={ResumePage} />
            <Route path={`${path}/問卷測評/個人效能`} component={PersonalSurvey}/>
            <Route path={`${path}/問卷測評/管理職能`} component={ManageSurvey}/> 
            <Route><h3>無此頁面</h3></Route>
          </Switch>
        </main>
      </div >

    </UserData.Provider >

  );
}
export default ResponsiveDrawer;
