import React, { useState, useContext, useEffect, useRef } from 'react'


import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { LogInState } from '../../index.js'; //context
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import loginBackGround from './loginPageBackground-press.jpg'
import MemberRegisterPage from '../RegisterPage/MemberRegisterPage/MemberRegisterPage.js'

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${loginBackGround})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paperContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
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
    margin: theme.spacing(3, 0, 3),
  },
}));

export default function LoginPage() {
  const classes = useStyles();
  let [account, setAccount] = useState('st831209@gmail.com')
  let [password, setPassWord] = useState('123')
  let [open, setOpen] = useState(false);
  let [loginState, setLoginState] = useContext(LogInState)
  let [registerState, setRegisterState] = useState(false)
  let [forgatState, setForgatState] = useState(false)

  let forgotPassEmail = React.useRef(null)
  let [email, setEmail] = React.useState(null)
  let [alertState, setAlertState] = useState({
    text: '上傳檔案過大',
    severity: 'error',
    open: false
  });

  let history = useHistory()
  let response = useRef('登入錯誤')
  const handleClose = (event, reason) => {
    setOpen(false);
  }
  function fetchData() {
    fetch('https://demo.fois.online/Fois_Class/Main.php', {
      method: 'POST',
      body: JSON.stringify({ key: 'userLogin', 'Email': account, 'Password': password }),
    })
      .then(res => {
        return res.json();
      }).then(result => {
        // console.log(result);
        if (result['狀態'] === '登入成功') {
          document.cookie = `state=${result['JWT']};max-age =3600; path=/`;
          history.push('/系統/編輯履歷/個資')
          setLoginState(true) //LoginState為全域變數，因此從全域變數的根開始重新渲染s
        } else {
          // response.current = result.errorCode //ref
          // setLoginState(false)
          // setOpen(true);
          setAlertState({ severity: 'error', text: result.errorCode, open: true })
        }
      });
  }
  //忘記密碼的Email格式判定用 送出不用這筆資料
  let handleChange = (event) => {
    setEmail(event.target.value) 
    //console.log(forgotPassEmail.current);
  }
  //Email格式判斷 
  let handleSubmit = (event) => {
    //if 格式正確 email是API偵測需要設定，上傳還是自己抓值
    if (forgotPassEmail.current.state.isValid && email) {
      console.log(forgotPassEmail.current.props.value);

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
          'key': 'userForgetPassword',
          'Email': forgotPassEmail.current.props.value
        }),
      }).then(res => {
        return res.json();
      }).then(result => {
        if (result.狀態 == '送出成功') {
          setAlertState({ severity: 'success', text: result.狀態, open: true })
        } else {
          setAlertState({ severity: 'error', text: result.errorCode, open: true })
        }

      }).catch((error) => console.error('Error:', error))
    } else {
      setAlertState({ severity: 'error', text: '請輸入Email', open: true })
    }
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid className={classes.paperContainer} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            FOIS <small>v1.2</small>
          </Typography>
          {registerState ? <MemberRegisterPage setRegisterState={setRegisterState} /> :
            forgatState ?
              <Paper style={{ maxWidth: 400, marginTop: 20 }}>
                <Box p={2} pl={4} pr={4} >
                  <Grid container spacing={2}>

                    <Grid item xs={12}>  <Typography variant='subtitle1'>您的個人會員帳號密碼將進行重設</Typography></Grid>
                    <Grid item xs={12} style={{ marginBottom: 5 }}>
                      <ValidatorForm>
                        <TextValidator
                          fullWidth
                          label="Email"
                          onChange={handleChange}
                          name="email"
                          value={email}
                          validators={['required', 'isEmail']}
                          errorMessages={['this field is required', 'email 格式不對']}
                          ref={forgotPassEmail}
                        />
                      </ValidatorForm>

                    </Grid>
                    <Grid item xs={6}>
                      <Button size='small' color="secondary" variant="contained" fullWidth onClick={handleSubmit}>重設 </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button size='small' color='primary' fullWidth onClick={() => { setForgatState(false) }}>返回 </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
              :
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="使用者帳號"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={(e) => { setAccount(e.target.value) }}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="使用者密碼"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => { setPassWord(e.target.value) }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={fetchData}
                >
                  登 入
            </Button>
                <Grid container>
                  <Grid item xs>
                    <Button onClick={() => { setForgatState(true) }}>忘記密碼？ </Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={() => { setRegisterState(true) }}>
                      還沒有帳號嗎？ 快註冊一個吧！
                </Button>
                    {/* <Link to='/註冊'>
                    還沒有帳號嗎？ 快註冊一個吧！
                </Link> */}
                  </Grid>
                </Grid>

              </form>

          }
        </div>

      </Grid>
      {/* <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={alertState.open}
        autoHideDuration={3000}
        onClose={handleClose}>
        <Alert onClose={handleClose} variant="filled" severity="error">
          {response.current}
        </Alert>
      </Snackbar> */}
      <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={alertState.open}
                autoHideDuration={3000}
                onClose={() => { setAlertState({ ...alertState, open: false }) }}
            >
                <Alert variant="filled" severity={alertState.severity}>
                    {alertState.text}
                </Alert>
            </Snackbar>
    </Grid>
  );
}
