import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useRouteMatch, useHistory } from "react-router-dom";
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
import LockIcon from '@material-ui/icons/Lock';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssessmentIcon from '@material-ui/icons/Assessment';
import MapIcon from '@material-ui/icons/Map';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import '../SystemPage/SystemPage.css'

import ResumePage from './ResumePage/ResumePage'
import PersonalSurvey from './PersonalSurvey/PersonalSurvey.js'
import ManageSurvey from './ManageSurvey/ManageSurvey.js'
import MapFindWork from './MapFindWork/MapFindWork.js'
import PassWordSet from './PassWordSet/PassWordSet.js'
import FreeSurvey from './FreeSurvey/FreeSurvey.js'

import { PayState } from '../../index.js' //userContext父層引入
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
    padding: theme.spacing(2),
  },
}));

function SystemPage() {

  let history = useHistory();
  let { path, url } = useRouteMatch();
  let classes = useStyles();
  let theme = useTheme();
  let [mobileOpen, setMobileOpen] = React.useState(false); //手機版menu收折
  let [collapseOpen, setCollapseOpen] = useState(false)//問卷側邊欄收折
  let [payState, setPayState] = React.useContext(PayState) //付費狀態 由最上層index-route傳下來
  let [userData, setUserData] = useState('') // 使用者資訊 useContext用

  useEffect(() => {
    console.log(payState);
    history.push('/系統/適性測評/免費測評')
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
      console.log(result);

      (result.狀態 === '查詢成功') ? setUserData(result.結果) : console.log(result.error);

    }).catch(error => console.log(error))
  }, [])

  let handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function logout() {
    history.push('/系統')
    document.cookie = `state='';max-age =0.1; path=/`;

  }

  let drawer = (
    <div>
      <UserImage></UserImage>
      <Divider />
      <List>
        <ListItem button onClick={() => { setCollapseOpen(!collapseOpen) }}>
          <ListItemIcon> <AssessmentIcon /> </ListItemIcon>
          <ListItemText primary='適性測評' />
          {collapseOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {/* 免費測評 */}
            <ListItem button component={Link} to={`${url}/適性測評/免費測評`}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary='免費測評' />
            </ListItem>
            {/* 標準測評 */}
            <ListItem button disabled={payState ? false : true} component={Link} to={`${url}/適性測評/標準測評/測評01`}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="標準測評" />
            </ListItem>

            {/* 校準測評 */}
            <ListItem button disabled={payState ? false : true} component={Link} to={`${url}/適性測評/校準測評/測評04`}>
              <ListItemIcon></ListItemIcon>
              <ListItemText primary="校準測評" />
            </ListItem>

          </List>
        </Collapse>
        <ListItem disabled={payState ? false : true} button component={Link} to={`${url}/編輯履歷/個資`}>
          <ListItemIcon>{payState ? <LibraryBooksIcon /> : <LockIcon />}</ListItemIcon>
          <ListItemText primary='編輯履歷' />
        </ListItem>
        <ListItem disabled={payState ? false : true} button component={Link} to={`${url}/附近工作`}>
          <ListItemIcon>{payState ? <MapIcon /> : <LockIcon />}</ListItemIcon>
          <ListItemText primary='附近工作' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to={`${url}/修改密碼`}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary='修改密碼' />
        </ListItem>
        <ListItem button onClick={logout}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary='登出' />
        </ListItem>
      </List>
    </div>
  );

  let openPayPage = () => {
    //  console.log(`text:${window}`);

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
        'key': 'userPayProduct',
        'JWT': state,
        '付費': '付費會員'
      })
    }).then(res => {
      return res.json()
    }).then(result => {
      (result.狀態 === '請求成功') ? window.open(result.網址, '_blank') : console.log(result.errorCode);

    }).catch(error => console.log(error))
    //document.open("https://www.google.com/", "_blank")
    //let a = window.open("https://www.google.com/", "_blank");
  }
  let reSurveyPayPage = () =>{
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
        'key': 'userPayProduct',
        'JWT': state,
        '付費': '付費重測'
      })
    }).then(res => {
      return res.json()
    }).then(result => {
      (result.狀態 === '請求成功') ? window.open(result.網址, '_blank') : console.log(result.errorCode);

    }).catch(error => console.log(error))
    //document.open("https://www.google.com/", "_blank")
    //let a = window.open("https://www.google.com/", "_blank");
  }
  return (
    <UserData.Provider value={[userData, setUserData]}>
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
              {/* component={Link}  target="_blank"  */}
              {payState ? <Button  onClick={reSurveyPayPage} size="small" variant="contained" color="error" disableElevation >重新測評</Button> : <Button onClick={openPayPage} size="small" variant="contained" color="primary" disableElevation >升級權限</Button>}
            </div>
          </Toolbar>

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
            // open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>

            <Route path={`${path}/編輯履歷`} component={ResumePage} />
            <Route path={`${path}/適性測評/免費測評`} component={FreeSurvey} />
            <Route path={`${path}/適性測評/標準測評`} component={PersonalSurvey} />
            <Route path={`${path}/適性測評/校準測評`} component={ManageSurvey} />

            <Route path={`${path}/修改密碼`} component={PassWordSet} />
            <Route path={`${path}/附近工作`} component={MapFindWork} />

            <Route path={`${path}/*`}><h3>無此頁面</h3></Route>


          </Switch>

        </main>
      </div >

    </UserData.Provider >

  );
}
export default SystemPage;
