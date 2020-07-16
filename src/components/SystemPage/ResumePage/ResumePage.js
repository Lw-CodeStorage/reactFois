import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useRouteMatch } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import DatePicker from './DatePicker/DatePicker'
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
import { UserData } from '../SystemPage.js' //userContext父層引入
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

//tabs - 1 
function UserInfo() {
    const classes = useStyles();
    let [userData, setUserData] = useContext(UserData)
    let [circleProgress, SetcircleProgress] = useState()
    let [alertState, setAlertState] = useState({
        text: '上傳檔案過大',
        severity: 'error',
        open: false
    });
    useEffect(() => {
        console.log('個資分頁');
    })
    function uploadFileHandle(e) {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i].indexOf('state') >= 0) {
            state = cookies[i].split('=')[1]
          } 
        }
        let file = e.target.files[0]
        if (file) {
            let fileSize = file.size / 1048576 //MB
            if (fileSize <= 20) {
                SetcircleProgress(true)
                let formData = new FormData()
                formData.append('key', 'userUploadFile')
                formData.append('JWT', state)
                formData.append('File_Data', file)
                formData.append('File_Name', file.name)
                formData.append('File_Type', file.name.split('.')[1])
                formData.append('Upload_Type', '自傳')
                fetch('https://demo.fois.online/Fois_Class/Main.php', {
                    method: 'POST',
                    body: formData
                }).then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result);
                    if (result.狀態 == '上傳成功') {
                        SetcircleProgress(false);
                        setUserData({ ...userData, '自傳文件名稱': file.name, '自傳文件路徑': result.結果 })
                        setAlertState({ severity: 'success', text: '上傳成功', open: true })
                    } else {
                        setAlertState({ ...alertState, open: true, text: result.errorCode })
                    }

                }).catch((error) => console.error('Error:', error))

            } else {
                setAlertState({ ...alertState, open: true })
            }
        }
    }
    function updata(e) {
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
                'key': 'memberSaveResumeData',
                'JWT': state,
                ...userData
            }),
        }).then(res => {

            return res.json();
        }).then(result => {
            // console.log(userData);
            if (result.狀態 == '儲存成功') {

                setAlertState({ severity: 'success', text: result.狀態, open: true })
            } else {
                setAlertState({ severity: 'error', text: result.errorCode, open: true })
            }
        }).catch((error) => console.error('Error:', error))
    }
    return (
        <Grid container spacing={2} justify='center' >
            {/* 個人資料 */}
            <Grid item xs={12}>
                <Paper variant='outlined' className={classes.root} >
                    <Box mb={4}>
                        <Typography variant='h6'> 個人資料</Typography>
                        <Typography variant='caption text'> 其他 FOIS 服務使用者可能會看到部分資訊。</Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container justify='space-between' spacing={3}>
                            {/* 姓名 */}
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>姓名</Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <TextField variant="outlined" size='small' fullWidth value={userData.姓名} className={classes.selfTextField} onChange={e => setUserData({ ...userData, '姓名': e.target.value })} />
                            </Grid>
                            {/* 身分證字號 */}
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>身分證字號 </Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <TextField variant="outlined" fullWidth size='small' value={userData.身分證字號} className={classes.selfTextField} onChange={e => setUserData({ ...userData, '身分證字號': e.target.value })} />
                            </Grid>
                            {/* 性別 */}
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>性別 </Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <TextField
                                    fullWidth
                                    select
                                    SelectProps={{ native: true }}
                                    size='small'
                                    variant="outlined"
                                    value={userData.性別}
                                    className={classes.selfTextField}
                                    onChange={e => setUserData({ ...userData, '性別': e.target.value })}
                                >
                                    <option selected value='男'>男</option>
                                    <option value='女'>女</option>
                                </TextField>
                            </Grid>
                            {/* 生日 */}
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>生日</Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <DatePicker birthday='birthday' />
                            </Grid>
                            {/* 自傳檔案 */}
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>自傳檔案 </Typography>
                            </Grid>
                            <Grid item container xs={8} lg={4} wrap='nowrap' justify='space-between' alignItems='center'>
                                <Typography variant='body1' align='center'>
                                    {
                                        userData.自傳文件名稱 ? <a href={`https://demo.fois.online/Fois_Class/${userData.自傳文件路徑}`} target='_blank'>{userData.自傳文件名稱}</a> : '未上傳'
                                    }
                                </Typography>
                                {circleProgress ? <CircularProgress style={{ width: 20, height: 20 }} /> : <InsertDriveFileIcon color='secondary' />}
                            </Grid>
                            {/* 自傳上傳 */}
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1' >自傳上傳 </Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <Button fullWidth variant="contained" color="secondary" component="label" >
                                    上傳自傳
                                    <input
                                        onChange={uploadFileHandle}
                                        type="file"
                                        style={{ display: "none" }}
                                        accept=".doc,.docx,.pdf"
                                    />
                                </Button>
                                <Box mt={1}>
                                    <Typography component='p' align='center' color='secondary.tex' variant='caption text' >※上傳格式為(pdf,doc,docx) | 上傳限制大小為20MB </Typography>
                                </Box>
                            </Grid>
                            {/* 自我介紹 */}
                            <Grid item xs={6} lg={8}>
                                <Typography variant='subtitle1'>自我介紹 </Typography>
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <TextField
                                    multiline
                                    fullWidth
                                    rows={6}
                                    placeholder='簡單介紹一下自己'
                                    variant="outlined"
                                    value={userData.自介}
                                    onChange={e => setUserData({ ...userData, '自介': e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            {/* 聯絡資訊 */}
            <Grid item xs={12}>
                <Paper variant='outlined' className={classes.root} >
                    <Box mb={2}>
                        <Typography variant='h6'> 聯絡資訊</Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container justify='space-between' spacing={3}>
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>Email </Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <TextField disabled fullWidth placeholder='請輸入Emain' value={userData.信箱} className={classes.selfTextField} />
                            </Grid>
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>電話</Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <TextField fullWidth placeholder='請輸入電話' className={classes.selfTextField} value={userData.電話} onChange={e => setUserData({ ...userData, '電話': e.target.value })} />
                            </Grid>
                            <Grid item xs={4} lg={8}>
                                <Typography variant='subtitle1'>地址 </Typography>
                            </Grid>
                            <Grid item xs={8} lg={4}>
                                <TextField fullWidth placeholder='請輸入所在' value={userData.地址} className={classes.selfTextField} onChange={e => setUserData({ ...userData, '地址': e.target.value })} />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            {/* 隱私設定 */}
            <Grid item xs={12}>
                <Paper variant='outlined' className={classes.root} >
                    <Box mb={2}>
                        <Typography variant='h6'> 隱私設定</Typography>
                        <Typography variant='caption text'> 您可以決定要在各項 FOIS 服務中向其他人顯示哪些個人資訊</Typography>
                    </Box>
                    <Box mt={2}>
                        <Grid container justify='space-between' spacing={3}>
                            <Grid item xs={8}>
                                <Typography variant='subtitle1'>履歷公開</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify='flex-end'>
                                    <Grid item xs={4}>
                                        <Grid container justify='flex-end'>
                                            <Grid item>
                                                <ToggleButton
                                                    checked={Number(userData.履歷公開)}
                                                    onChange={(e) => { setUserData({ ...userData, '履歷公開': Number(e.target.checked) }) }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={8}>
                                <Typography variant='subtitle1'>適性測評公開</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify='flex-end'>
                                    <Grid item xs={4}>
                                        <Grid container justify='flex-end'>
                                            <Grid item>
                                                <ToggleButton
                                                    checked={Number(userData.適性測評公開)}
                                                    onChange={(e) => { setUserData({ ...userData, '適性測評公開': Number(e.target.checked) }) }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant='subtitle1'>IDP公開</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Grid container justify='flex-end'>
                                    <Grid item>
                                        <ToggleButton
                                            checked={Number(userData.IDP公開)}
                                            onChange={(e) => { setUserData({ ...userData, 'IDP公開': Number(e.target.checked) }) }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Button fullWidth variant="contained" color="secondary"
                    onClick={updata}
                >更改基本資料</Button>
            </Grid>
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

        </Grid>

    )
}
//tabs - 2
function Education() {
    const classes = useStyles();
    let [userData, setUserData] = useContext(UserData)
    let [schoolData, setSchoolData] = useState() //學校初始資料
    let [select, setSelect] = useState('') // 學校已選資料
    let [circleProgress, SetcircleProgress] = useState(
        { circleProgress0: false, circleProgress1: false, circleProgress2: false, circleProgress3: false })
    let [alertState, setAlertState] = useState({
        text: '上傳檔案過大',
        severity: 'error',
        open: false
    });

    useEffect(() => {
        console.log('學歷分頁');
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
                'key': 'userSearchSchoolData',
                'JWT': state
            }),
        }).then(res => {
            return res.json();
        }).then(result => {
            // console.log(result);
            if (result.狀態 == '查詢成功') {
                setSchoolData({
                    高中職: result.結果.高中職,
                    二技: result.結果.二技,
                    二專: result.結果.二專,
                    五專: result.結果.五專,
                    四技: result.結果.四技,
                    學士: result.結果.學士,
                    碩士: result.結果.碩士,
                    博士: result.結果.博士
                })
            } else {
                console.log(result.errorCode);
            }
        }).catch((error) => console.error('Error:', error))
    }, []);

    function uploadFileHandle0(e) {
        let file = e.target.files[0]
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i].indexOf('state') >= 0) {
            state = cookies[i].split('=')[1]
          } 
        }
        //取消上傳時會是空的需判斷
        if (file) {
            let fileSize = file.size / 1048576 //MB
            if (fileSize <= 20) {
                SetcircleProgress({ ...circleProgress, circleProgress0: true }) //上傳動畫
                let formData = new FormData()
                formData.append('key', 'userUploadFile')
                formData.append('JWT', state)
                formData.append('File_Data', file)
                formData.append('File_Name', file.name)
                formData.append('File_Type', file.name.split('.')[1])
                formData.append('Upload_Type', '學歷0')
                fetch('https://demo.fois.online/Fois_Class/Main.php', {
                    method: 'POST',
                    body: formData
                }).then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result);
                    if (result.狀態 == '上傳成功') {
                        SetcircleProgress({ ...circleProgress, circleProgress0: false })
                        setUserData({ ...userData, 學歷0: { ...userData.學歷0, 檔案名稱: file.name, 檔案路徑: result.結果 } })
                        setAlertState({ severity: 'success', text: '上傳成功', open: true })
                    } else {
                        setAlertState({ ...alertState, open: true, text: result.errorCode })
                    }

                }).catch((error) => console.error('Error:', error))

            } else {
                setAlertState({ ...alertState, open: true }) //檔案上傳過大Alert
            }
        }
    }
    function uploadFileHandle1(e) {
        let file = e.target.files[0]
        //取消上傳時會是空的需判斷
        if (file) {
            let fileSize = file.size / 1048576 //MB
            let cookies = document.cookie.split(';')
            let state = ''
            for (let i = 0; i < cookies.length; i++) {
              if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
              } 
            }
            if (fileSize <= 20) {
                SetcircleProgress({ ...circleProgress, circleProgress1: true }) //上傳動畫
                let formData = new FormData()
                formData.append('key', 'userUploadFile')
                formData.append('JWT', state)
                formData.append('File_Data', file)
                formData.append('File_Name', file.name)
                formData.append('File_Type', file.name.split('.')[1])
                formData.append('Upload_Type', '學歷1')
                fetch('https://demo.fois.online/Fois_Class/Main.php', {
                    method: 'POST',
                    body: formData
                }).then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result);
                    if (result.狀態 == '上傳成功') {
                        SetcircleProgress({ ...circleProgress, circleProgress1: false })
                        setUserData({ ...userData, 學歷1: { ...userData.學歷1, 檔案名稱: file.name, 檔案路徑: result.結果 } })
                        setAlertState({ severity: 'success', text: '上傳成功', open: true })
                    } else {
                        setAlertState({ ...alertState, open: true, text: result.errorCode })
                    }

                }).catch((error) => console.error('Error:', error))

            } else {
                setAlertState({ ...alertState, open: true }) //檔案上傳過大Alert
            }
        }
    }
    function uploadFileHandle2(e) {
        let file = e.target.files[0]
        //取消上傳時會是空的需判斷
        if (file) {
            let fileSize = file.size / 1048576 //MB
            let cookies = document.cookie.split(';')
            let state = ''
            for (let i = 0; i < cookies.length; i++) {
              if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
              } 
            }
            if (fileSize <= 20) {
                SetcircleProgress({ ...circleProgress, circleProgress2: true }) //上傳動畫
                let formData = new FormData()
                formData.append('key', 'userUploadFile')
                formData.append('JWT', state)
                formData.append('File_Data', file)
                formData.append('File_Name', file.name)
                formData.append('File_Type', file.name.split('.')[1])
                formData.append('Upload_Type', '學歷2')
                fetch('https://demo.fois.online/Fois_Class/Main.php', {
                    method: 'POST',
                    body: formData
                }).then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result);
                    if (result.狀態 == '上傳成功') {
                        SetcircleProgress({ ...circleProgress, circleProgress2: false })
                        setUserData({ ...userData, 學歷2: { ...userData.學歷2, 檔案名稱: file.name, 檔案路徑: result.結果 } })
                        setAlertState({ severity: 'success', text: '上傳成功', open: true })
                    } else {
                        setAlertState({ ...alertState, open: true, text: result.errorCode })
                    }

                }).catch((error) => console.error('Error:', error))

            } else {
                setAlertState({ ...alertState, open: true }) //檔案上傳過大Alert
            }
        }
    }
    function uploadFileHandle3(e) {
        let file = e.target.files[0]
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i].indexOf('state') >= 0) {
            state = cookies[i].split('=')[1]
          } 
        }
        //取消上傳時會是空的需判斷
        if (file) {
            let fileSize = file.size / 1048576 //MB
            if (fileSize <= 20) {
                SetcircleProgress({ ...circleProgress, circleProgress3: true }) //上傳動畫
                let formData = new FormData()
                formData.append('key', 'userUploadFile')
                formData.append('JWT', state)
                formData.append('File_Data', file)
                formData.append('File_Name', file.name)
                formData.append('File_Type', file.name.split('.')[1])
                formData.append('Upload_Type', '學歷3')
                fetch('https://demo.fois.online/Fois_Class/Main.php', {
                    method: 'POST',
                    body: formData
                }).then(res => {
                    return res.json();
                }).then(result => {
                    // console.log(result);
                    if (result.狀態 == '上傳成功') {
                        SetcircleProgress({ ...circleProgress, circleProgress3: false })
                        setUserData({ ...userData, 學歷3: { ...userData.學歷3, 檔案名稱: file.name, 檔案路徑: result.結果 } })
                        setAlertState({ severity: 'success', text: '上傳成功', open: true })
                    } else {
                        setAlertState({ ...alertState, open: true, text: result.errorCode })
                    }

                }).catch((error) => console.error('Error:', error))

            } else {
                setAlertState({ ...alertState, open: true }) //檔案上傳過大Alert
            }
        }
    }
    function updataEducation() {
        console.log(userData);
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
                'key': 'memberSaveResumeData',
                'JWT': state,
                ...userData
            }),
        }).then(res => {

            return res.json();
        }).then(result => {
            // console.log(userData);
            if (result.狀態 == '儲存成功') {

                setAlertState({ severity: 'success', text: result.狀態, open: true })
            } else {
                setAlertState({ severity: 'error', text: result.errorCode, open: true })
            }
        }).catch((error) => console.error('Error:', error))
    }
    return (
        <>
            <Grid container spacing={2}>
                {/* 學歷0 */}
                <Grid item xs={12}>
                    <Paper variant='outlined' className={classes.root} >
                        <Box mb={2}>
                            <Typography variant='h6'> 學歷資訊</Typography>
                        </Box>
                        <Box mt={2}>
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學位等級</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <TextField
                                        fullWidth
                                        select
                                        SelectProps={{ native: true }}
                                        size='small'
                                        variant="outlined"
                                        className={classes.selfTextField}
                                        value={userData.學歷0 ? userData.學歷0.f2 : ''}
                                        onChange={(e) => { setUserData({ ...userData, 學歷0: { ...userData.學歷0, f2: e.target.value } }) }} //學位等級選擇
                                    >
                                        <option selected value='請選擇學位'>請選擇學位</option>
                                        <option value='高中職'>高中職</option>
                                        <option value='二技'>二技</option>
                                        <option value='四技'>四技</option>
                                        <option value='二專'>二專</option>
                                        <option value='五專'>五專</option>
                                        <option value='學士'>學士</option>
                                        <option value='碩士'>碩士</option>
                                        <option value='博士'>博士</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學校名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        size='small'
                                        freeSolo
                                        autoSelect //輸入不存在的不按Enter資料不會送出，此選項會在失去焦點的時候自動送出資料
                                        //因為資料結構初始化取一層會是undefind,取兩層會直接錯誤必須先判
                                        //當effect載入後state會更新，就會取到值了
                                        value={userData.學歷0 ? userData.學歷0.f0 : ''}
                                        //第一層必須有職 && school必須載入完成 && 學位不是 '請選擇學位'
                                        options={userData.學歷0.f2 && schoolData && userData.學歷0.f2 !== '請選擇學位' ? Object.keys(schoolData[userData.學歷0.f2]) : []}
                                        onChange={(event, value) => setUserData({ ...userData, 學歷0: { ...userData.學歷0, f0: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params}
                                                placeholder='請輸入學校'
                                                margin="none"
                                                size='small'
                                                variant="outlined"
                                                className={classes.selfTextField}
                                                onChange={(event, value) => setUserData({ ...userData, 學歷0: { ...userData.學歷0, f0: value } })}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>科系名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        autoSelect
                                        value={userData.學歷0 ? userData.學歷0.f1 : ''}
                                        //第一層必須有職 && school必須載入完成 && 學校必須有選 && 學位不是 '請選擇學位' && 就算學位有選但學校自己打還是不行 所以要加判斷       
                                        options={userData.學歷0 && schoolData && userData.學歷0.f0 && userData.學歷0.f2 !== '請選擇學位' && schoolData[userData.學歷0.f2][userData.學歷0.f0] ? schoolData[userData.學歷0.f2][userData.學歷0.f0] : []}//選項清單資料
                                        onChange={(event, value) => setUserData({ ...userData, 學歷0: { ...userData.學歷0, f1: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='請輸入科系' margin="none" size='small' variant="outlined" className={classes.selfTextField} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>畢業日期</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <DatePicker edu='0' />
                                </Grid>
                                {/* 自傳檔案 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>自傳檔案 </Typography>
                                </Grid>
                                <Grid item container xs={8} lg={4} wrap='nowrap' justify='space-between' alignItems='center'>
                                    <Typography variant='body1' align='center'>
                                        {
                                            userData.學歷0 ? <a href={`https://demo.fois.online/Fois_Class/${userData.學歷0.檔案路徑}`} target='_blank'>{userData.學歷0.檔案名稱}</a> : '未上傳'
                                        }
                                    </Typography>
                                    {circleProgress.circleProgress0 ? <CircularProgress style={{ width: 20, height: 20 }} /> : <InsertDriveFileIcon color='secondary' />}
                                </Grid>
                                {/* 自傳上傳 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1' >自傳上傳 </Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Button fullWidth variant="contained" color="secondary" component="label" >
                                        上傳自傳
                                    <input
                                            onChange={uploadFileHandle0}
                                            type="file"
                                            style={{ display: "none" }}
                                            accept=".doc,.docx,.pdf"
                                        />
                                    </Button>
                                    <Box mt={1}>
                                        <Typography component='p' align='center' color='secondary.tex' variant='caption text' >※上傳格式為(pdf,doc,docx) | 上傳限制大小為20MB </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                {/* 學歷1 */}
                <Grid item xs={12}>
                    <Paper variant='outlined' className={classes.root} >
                        <Box mb={2}>
                            <Typography variant='h6'> 學歷資訊</Typography>
                        </Box>
                        <Box mt={2}>
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學位等級</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <TextField
                                        fullWidth
                                        select
                                        SelectProps={{ native: true }}
                                        size='small'
                                        variant="outlined"
                                        className={classes.selfTextField}
                                        value={userData.學歷1 ? userData.學歷1.f2 : ''}
                                        onChange={(e) => { setUserData({ ...userData, 學歷1: { ...userData.學歷1, f2: e.target.value } }) }} //學位等級選擇
                                    >
                                        <option selected value='請選擇學位'>請選擇學位</option>
                                        <option value='高中職'>高中職</option>
                                        <option value='二技'>二技</option>
                                        <option value='四技'>四技</option>
                                        <option value='二專'>二專</option>
                                        <option value='五專'>五專</option>
                                        <option value='學士'>學士</option>
                                        <option value='碩士'>碩士</option>
                                        <option value='博士'>博士</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學校名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        size='small'
                                        freeSolo
                                        autoSelect
                                        value={userData.學歷1 ? userData.學歷1.f0 : ''}
                                        //選項清單資料，因為依賴的是f2的值，在學位等級還沒有選之前f2沒有值
                                        //schoolData effect載入 初始不存在，因此需要判斷
                                        options={userData.學歷1.f2 && schoolData && userData.學歷1.f2 !== '請選擇學位' ? Object.keys(schoolData[userData.學歷1.f2]) : []}
                                        onChange={(event, value) => setUserData({ ...userData, 學歷1: { ...userData.學歷1, f0: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='請輸入學校' margin="none" size='small' variant="outlined" className={classes.selfTextField} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>科系名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        autoSelect
                                        value={userData.學歷1 ? userData.學歷1.f1 : ''}
                                        options={userData.學歷1 && schoolData && userData.學歷1.f0 && userData.學歷1.f2 !== '請選擇學位' && schoolData[userData.學歷1.f2][userData.學歷1.f0] ? schoolData[userData.學歷1.f2][userData.學歷1.f0] : []}//選項清單資料
                                        onChange={(event, value) => setUserData({ ...userData, 學歷1: { ...userData.學歷1, f1: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='請輸入科系' margin="none" size='small' variant="outlined" className={classes.selfTextField} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>畢業日期</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <DatePicker edu='1' />
                                </Grid>
                                {/* 自傳檔案 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>自傳檔案 </Typography>
                                </Grid>
                                <Grid item container xs={8} lg={4} wrap='nowrap' justify='space-between' alignItems='center'>
                                    <Typography variant='body1' align='center'>
                                        {
                                            userData.學歷1 ? <a href={`https://demo.fois.online/Fois_Class/${userData.學歷1.檔案路徑}`} target='_blank'>{userData.學歷1.檔案名稱}</a> : '未上傳'
                                        }
                                    </Typography>
                                    {circleProgress.circleProgress1 ? <CircularProgress style={{ width: 20, height: 20 }} /> : <InsertDriveFileIcon color='secondary' />}
                                </Grid>
                                {/* 自傳上傳 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1' >自傳上傳 </Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Button fullWidth variant="contained" color="secondary" component="label" >
                                        上傳自傳
                                    <input
                                            onChange={uploadFileHandle1}
                                            type="file"
                                            style={{ display: "none" }}
                                            accept=".doc,.docx,.pdf"
                                        />
                                    </Button>
                                    <Box mt={1}>
                                        <Typography component='p' align='center' color='secondary.tex' variant='caption text' >※上傳格式為(pdf,doc,docx) | 上傳限制大小為20MB </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                {/* 學歷2 */}
                <Grid item xs={12}>
                    <Paper variant='outlined' className={classes.root} >
                        <Box mb={2}>
                            <Typography variant='h6'> 學歷資訊</Typography>
                        </Box>
                        <Box mt={2}>
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學位等級</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <TextField
                                        fullWidth
                                        select
                                        SelectProps={{ native: true }}
                                        size='small'
                                        variant="outlined"
                                        className={classes.selfTextField}
                                        value={userData.學歷2 ? userData.學歷2.f2 : ''}
                                        onChange={(e) => { setUserData({ ...userData, 學歷2: { ...userData.學歷2, f2: e.target.value } }) }} //學位等級選擇
                                    >
                                        <option selected value='請選擇學位'>請選擇學位</option>
                                        <option value='高中職'>高中職</option>
                                        <option value='二技'>二技</option>
                                        <option value='四技'>四技</option>
                                        <option value='二專'>二專</option>
                                        <option value='五專'>五專</option>
                                        <option value='學士'>學士</option>
                                        <option value='碩士'>碩士</option>
                                        <option value='博士'>博士</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學校名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        size='small'
                                        freeSolo
                                        autoSelect
                                        value={userData.學歷2 ? userData.學歷2.f0 : ''}
                                        //選項清單資料，因為依賴的是f2的值，在學位等級還沒有選之前f2沒有值
                                        //schoolData effect載入 初始不存在，因此需要判斷
                                        options={userData.學歷2.f2 && schoolData && userData.學歷2.f2 !== '請選擇學位' ? Object.keys(schoolData[userData.學歷2.f2]) : []}
                                        onChange={(event, value) => setUserData({ ...userData, 學歷2: { ...userData.學歷2, f0: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='請輸入學校' margin="none" size='small' variant="outlined" className={classes.selfTextField} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>科系名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        autoSelect
                                        value={userData.學歷2 ? userData.學歷2.f1 : ''}
                                        options={userData.學歷2&& schoolData && userData.學歷2.f0 && userData.學歷2.f2 !== '請選擇學位' && schoolData[userData.學歷2.f2][userData.學歷2.f0]? schoolData[userData.學歷2.f2][userData.學歷2.f0] : []}//選項清單資料
                                        onChange={(event, value) => setUserData({ ...userData, 學歷2: { ...userData.學歷2, f1: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='請輸入科系' margin="none" size='small' variant="outlined" className={classes.selfTextField} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>畢業日期</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <DatePicker edu='2' />
                                </Grid>
                                {/* 自傳檔案 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>自傳檔案 </Typography>
                                </Grid>
                                <Grid item container xs={8} lg={4} wrap='nowrap' justify='space-between' alignItems='center'>
                                    <Typography variant='body1' align='center'>
                                        {
                                            userData.學歷2 ? <a href={`https://demo.fois.online/Fois_Class/${userData.學歷2.檔案路徑}`} target='_blank'>{userData.學歷2.檔案名稱}</a> : '未上傳'
                                        }
                                    </Typography>
                                    {circleProgress.circleProgress2 ? <CircularProgress style={{ width: 20, height: 20 }} /> : <InsertDriveFileIcon color='secondary' />}
                                </Grid>
                                {/* 自傳上傳 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1' >自傳上傳 </Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Button fullWidth variant="contained" color="secondary" component="label" >
                                        上傳自傳
                                    <input
                                            onChange={uploadFileHandle2}
                                            type="file"
                                            style={{ display: "none" }}
                                            accept=".doc,.docx,.pdf"
                                        />
                                    </Button>
                                    <Box mt={1}>
                                        <Typography component='p' align='center' color='secondary.tex' variant='caption text' >※上傳格式為(pdf,doc,docx) | 上傳限制大小為20MB </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                {/* 學歷3 */}
                <Grid item xs={12}>
                    <Paper variant='outlined' className={classes.root} >
                        <Box mb={2}>
                            <Typography variant='h6'> 學歷資訊</Typography>
                        </Box>
                        <Box mt={2}>
                            <Grid container justify='space-between' alignItems='center' spacing={1}>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學位等級</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <TextField
                                        fullWidth
                                        select
                                        SelectProps={{ native: true }}
                                        size='small'
                                        variant="outlined"
                                        className={classes.selfTextField}
                                        value={userData.學歷3 ? userData.學歷3.f2 : ''}
                                        onChange={(e) => { setUserData({ ...userData, 學歷3: { ...userData.學歷3, f2: e.target.value } }) }} //學位等級選擇
                                    >
                                        <option selected value='請選擇學位'>請選擇學位</option>
                                        <option value='高中職'>高中職</option>
                                        <option value='二技'>二技</option>
                                        <option value='四技'>四技</option>
                                        <option value='二專'>二專</option>
                                        <option value='五專'>五專</option>
                                        <option value='學士'>學士</option>
                                        <option value='碩士'>碩士</option>
                                        <option value='博士'>博士</option>
                                    </TextField>
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>學校名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        size='small'
                                        freeSolo
                                        autoSelect
                                        value={userData.學歷3 ? userData.學歷3.f0 : ''}
                                        //選項清單資料，因為依賴的是f2的值，在學位等級還沒有選之前f2沒有值
                                        //schoolData effect載入 初始不存在，因此需要判斷
                                        options={userData.學歷3.f2 && schoolData && userData.學歷3.f2 !== '請選擇學位' ? Object.keys(schoolData[userData.學歷3.f2]) : []}
                                        onChange={(event, value) => setUserData({ ...userData, 學歷3: { ...userData.學歷3, f0: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='請輸入學校' margin="none" size='small' variant="outlined" className={classes.selfTextField} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>科系名稱</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Autocomplete
                                        id="free-solo-demo"
                                        freeSolo
                                        autoSelect
                                        value={userData.學歷3 ? userData.學歷3.f1 : ''}
                                        options={userData.學歷3 && schoolData && userData.學歷3.f0 && userData.學歷3.f2 !== '請選擇學位' && schoolData[userData.學歷3.f2][userData.學歷3.f0] ? schoolData[userData.學歷3.f2][userData.學歷3.f0] : []}//選項清單資料
                                        onChange={(event, value) => setUserData({ ...userData, 學歷3: { ...userData.學歷3, f1: value } })}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='請輸入科系' margin="none" size='small' variant="outlined" className={classes.selfTextField} />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>畢業日期</Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <DatePicker edu='1' />
                                </Grid>
                                {/* 自傳檔案 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1'>自傳檔案 </Typography>
                                </Grid>
                                <Grid item container xs={8} lg={4} wrap='nowrap' justify='space-between' alignItems='center'>
                                    <Typography variant='body1' align='center'>
                                        {
                                            userData.學歷3 ? <a href={`https://demo.fois.online/Fois_Class/${userData.學歷3.檔案路徑}`} target='_blank'>{userData.學歷3.檔案名稱}</a> : '未上傳'
                                        }
                                    </Typography>
                                    {circleProgress.circleProgress3 ? <CircularProgress style={{ width: 20, height: 20 }} /> : <InsertDriveFileIcon color='secondary' />}
                                </Grid>
                                {/* 自傳上傳 */}
                                <Grid item xs={4} lg={8}>
                                    <Typography variant='subtitle1' >自傳上傳 </Typography>
                                </Grid>
                                <Grid item xs={8} lg={4}>
                                    <Button fullWidth variant="contained" color="secondary" component="label" >
                                        上傳自傳
                                    <input
                                            onChange={uploadFileHandle3}
                                            type="file"
                                            style={{ display: "none" }}
                                            accept=".doc,.docx,.pdf"
                                        />
                                    </Button>
                                    <Box mt={1}>
                                        <Typography component='p' align='center' color='secondary.tex' variant='caption text' >※上傳格式為(pdf,doc,docx) | 上傳限制大小為20MB </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="secondary"
                        onClick={updataEducation}
                    >更改基本資料</Button>
                </Grid>
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
            </Grid>

        </>
    )
}
export default function ResumePage() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();
    let history = useHistory()
    let [userData, setUserData] = useContext(UserData)
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
                        <Tab label="個資" component={Link} to={`${url}/個資`} />
                        <Tab label="學歷" component={Link} to={`${url}/學歷`} />
                        {/* <Tab label="資歷" component={Link} to={`${url}/證照`} />
                        <Tab label="證照" component={Link} to={`${url}/證照`} />
                        <Tab label="訓練" component={Link} to={`${url}/證照`} /> */}
                    </Tabs>
                </Paper>
            </Box>

            <Switch>
{/* 
                <Route path={`${path}/訓練`} component={UserInfo} />
                <Route path={`${path}/證照`} component={UserInfo} />
                <Route path={`${path}/資歷`} component={UserInfo} />
                <Route path={`${path}/證照`} component={UserInfo} /> */}
                <Route path={`${path}/學歷`} component={Education} />
                <Route path={`${path}/個資`} component={UserInfo} />
            </Switch>
        </>



    )
}

