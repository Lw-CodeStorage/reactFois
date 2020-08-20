import React, { useState, useEffect, useRef } from 'react';
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

export default function PassWordSet() {
    let oldPassWord = React.useRef(null);
    let newPassWord = React.useRef(null);
    let [changePassWord, setChangPassWord] = React.useState({})
    let [alertState, setAlertState] = useState({
        text: '上傳檔案過大',
        severity: 'error',
        open: false
    });

    function buttonHandler() {
        if (oldPassWord.current && newPassWord.current) {
            console.log(oldPassWord.current);
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
                    'key': 'userResetPassword',
                    'JWT': state,
                    '舊密碼': oldPassWord.current,
                    '新密碼': newPassWord.current
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                if (result.狀態 == '修改成功') {
                    setAlertState({ severity: 'success', text: result.狀態, open: true })
                } else {
                    setAlertState({ severity: 'error', text: result.errorCode, open: true })
                }

            }).catch((error) => console.error('Error:', error))
        }else{
            console.log('資料沒填');
        }
    }
    return (
        <Paper style={{ marginTop: 20 }}>
            <Box p={2} pl={4} pr={4} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>  <Typography variant='subtitle1'>請輸入就密碼與新密碼進行重設</Typography></Grid>
                    <Grid item xs={12} >
                        <TextField variant="outlined"
                            margin="none"
                            fullWidth
                            size='small'
                            label="舊密碼"
                            placeholder='請輸入接收新密碼通知之Email'
                            onChange={(e) => { oldPassWord.current = e.target.value }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField variant="outlined"
                            margin="none"
                            fullWidth
                            size='small'
                            label="新密碼"
                            placeholder='請輸入接收新密碼通知之Email'
                            onChange={(e) => { newPassWord.current = e.target.value }}
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button size='small' color="secondary" variant="contained" fullWidth onClick={buttonHandler}>重設 </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={alertState.open}
                autoHideDuration={3000}
                onClose={() => { setAlertState({ ...alertState, open: false }) }}
            >
                <Alert variant="filled" severity={alertState.severity}>
                    {alertState.text}
                </Alert>
            </Snackbar>
        </Paper>
    )
}