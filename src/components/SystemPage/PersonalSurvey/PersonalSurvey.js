import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useRouteMatch } from "react-router-dom";
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ChevronRight from "@material-ui/icons/ChevronRight";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import InfiniteScroll from "react-infinite-scroll-component";//滑動載入
import WorkInterestBackground from '../../img/WorkInterestBackground.jpg'
import Chart from 'react-apexcharts'
import JobDescription from '../JobDescription/JobDescription'
import { set } from 'date-fns';
import { FlareSharp } from '@material-ui/icons';

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
    },
    SteperBackground: {
        background: 'none'
    },
    workInterestBanner: {
        height: 'auto',
        width: '100%',
    }

}))

function WorkInterest() {
    let classes = useStyles()
    //問卷選擇結果
    let [ans, setAns] = useState({
        // 1: "不喜歡",
        2: "不喜歡",
        3: "不喜歡",
        4: "不喜歡",
        5: "不確定",
        6: "不確定",
        7: "不喜歡",
        8: "不喜歡",
        9: "不確定",
        10: "不喜歡",
        11: "不喜歡",
        12: "不喜歡",
        13: "不喜歡",
        14: "不喜歡",
        15: "不喜歡",
        16: "不確定",
        17: "不確定",
        18: "不喜歡",
        19: "不喜歡",
        20: "不喜歡",
        21: "不喜歡",
        22: "不喜歡",
        23: "不喜歡",
        24: "不喜歡",
        25: "不喜歡",
        26: "不確定",
        27: "喜歡",
        28: "喜歡",
        29: "不確定",
        30: "不喜歡",
        31: "不喜歡",
        32: "不喜歡",
        33: "不喜歡",
        34: "不確定",
        35: "不喜歡",
        36: "不確定",
        37: "不喜歡",
        38: "不喜歡",
        39: "不喜歡",
        40: "不確定",
        41: "不確定",
        42: "喜歡",
        43: "不喜歡",
        44: "不喜歡",
        45: "不喜歡",
        46: "不喜歡",
        47: "不喜歡",
        48: "不喜歡",
        49: "不喜歡",
        50: "不喜歡",
        51: "不喜歡",
        52: "不喜歡",
        53: "不確定",
        54: "不確定",
        55: "不喜歡",
        56: "不喜歡",
        57: "不喜歡",
        58: "不喜歡",
        59: "不喜歡",
        60: "喜歡",
        61: "喜歡",
        62: "不喜歡",
        63: "不喜歡",
        64: "喜歡",
        65: "喜歡",
        66: "不確定",
        67: "不喜歡",
        68: "不喜歡",
        69: "不喜歡",
        70: "不喜歡",
        71: "不喜歡",
        72: "不喜歡",
        73: "不喜歡",
        74: "不確定",
        75: "不確定",
        76: "不確定",
        77: "不確定",
        78: "不確定",
        79: "不喜歡",
        80: "不喜歡",
        81: "不喜歡",
        82: "不喜歡",
        83: "不確定",
        84: "不確定",
        85: "不確定",
        86: "不喜歡",
        87: "不喜歡",
        88: "不確定",
        89: "喜歡",
        90: "喜歡",
        91: "不喜歡",
        92: "不喜歡",
        93: "不確定",
        94: "不喜歡",
        95: "不喜歡",
        96: "不喜歡",
        97: "不喜歡",
        98: "不喜歡",
        99: "喜歡",
        100: "不確定",
        101: "不確定",
        102: "不確定",
        103: "不喜歡",
        104: "不喜歡",
        105: "不喜歡",
        106: "不喜歡",
        107: "不喜歡",
        108: "不喜歡",
        109: "不確定",
        110: "不喜歡",
        111: "不喜歡",
        112: "不喜歡",
        113: "不喜歡",
        114: "不確定",
        115: "不喜歡",
        116: "不喜歡",
        117: "不確定",
        118: "不喜歡",
        119: "不喜歡",
        120: "不喜歡",
        121: "不喜歡",
        122: "不喜歡",
        123: "不確定",
        124: "喜歡",
        125: "喜歡",
        126: "喜歡",
        127: "不喜歡",
        128: "不喜歡",
        129: "不確定",
        130: "不喜歡",
        131: "不喜歡",
        132: "不喜歡",
        133: "不喜歡",
        134: "不喜歡",
        135: "喜歡",
        136: "不確定",
        137: "喜歡",
        138: "喜歡",
        139: "不喜歡",
        140: "喜歡",
        141: "不確定",
        142: "不喜歡",
        143: "不喜歡",
        144: "不喜歡",
        145: "不喜歡",
        146: "不喜歡",
        147: "不確定",
        148: "不確定",
        149: "不喜歡",
        150: "喜歡",
        151: "不喜歡",
        152: "不喜歡",
        153: "不喜歡",
        154: "不喜歡",
        155: "不喜歡",
        156: "不喜歡",
        157: "不喜歡",
        158: "不喜歡",
        159: "不喜歡",
        160: "不喜歡",
        161: "喜歡",
        162: "不確定",
        163: "不喜歡",
        164: "不喜歡",
        165: "不喜歡",
        166: "不喜歡",
        167: "不確定",
        168: "不喜歡",
        169: "不確定",
        170: "不喜歡",
        171: "不喜歡",
        172: "喜歡",
        173: "喜歡",
        174: "不喜歡",
        175: "不喜歡",
        176: "不喜歡",
        177: "不喜歡",
        178: "不喜歡",
        179: "不喜歡",
        180: "不喜歡",
    })
    let [alertState, setAlertState] = useState({
        text: '',
        severity: 'error',
        open: false
    });
    let [error, setError] = useState(false); //有沒填的錯誤state 目前沒用到
    let [helperText, setHelperText] = useState('');//error state 的text
    let [activeStep, setActiveStep] = useState(0);  //step的狀態
    let steptText = ['測評介紹', '測評開始', '測評結果']//step的文字
    let ansTmp = {} // 答案暫存區
    let [surveyResult, setSurveyResult] = useState()//測驗結果說明
    let [onet, setOnet] = useState()//onet
    let [selectOnet,setSelectOnet] = useState()//選擇的Onet
    let [taiwan, setTaiwan] = useState()//台灣
   
    let [chart, setChart] = useState({

        series: [{
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
        }],
        options: {
            chart: {
                type: 'radar',
                toolbar: {
                    show: false
                }
            },
            title: {
                // text: 'Basic Radar Chart'
            },
            xaxis: {
                categories: ['R', 'I', 'A', 'S', 'E', 'C']
            }
            , responsive: [{
                breakpoint: 500,
                options: {
                    chart: {
                        width: 300
                    }
                },
            }]
        }
    })
    let [jobDescripOpen,setJobDescripOpen] = useState(false)
    let ansSelect = e => {
        console.log('ansSelect');
        ansTmp = { ...ansTmp, [e.target.name]: e.target.value }
    }

    //因為radio有required,外層有form的onSubmit會去偵測必填的有沒有填
    //這裡是處理form送出的事件
    let handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit');
        setAns({ ...ans, ...ansTmp })
    }
    //onet展開
    let handleOpen = onetID => e => {
        setJobDescripOpen(!jobDescripOpen)
        setSelectOnet(onet[onetID])
      
    }
  

    let [q, setQ] = useState(['1.裝修櫥櫃', '2.運鈔車保全', '3.太空旅行研究', '4.海底地圖繪製', '5.參與樂團演出', '6.出版品寫作', '7.教導他人例行工作', '8.從事醫護性工作', '9.股票和債券買賣', '10.管理零售商店', '11.使用電腦試算表軟體', '12.文書資料校對', '13.從事農牧相關工作', '14.砌磚或鋪瓦相關工作', '15.歷史文化的研究'])
    let q1 = ['16.動物行為的研究', '17.戲劇導演', '18.為表演編舞', '19.施行CPR救人', '20.協助他人處理情緒問題', '21.銷售電信設備', '22.經營美容或美髮店', '23.使用電腦軟體處理客戶訂單與帳款', '24.處理工作的會議排程', '25.監看工廠生產線的組裝作業', '26.維修家用電器', '27.開發新的設備', '28.計畫一項研究', '29.編寫劇本', '30.演奏樂器']
    let q2 = ['31.教導兒童閱讀', '32.協助智能障礙兒童學習', '33.電話行銷', '34.經營平面媒體', '35.處理應付帳款或應收賬款', '36.安裝電腦軟體', '37.計程車司機', '38.裝設地板', '39.水污染防治研究', '40.醫學療程的研究', '41.在觀眾面前表演喜劇', '42.電影、戲劇、或電視節目的客串演出', '43.小學教師', '44.職涯諮商', '45.產品銷售之業務簡報']
    let q3 = ['46.土地買賣', '47.使用電腦進行銀行轉帳作業', '48.辦公室會議的組織與排程', '49.水產品養殖', '50.鋪設道路', '51.確定某種新的疾病感染率', '52.礦石研究', '53.評論出版品或表演節目', '54.音樂創作', '55.主辦兒童夏令營', '56.協助他人解決家庭問題', '57.銷售音樂光碟', '58.經營或管理玩具店', '59.使用電腦文書軟體', '60.電子計算機使用']
    let q4 = ['61.組裝電子零件或設備', '62.快遞或物流運輸的工作', '63.診斷和治療病畜或寵物', '64.研究世界各地領導人的個性', '65.電影或電視演員', '66.舞台劇演員', '67.協助復健治療', '68.從事非營利組織的志工', '69.經營或管理旅館', '70.從事房屋仲介的工作', '71.從事公司總機工作', '72.從事辦公室的檔案管理工作', '73.油漆或粉刷房間', '74.執法性的工作', '75.化學實驗']
    let q5 = ['76.生物研究', '77.繪畫', '78.歌唱表演', '79.老人照護', '80.兒童體育教練', '81.夜市或活動擺攤', '82.經營或管理超商', '83.處理數字資料', '84.公司薪資發放的查驗工作', '85.操作工廠的生產機械', '86.在離岸的鑽油平台工作', '87.城市人口成長研究', '88.海洋生物研究', '89.電影或電視節目的特技表演', '90.電影特效製作']
    let q6 = ['91.教導殘障人士生活技能', '92.教導聽障人士手語', '93.擔任公司部門主管', '94.銷售飲料產品給商店或餐廳', '95.會議記錄', '96.文件收發紀錄', '97.車輛租賃服務', '98.生產線之產品租裝工作', '99.犯罪調查', '100.天文研究', '101.合唱表演', '102.舞台表演', '103.協助他人戒斷毒癮', '104.團體諮商工作', '105.在電影院銷售零嘴點心']
    let q7 = ['106.向髮廊推銷美髮商品', '107.薪資計算工作', '108.協助會計師執行記帳工作', '109.上漁船捕魚', '110.翻新家具', '111.使用顯微鏡檢驗血液樣本', '112.調查火災事故的原因', '113.舞台道具的準備與佈置', '114.面試歌手與樂手', '115.照顧病患的親人', '116.替他人按摩推拿', '117.自己創業當老闆', '118.合約議價', '119.處理包裹的寄送', '120.使用物流設備處理庫存資材']
    let q8 = ['121.修復壞掉的水龍頭', '122.清洗或維護保養相關工作', '123.人體組織與功能的研究', '124.犯罪心理的研究', '125.戲劇製作', '126.電台節目的製播', '127.協助殘疾病人復健', '128.心理或生理疾病的諮商輔導', '129.法律訴訟協助', '130.職業經紀人', '131.公司文件的檔案管理', '132.公司財會相關作業紀錄', '133.整理公園的草皮', '134.操作生產線上的機台', '135.研究提高預報氣象準確度的方法']
    let q9 = ['136.在生物實驗室工作', '137.邊寫電影或電視節目劇本', '138.歌曲的作詞作曲', '139.訓練殘障人士工作與生活', '140.企劃和執行遊樂活動', '141.負責公司的營運', '142.行銷新款衣飾商品', '143.處理客戶的請款資料', '144.處理影印工作', '145.噴灑樹木，以防止有害昆蟲傳播', '146.物品瑕疵的檢驗', '147.發明一種替代糖', '148.遺傳學研究', '149.演奏爵士樂或表演踢踏舞', '150.電影導演']
    let q10 = ['151.兒童照顧的工作', '152.企劃和執行殘障人士的參訪活動', '153.銷售報紙廣告', '154.百貨公司的專櫃工作', '155.登錄租金支付紀錄', '156.電腦資料的輸入作業', '157.遊艇駕駛', '158.鎖匠', '159.研究不同國家的政府運作', '160.研究動物植物', '161.樂團主唱', '162.平面媒體之美工設計', '163.醫事助理工作', '164.少年犯的感化輔導工作', '165.汽車銷售']
    let q11 = ['166.經營或管理服飾店', '167.維護庫存紀錄', '168.維護公司的員工紀錄', '169.設定和操作生產設備', '170.森林消防員', '171.病理檢驗', '172.氣象研究', '173.剪輯電影', '174.攝影模特兒', '175.復健治療師', '176.高中教師', '177.推銷連鎖餐廳加盟業務', '178.3C商品店員', '179.從事公司郵件收發工作', '180.協助客戶處理銀行交易']
    //  滑動載入部分問卷
    let fetchMoreData = () => {
        if (q.length <= 15) {
            setQ([...q, ...q1])
            setAns({ ...ans, ...ansTmp }) //問卷滑動載入時由於setQ改變Q的state，會導致rerender必須先將tmp值存起來
        }
        if (q.length > 15 && q.length <= 30) {
            setQ([...q, ...q2])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 30 && q.length <= 45) {
            setQ([...q, ...q3])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 45 && q.length <= 60) {
            setQ([...q, ...q4])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 60 && q.length <= 75) {
            setQ([...q, ...q5])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 75 && q.length <= 90) {
            setQ([...q, ...q6])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 90 && q.length <= 105) {
            setQ([...q, ...q7])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 105 && q.length <= 120) {
            setQ([...q, ...q8])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 120 && q.length <= 135) {
            setQ([...q, ...q9])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 135 && q.length <= 150) {
            setQ([...q, ...q10])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 150 && q.length <= 165) {
            setQ([...q, ...q11])
            setAns({ ...ans, ...ansTmp })
        }
    }
    //ans 
    useEffect(() => {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
            }
        }
        console.log(ans);
        if (Object.keys(ans).length == 180) {
            fetch('https://demo.fois.online/Fois_Class/Main.php', {
                method: 'POST',
                body: JSON.stringify({
                    'key': 'memberSaveFitnessAssessmentAnswer',
                    'JWT': state,
                    '問卷名稱': '職業興趣',
                    '答題結果': ans
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                console.log(result);
                if (result.狀態 == '儲存成功') {
                    setAlertState({ severity: 'success', text: result.狀態, open: true })
                    setActiveStep(2)
                } else {
                    setAlertState({ severity: 'error', text: result.errorCode, open: true })
                }
            }).catch((error) => console.error('Error:', error))
        }
    }, [ans])
    //init
    useEffect(() => {

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
                'key': 'memberReadFitnessAssessmentData',
                'JWT': state,
            }),
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.狀態 == '查詢成功') {
                // setAlertState({ severity: 'success', text: result.狀態, open: true })
                console.log(result.結果.已做問卷結果.職業興趣.Onet職位)
                if (result.結果.已做問卷.indexOf('職業興趣') != (-1)) {
                    setActiveStep(2)
                    setSurveyResult(result.結果.已做問卷結果.職業興趣.測驗結果說明)
                    setOnet(result.結果.已做問卷結果.職業興趣.Onet職位)
                    //setTaiwan(result.結果.已做問卷結果.職業興趣.Taiwan職位)
                }

            } else {
                setAlertState({ severity: 'error', text: result.errorCode, open: true })
            }
        }).catch((error) => console.error('Error:', error))
    }, [])
    // 滑動載入部分問卷
    let questions = (q.map(value =>
        <Grid item container xs={12} alignItems='center' >

            <Grid item xs={6}>
                <FormLabel component="legend">{value}</FormLabel>
            </Grid>
            <Grid item xs={6} container justify='space-around'>
                <FormControl component="fieldset" error={error} fullWidth>
                    <RadioGroup aria-label="gender" name={value.split('.')[0]} onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
                        <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
                        <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
                        <FormControlLabel value="不確定" control={<Radio size='small' required />} />
                    </RadioGroup>
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid>
        </Grid>
    ))

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stepper activeStep={activeStep} className={classes.SteperBackground}>
                            {steptText.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    {activeStep == 0 ?
                        <>
                            <Grid item xs={12}>
                                <Paper>
                                    <Box p={2}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <img src={WorkInterestBackground} className={classes.workInterestBanner} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant='h6'>說明</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant='body1'>本測評共有180道答題，請分別在每一道答題中，選出自己「喜歡」或「不喜歡」做的事;如果您不確定自己喜歡與否，請選「不確定」。 接下來，請按〔下一頁〕按鈕，開始進行測評！</Typography>
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth variant="contained" color="secondary"
                                    onClick={() => { setActiveStep(1) }}
                                >開始</Button>
                            </Grid>
                        </>
                        : null
                    }
                    {activeStep == 1 ?
                        <>
                            <Grid item xs={12}>
                                <Paper>
                                    <Box p={2} id="scrollableDiv" style={{ height: '70vh', overflow: "auto" }}>
                                        <Grid container spacing={2} >
                                            <Grid item xs={6}>題目</Grid>

                                            <Grid container item xs={6} justify='space-around' wrap='nowrap'>
                                                <Grid item>喜歡</Grid>
                                                <Grid item>不喜歡</Grid>
                                                <Grid item>不確定</Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                        </Grid>

                                        <InfiniteScroll
                                            style={{ width: '100%' }}
                                            dataLength={q.length}
                                            next={fetchMoreData}
                                            hasMore={true}
                                            scrollableTarget="scrollableDiv"
                                        >
                                            {questions}
                                        </InfiniteScroll>

                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth variant="contained" color="secondary" onClick={() => { setActiveStep(0) }}
                                >上一頁</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="submit" fullWidth variant="contained" color="secondary"
                                >下一頁</Button>
                            </Grid>
                        </>
                        : null
                    }

                    {
                        activeStep == 2 ?
                            <>
                                <Grid item xs={12}>
                                    <Paper>
                                        <Box p={2}>
                                            <Grid container justify='center' xs={12} >
                                                <Grid item xs={12} md={6}>
                                                    <Box width="100%" mb={2}>
                                                        <Grid item xs={12}><Typography variant='body1' color='primary'>RIASEC 測評圖表</Typography></Grid>
                                                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                        <Grid item container justify='center' alignItems='center' xs={12}>
                                                            <Chart
                                                                options={chart.options}
                                                                series={chart.series}
                                                                type="radar"
                                                                width="100%"
                                                                height='auto'
                                                            />
                                                        </Grid>
                                                        <Grid item container justify='center' xs={12}> 雷達圖分析</Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={6} >
                                                    <Box width='100%' mb={2} >
                                                        <Typography variant='body1' color='primary'>RIASEC 類型定義</Typography>
                                                        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>R</Typography> </Grid>
                                                            <Grid item xs={4} > 實作型 (Realistic) </Grid>
                                                            <Grid item xs={7} > 喜歡具體的、實用的、動手做的和操作性的工作。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>I</Typography> </Grid>
                                                            <Grid item xs={4} > 藝術型 (Artistic)</Grid>
                                                            <Grid item xs={7} > 喜歡透過系統性觀察、大量思考和動腦筋尋找解答的工作。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>A</Typography> </Grid>
                                                            <Grid item xs={4} > 實作型 (Realistic) </Grid>
                                                            <Grid item xs={7} > 重視自我表現且喜歡自由、無拘束的、非系統性的工作。</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>S</Typography> </Grid>
                                                            <Grid item xs={4} > 社會型 (Social)</Grid>
                                                            <Grid item xs={7} > 喜歡能與人接觸或能與社會大眾接觸的工作。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>E</Typography> </Grid>
                                                            <Grid item xs={4} > 業務型 (Enterprising)</Grid>
                                                            <Grid item xs={7} > 喜歡領導他人以達成既定目標或獲得經濟利益的工作。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>C</Typography> </Grid>
                                                            <Grid item xs={4} > 事務型 (Conventional) </Grid>
                                                            <Grid item xs={7} > 喜歡明確的、有次序與有系統性的事務性工作的工作。 </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Box width='100%' mb={2}>
                                                        <Typography variant='body1' color='primary'>RIASEC 測評結果</Typography>
                                                        <Divider style={{ marginTop: 5, marginBottom: 10 }} />

                                                        {/* <Grid item xs={12}><Typography variant='body1' color='primary'>RIASEC 測評結果</Typography></Grid>
                                                            <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid> */}
                                                        {surveyResult ? surveyResult.map(result =>
                                                            <>
                                                                <Box width='100%' mb={2}>
                                                                    <Grid container xs={12} >
                                                                        <Grid item xs={4} md={2}> <Typography variant='body1' color='secondary'>{result.名稱}</Typography> </Grid>
                                                                        <Grid item xs={8} md={10} style={{ paddingLeft: 10 }}>{result.描述}</Grid>
                                                                    </Grid>
                                                                </Box>
                                                            </>
                                                        ) : null}

                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Box width='100%' mb={2} >
                                                        <Grid item container xs={12} >
                                                            <Grid item xs={12}><Typography variant='body1' color='primary'>Onet職位分析</Typography></Grid>
                                                            <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                            {
                                                                onet ?
                                                                    Object.keys(onet).map(onetID =>
                                                                        <div style={{ width: '100%' }}>
                                                                            <List >
                                                                                <ListItem dense button divider onClick={handleOpen(onetID)}>
                                                                                    <ListItemText primary={onet[onetID].職位名稱} secondary={onetID} />
                                                                                    <ChevronRight/>
                                                                                </ListItem>
                                                                            </List>
                                                                        </div>
                                                                    ) : null
                                                            }
                                                            {/* 不放在回圈裡面 避免產生很多的jobdescription */}
                                                            <JobDescription selectOnet={selectOnet} jobDescripOpen={jobDescripOpen} setJobDescripOpen={setJobDescripOpen}/>
                                                        </Grid>

                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Paper>
                                </Grid>
                            </>
                            : null
                    }
                </Grid>
            </form>
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
        </>
    );
}
export default function PersonalSurvey() {
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
                        <Tab label="職業興趣" component={Link} to={`${url}/職業興趣`} />
                        <Tab label="人格特質" component={Link} to={`${url}/人格特質`} />
                        <Tab label="工作風格" component={Link} to={`${url}/工作風格`} />
                        <Tab label="工作價值觀" component={Link} to={`${url}/工作價值觀`} />
                    </Tabs>
                </Paper>
            </Box>

            <Switch>

                <Route path={`${path}/職業興趣`} component={WorkInterest} />

            </Switch>
        </>



    )
}
{/* question = (
        <>
            <Grid container spacing={4}>
                <Grid item container justify='flex-start' alignItems="flex-start" al xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">1.裝修櫥櫃</FormLabel>
                        <RadioGroup aria-label="gender" name="1" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">2.運鈔車保全</FormLabel>
                        <RadioGroup aria-label="gender" name="2" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                   let     </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>

                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">3.太空旅行研究</FormLabel>
                        <RadioGroup aria-label="gender" name="3" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">4.海底地圖繪製</FormLabel>
                        <RadioGroup aria-label="gender" name="4" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">5.參與樂團演出</FormLabel>
                        <RadioGroup aria-label="gender" name="5" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">6.出版品寫作</FormLabel>
                        <RadioGroup aria-label="gender" name="6" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">7.教導他人例行工作</FormLabel>
                        <RadioGroup aria-label="gender" name="7" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">8.從事醫護性工作</FormLabel>
                        <RadioGroup aria-label="gender" name="8" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">9.股票和債券買賣</FormLabel>
                        <RadioGroup aria-label="gender" name="9" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">10.管理零售商店</FormLabel>
                        <RadioGroup aria-label="gender" name="10" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">11.使用電腦試算表軟體</FormLabel>
                        <RadioGroup aria-label="gender" name="11" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">12.文書資料校對</FormLabel>
                        <RadioGroup aria-label="gender" name="12" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">13.從事農牧相關工作</FormLabel>
                        <RadioGroup aria-label="gender" name="13" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">14.砌磚或鋪瓦相關工作</FormLabel>
                        <RadioGroup aria-label="gender" name="14" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">15.歷史文化的研究</FormLabel>
                        <RadioGroup aria-label="gender" name="15" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">16.動物行為的研究</FormLabel>
                        <RadioGroup aria-label="gender" name="16" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">17.戲劇導演</FormLabel>
                        <RadioGroup aria-label="gender" name="17" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">18.為表演編舞</FormLabel>
                        <RadioGroup aria-label="gender" name="18" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">19.施行CPR救人</FormLabel>
                        <RadioGroup aria-label="gender" name="19" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">20.協助他人處理情緒問題</FormLabel>
                        <RadioGroup aria-label="gender" name="20" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">21.銷售電信設備</FormLabel>
                        <RadioGroup aria-label="gender" name="21" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">22.經營美容或美髮店</FormLabel>
                        <RadioGroup aria-label="gender" name="22" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">23.使用電腦軟體處理客戶訂單與帳款</FormLabel>
                        <RadioGroup aria-label="gender" name="23" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">24.處理工作的會議排程</FormLabel>
                        <RadioGroup aria-label="gender" name="24" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">25.監看工廠生產線的組裝作業</FormLabel>
                        <RadioGroup aria-label="gender" name="25" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">26.維修家用電器</FormLabel>
                        <RadioGroup aria-label="gender" name="26" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">27.開發新的設備</FormLabel>
                        <RadioGroup aria-label="gender" name="27" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">28.計畫一項研究</FormLabel>
                        <RadioGroup aria-label="gender" name="28" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">29.編寫劇本</FormLabel>
                        <RadioGroup aria-label="gender" name="29" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">30.演奏樂器</FormLabel>
                        <RadioGroup aria-label="gender" name="30" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">31.教導兒童閱讀</FormLabel>
                        <RadioGroup aria-label="gender" name="31" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">32.協助智能障礙兒童學習</FormLabel>
                        <RadioGroup aria-label="gender" name="32" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">33.電話行銷</FormLabel>
                        <RadioGroup aria-label="gender" name="33" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">34.經營平面媒體</FormLabel>
                        <RadioGroup aria-label="gender" name="34" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">35.處理應付帳款或應收賬款</FormLabel>
                        <RadioGroup aria-label="gender" name="35" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">36.安裝電腦軟體</FormLabel>
                        <RadioGroup aria-label="gender" name="36" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">37.計程車司機</FormLabel>
                        <RadioGroup aria-label="gender" name="37" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">38.裝設地板</FormLabel>
                        <RadioGroup aria-label="gender" name="38" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">39.水污染防治研究</FormLabel>
                        <RadioGroup aria-label="gender" name="39" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">40.醫學療程的研究</FormLabel>
                        <RadioGroup aria-label="gender" name="40" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">41.在觀眾面前表演喜劇</FormLabel>
                        <RadioGroup aria-label="gender" name="41" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">42.電影、戲劇、或電視節目的客串演出</FormLabel>
                        <RadioGroup aria-label="gender" name="42" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">43.小學教師</FormLabel>
                        <RadioGroup aria-label="gender" name="43" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">44.職涯諮商</FormLabel>
                        <RadioGroup aria-label="gender" name="44" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">45.產品銷售之業務簡報</FormLabel>
                        <RadioGroup aria-label="gender" name="45" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">46.土地買賣</FormLabel>
                        <RadioGroup aria-label="gender" name="46" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">47.使用電腦進行銀行轉帳作業</FormLabel>
                        <RadioGroup aria-label="gender" name="47" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">48.辦公室會議的組織與排程</FormLabel>
                        <RadioGroup aria-label="gender" name="48" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">49.水產品養殖</FormLabel>
                        <RadioGroup aria-label="gender" name="49" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">50.鋪設道路</FormLabel>
                        <RadioGroup aria-label="gender" name="50" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">51.確定某種新的疾病感染率</FormLabel>
                        <RadioGroup aria-label="gender" name="51" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">52.礦石研究</FormLabel>
                        <RadioGroup aria-label="gender" name="52" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">53.評論出版品或表演節目</FormLabel>
                        <RadioGroup aria-label="gender" name="53" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">54.音樂創作</FormLabel>
                        <RadioGroup aria-label="gender" name="54" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">55.主辦兒童夏令營</FormLabel>
                        <RadioGroup aria-label="gender" name="55" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">56.協助他人解決家庭問題</FormLabel>
                        <RadioGroup aria-label="gender" name="56" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">57.銷售音樂光碟</FormLabel>
                        <RadioGroup aria-label="gender" name="57" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">58.經營或管理玩具店</FormLabel>
                        <RadioGroup aria-label="gender" name="58" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">59.使用電腦文書軟體</FormLabel>
                        <RadioGroup aria-label="gender" name="59" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">60.電子計算機使用</FormLabel>
                        <RadioGroup aria-label="gender" name="60" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">61.組裝電子零件或設備</FormLabel>
                        <RadioGroup aria-label="gender" name="61" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">62.快遞或物流運輸的工作</FormLabel>
                        <RadioGroup aria-label="gender" name="62" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">63.診斷和治療病畜或寵物</FormLabel>
                        <RadioGroup aria-label="gender" name="63" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">64.研究世界各地領導人的個性</FormLabel>
                        <RadioGroup aria-label="gender" name="64" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">65.電影或電視演員</FormLabel>
                        <RadioGroup aria-label="gender" name="65" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">66.舞台劇演員</FormLabel>
                        <RadioGroup aria-label="gender" name="66" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">67.協助復健治療</FormLabel>
                        <RadioGroup aria-label="gender" name="67" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">68.從事非營利組織的志工</FormLabel>
                        <RadioGroup aria-label="gender" name="68" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">69.經營或管理旅館</FormLabel>
                        <RadioGroup aria-label="gender" name="69" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">70.從事房屋仲介的工作</FormLabel>
                        <RadioGroup aria-label="gender" name="70" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">71.從事公司總機工作</FormLabel>
                        <RadioGroup aria-label="gender" name="71" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">72.從事辦公室的檔案管理工作</FormLabel>
                        <RadioGroup aria-label="gender" name="72" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">73.油漆或粉刷房間</FormLabel>
                        <RadioGroup aria-label="gender" name="73" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">74.執法性的工作</FormLabel>
                        <RadioGroup aria-label="gender" name="74" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">75.化學實驗</FormLabel>
                        <RadioGroup aria-label="gender" name="75" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">76.生物研究</FormLabel>
                        <RadioGroup aria-label="gender" name="76" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">77.繪畫</FormLabel>
                        <RadioGroup aria-label="gender" name="77" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">78.歌唱表演</FormLabel>
                        <RadioGroup aria-label="gender" name="78" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">79.老人照護</FormLabel>
                        <RadioGroup aria-label="gender" name="79" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">80.兒童體育教練</FormLabel>
                        <RadioGroup aria-label="gender" name="80" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">81.夜市或活動擺攤</FormLabel>
                        <RadioGroup aria-label="gender" name="81" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">82.經營或管理超商</FormLabel>
                        <RadioGroup aria-label="gender" name="82" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">83.處理數字資料</FormLabel>
                        <RadioGroup aria-label="gender" name="83" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">84.公司薪資發放的查驗工作</FormLabel>
                        <RadioGroup aria-label="gender" name="84" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">85.操作工廠的生產機械</FormLabel>
                        <RadioGroup aria-label="gender" name="85" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">86.在離岸的鑽油平台工作</FormLabel>
                        <RadioGroup aria-label="gender" name="86" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">87.城市人口成長研究</FormLabel>
                        <RadioGroup aria-label="gender" name="87" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">88.海洋生物研究</FormLabel>
                        <RadioGroup aria-label="gender" name="88" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">89.電影或電視節目的特技表演</FormLabel>
                        <RadioGroup aria-label="gender" name="89" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">90.電影特效製作</FormLabel>
                        <RadioGroup aria-label="gender" name="90" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">91.教導殘障人士生活技能</FormLabel>
                        <RadioGroup aria-label="gender" name="91" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">92.教導聽障人士手語</FormLabel>
                        <RadioGroup aria-label="gender" name="92" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">93.擔任公司部門主管</FormLabel>
                        <RadioGroup aria-label="gender" name="93" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">94.銷售飲料產品給商店或餐廳</FormLabel>
                        <RadioGroup aria-label="gender" name="94" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">95.會議記錄</FormLabel>
                        <RadioGroup aria-label="gender" name="95" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">96.文件收發紀錄</FormLabel>
                        <RadioGroup aria-label="gender" name="96" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">97.車輛租賃服務</FormLabel>
                        <RadioGroup aria-label="gender" name="97" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">98.生產線之產品租裝工作</FormLabel>
                        <RadioGroup aria-label="gender" name="98" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">99.犯罪調查</FormLabel>
                        <RadioGroup aria-label="gender" name="99" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">100.天文研究</FormLabel>
                        <RadioGroup aria-label="gender" name="100" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">101.合唱表演</FormLabel>
                        <RadioGroup aria-label="gender" name="101" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">102.舞台表演</FormLabel>
                        <RadioGroup aria-label="gender" name="102" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">103.協助他人戒斷毒癮</FormLabel>
                        <RadioGroup aria-label="gender" name="103" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">104.團體諮商工作</FormLabel>
                        <RadioGroup aria-label="gender" name="104" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">105.在電影院銷售零嘴點心</FormLabel>
                        <RadioGroup aria-label="gender" name="105" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">106.向髮廊推銷美髮商品</FormLabel>
                        <RadioGroup aria-label="gender" name="106" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">107.薪資計算工作</FormLabel>
                        <RadioGroup aria-label="gender" name="107" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">108.協助會計師執行記帳工作</FormLabel>
                        <RadioGroup aria-label="gender" name="108" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">109.上漁船捕魚</FormLabel>
                        <RadioGroup aria-label="gender" name="109" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">110.翻新家具</FormLabel>
                        <RadioGroup aria-label="gender" name="110" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">111.使用顯微鏡檢驗血液樣本</FormLabel>
                        <RadioGroup aria-label="gender" name="111" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">112.調查火災事故的原因</FormLabel>
                        <RadioGroup aria-label="gender" name="112" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">113.舞台道具的準備與佈置</FormLabel>
                        <RadioGroup aria-label="gender" name="113" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">114.面試歌手與樂手</FormLabel>
                        <RadioGroup aria-label="gender" name="114" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">115.照顧病患的親人</FormLabel>
                        <RadioGroup aria-label="gender" name="115" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">116.替他人按摩推拿</FormLabel>
                        <RadioGroup aria-label="gender" name="116" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">117.自己創業當老闆</FormLabel>
                        <RadioGroup aria-label="gender" name="117" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">118.合約議價</FormLabel>
                        <RadioGroup aria-label="gender" name="118" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">119.處理包裹的寄送</FormLabel>
                        <RadioGroup aria-label="gender" name="119" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">120.使用物流設備處理庫存資材</FormLabel>
                        <RadioGroup aria-label="gender" name="120" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">121.修復壞掉的水龍頭</FormLabel>
                        <RadioGroup aria-label="gender" name="121" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">122.清洗或維護保養相關工作</FormLabel>
                        <RadioGroup aria-label="gender" name="122" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">123.人體組織與功能的研究</FormLabel>
                        <RadioGroup aria-label="gender" name="123" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">124.犯罪心理的研究</FormLabel>
                        <RadioGroup aria-label="gender" name="124" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">125.戲劇製作</FormLabel>
                        <RadioGroup aria-label="gender" name="125" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">126.電台節目的製播</FormLabel>
                        <RadioGroup aria-label="gender" name="126" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">127.協助殘疾病人復健</FormLabel>
                        <RadioGroup aria-label="gender" name="127" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">128.心理或生理疾病的諮商輔導</FormLabel>
                        <RadioGroup aria-label="gender" name="128" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">129.法律訴訟協助</FormLabel>
                        <RadioGroup aria-label="gender" name="129" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">130.職業經紀人</FormLabel>
                        <RadioGroup aria-label="gender" name="130" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">131.公司文件的檔案管理</FormLabel>
                        <RadioGroup aria-label="gender" name="131" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">132.公司財會相關作業紀錄</FormLabel>
                        <RadioGroup aria-label="gender" name="132" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">133.整理公園的草皮</FormLabel>
                        <RadioGroup aria-label="gender" name="133" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">134.操作生產線上的機台</FormLabel>
                        <RadioGroup aria-label="gender" name="134" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">135.研究提高預報氣象準確度的方法</FormLabel>
                        <RadioGroup aria-label="gender" name="135" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">136.在生物實驗室工作</FormLabel>
                        <RadioGroup aria-label="gender" name="136" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">137.邊寫電影或電視節目劇本</FormLabel>
                        <RadioGroup aria-label="gender" name="137" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">138.歌曲的作詞作曲</FormLabel>
                        <RadioGroup aria-label="gender" name="138" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">139.訓練殘障人士工作與生活</FormLabel>
                        <RadioGroup aria-label="gender" name="139" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">140.企劃和執行遊樂活動</FormLabel>
                        <RadioGroup aria-label="gender" name="140" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">141.負責公司的營運</FormLabel>
                        <RadioGroup aria-label="gender" name="141" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">142.行銷新款衣飾商品</FormLabel>
                        <RadioGroup aria-label="gender" name="142" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">143.處理客戶的請款資料</FormLabel>
                        <RadioGroup aria-label="gender" name="143" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">144.處理影印工作</FormLabel>
                        <RadioGroup aria-label="gender" name="144" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">145.噴灑樹木，以防止有害昆蟲傳播</FormLabel>
                        <RadioGroup aria-label="gender" name="145" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">146.物品瑕疵的檢驗</FormLabel>
                        <RadioGroup aria-label="gender" name="146" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">147.發明一種替代糖</FormLabel>
                        <RadioGroup aria-label="gender" name="147" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">148.遺傳學研究</FormLabel>
                        <RadioGroup aria-label="gender" name="148" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">149.演奏爵士樂或表演踢踏舞</FormLabel>
                        <RadioGroup aria-label="gender" name="149" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">150.電影導演</FormLabel>
                        <RadioGroup aria-label="gender" name="150" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">151.兒童照顧的工作</FormLabel>
                        <RadioGroup aria-label="gender" name="151" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">152.企劃和執行殘障人士的參訪活動</FormLabel>
                        <RadioGroup aria-label="gender" name="152" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">153.銷售報紙廣告</FormLabel>
                        <RadioGroup aria-label="gender" name="153" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">154.百貨公司的專櫃工作</FormLabel>
                        <RadioGroup aria-label="gender" name="154" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">155.登錄租金支付紀錄</FormLabel>
                        <RadioGroup aria-label="gender" name="155" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">156.電腦資料的輸入作業</FormLabel>
                        <RadioGroup aria-label="gender" name="156" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">157.遊艇駕駛</FormLabel>
                        <RadioGroup aria-label="gender" name="157" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">158.鎖匠</FormLabel>
                        <RadioGroup aria-label="gender" name="158" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">159.研究不同國家的政府運作</FormLabel>
                        <RadioGroup aria-label="gender" name="159" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">160.研究動物植物</FormLabel>
                        <RadioGroup aria-label="gender" name="160" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">161.樂團主唱</FormLabel>
                        <RadioGroup aria-label="gender" name="161" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">162.平面媒體之美工設計底地圖繪製</FormLabel>
                        <RadioGroup aria-label="gender" name="162" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">163.醫事助理工作</FormLabel>
                        <RadioGroup aria-label="gender" name="163" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">164.少年犯的感化輔導工作</FormLabel>
                        <RadioGroup aria-label="gender" name="164" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">165.汽車銷售</FormLabel>
                        <RadioGroup aria-label="gender" name="165" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">166.經營或管理服飾店</FormLabel>
                        <RadioGroup aria-label="gender" name="166" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">167.維護庫存紀錄</FormLabel>
                        <RadioGroup aria-label="gender" name="167" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">168.維護公司的員工紀錄</FormLabel>
                        <RadioGroup aria-label="gender" name="168" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">169.設定和操作生產設備</FormLabel>
                        <RadioGroup aria-label="gender" name="169" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">170.森林消防員</FormLabel>
                        <RadioGroup aria-label="gender" name="170" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">171.病理檢驗</FormLabel>
                        <RadioGroup aria-label="gender" name="171" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">172.氣象研究</FormLabel>
                        <RadioGroup aria-label="gender" name="172" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">173.剪輯電影</FormLabel>
                        <RadioGroup aria-label="gender" name="173" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">174.攝影模特兒</FormLabel>
                        <RadioGroup aria-label="gender" name="174" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">175.復健治療師</FormLabel>
                        <RadioGroup aria-label="gender" name="175" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">176.高中教師</FormLabel>
                        <RadioGroup aria-label="gender" name="176" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">177.推銷連鎖餐廳加盟業務</FormLabel>
                        <RadioGroup aria-label="gender" name="177" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">178.3C商品店員</FormLabel>
                        <RadioGroup aria-label="gender" name="178" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">179.從事公司郵件收發工作</FormLabel>
                        <RadioGroup aria-label="gender" name="179" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid> <Grid item container justify='flex-start' alignItems="center" xs={6} md={2}>
                    <FormControl component="fieldset" error={error} >
                        <FormLabel component="legend">180.協助客戶處理銀行交易</FormLabel>
                        <RadioGroup aria-label="gender" name="180" onChange={ansSelect}>
                            <FormControlLabel value="喜歡" control={<Radio size='small' required />} label="喜歡" />
                            <FormControlLabel value="不喜歡" control={<Radio size='small' required />} label="不喜歡" />
                            <FormControlLabel value="不確定" control={<Radio size='small' required />} label="不確定" />
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid> 
        </>
    )*/}
    // let newQuestion = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">1.裝修櫥櫃</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="1" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>

    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">2.運鈔車保全</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="2" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>

    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">3.太空旅行研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="3" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">4.海底地圖繪製</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="4" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">5.參與樂團演出</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="5" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">6.出版品寫作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="6" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">7.教導他人例行工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="7" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">8.從事醫護性工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="8" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">9.股票和債券買賣</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="9" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">10.管理零售商店</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="10" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">11.使用電腦試算表軟體</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="11" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">12.文書資料校對</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="12" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">13.從事農牧相關工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="13" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">14.砌磚或鋪瓦相關工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="14" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">15.歷史文化的研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="15" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">16.動物行為的研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="16" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">17.戲劇導演</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="17" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">18.為表演編舞</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="18" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">19.施行CPR救人</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="19" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">20.協助他人處理情緒問題</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="20" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>

    //     </>
    // )
    // let newQuestion1 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">21.銷售電信設備</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="21" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">22.經營美容或美髮店</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="22" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">23.使用電腦軟體處理客戶訂單與帳款</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="23" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">24.處理工作的會議排程</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="24" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">25.監看工廠生產線的組裝作業</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="25" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">26.維修家用電器</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="26" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">27.開發新的設備</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="27" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">28.計畫一項研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="28" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">29.編寫劇本</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="29" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">30.演奏樂器</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="30" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">31.教導兒童閱讀</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="31" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">32.協助智能障礙兒童學習</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="32" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">33.電話行銷</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="33" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">34.經營平面媒體</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="34" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">35.處理應付帳款或應收賬款</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="35" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">36.安裝電腦軟體</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="36" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">37.計程車司機</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="37" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">38.裝設地板</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="38" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">39.水污染防治研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="39" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">40.醫學療程的研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="40" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // )
    // let newQuestion2 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">41.在觀眾面前表演喜劇</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="41" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">42.電影、戲劇、或電視節目的客串演出</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="42" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">43.小學教師</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="43" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">44.職涯諮商</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="44" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">45.產品銷售之業務簡報</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="45" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">46.土地買賣</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="46" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">47.使用電腦進行銀行轉帳作業</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="47" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">48.辦公室會議的組織與排程</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="48" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">49.水產品養殖</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="49" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">50.鋪設道路</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="50" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">51.確定某種新的疾病感染率</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="51" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">52.礦石研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="52" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">53.評論出版品或表演節目</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="53" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">54.音樂創作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="54" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">55.主辦兒童夏令營</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="55" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">56.協助他人解決家庭問題</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="56" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">57.銷售音樂光碟</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="57" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">58.經營或管理玩具店</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="58" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">59.使用電腦文書軟體</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="59" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">60.電子計算機使用</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="60" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // )
    // let newQuestion3 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">61.組裝電子零件或設備</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="61" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">62.快遞或物流運輸的工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="62" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">63.診斷和治療病畜或寵物</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="63" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">64.研究世界各地領導人的個性</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="64" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">65.電影或電視演員</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="65" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">66.舞台劇演員</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="66" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">67.協助復健治療</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="67" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">68.從事非營利組織的志工</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="68" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">69.經營或管理旅館</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="69" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">70.從事房屋仲介的工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="70" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">71.從事公司總機工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="71" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">72.從事辦公室的檔案管理工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="72" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">73.油漆或粉刷房間</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="73" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">74.執法性的工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="74" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">75.化學實驗</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="75" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">76.生物研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="76" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">77.繪畫</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="77" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">78.歌唱表演</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="78" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">79.老人照護</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="79" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">80.兒童體育教練</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="80" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // )
    // let newQuestion4 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">81.夜市或活動擺攤</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="81" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">82.經營或管理超商</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="82" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">83.處理數字資料</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="83" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">84.公司薪資發放的查驗工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="84" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">85.操作工廠的生產機械</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="85" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">86.在離岸的鑽油平台工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="86" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">87.城市人口成長研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="87" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">88.海洋生物研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="88" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">89.電影或電視節目的特技表演</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="89" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">90.電影特效製作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="90" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">91.教導殘障人士生活技能</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="91" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">92.教導聽障人士手語</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="92" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">93.擔任公司部門主管</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="93" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">94.銷售飲料產品給商店或餐廳</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="94" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">95.會議記錄</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="95" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">96.文件收發紀錄</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="96" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">97.車輛租賃服務</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="97" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">98.生產線之產品租裝工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="98" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">99.犯罪調查</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="99" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">100.天文研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="100" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // )
    // let newQuestion5 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">101.合唱表演</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="101" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">102.舞台表演</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="102" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">103.協助他人戒斷毒癮</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="103" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">104.團體諮商工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="104" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">105.在電影院銷售零嘴點心</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="105" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">106.向髮廊推銷美髮商品</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="106" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">107.薪資計算工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="107" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">108.協助會計師執行記帳工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="108" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">109.上漁船捕魚</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="109" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">110.翻新家具</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="110" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">111.使用顯微鏡檢驗血液樣本</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="111" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">112.調查火災事故的原因</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="112" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">113.舞台道具的準備與佈置</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="113" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">114.面試歌手與樂手</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="114" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">115.照顧病患的親人</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="115" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">116.替他人按摩推拿</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="116" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">117.自己創業當老闆</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="117" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">118.合約議價</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="118" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">119.處理包裹的寄送</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="119" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">120.使用物流設備處理庫存資材</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="120" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // )
    // let newQuestion6 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">121.修復壞掉的水龍頭</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="121" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">122.清洗或維護保養相關工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="122" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">123.人體組織與功能的研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="123" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">124.犯罪心理的研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="124" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">125.戲劇製作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="125" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">126.電台節目的製播</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="126" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">127.協助殘疾病人復健</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="127" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">128.心理或生理疾病的諮商輔導</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="128" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">129.法律訴訟協助</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="129" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">130.職業經紀人</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="130" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">131.公司文件的檔案管理</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="131" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">132.公司財會相關作業紀錄</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="132" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">133.整理公園的草皮</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="133" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">134.操作生產線上的機台</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="134" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">135.研究提高預報氣象準確度的方法</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="135" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">136.在生物實驗室工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="136" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">137.編寫電影或電視節目劇本</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="137" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">138.歌曲的作詞作曲</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="138" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">139.訓練殘障人士工作與生活</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="139" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">140.企劃和執行遊樂活動</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="140" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // )
    // let newQuestion7 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">141.負責公司的營運</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="141" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">142.行銷新款衣飾商品</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="142" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">143.處理客戶的請款資料</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="143" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">144.處理影印工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="144" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">145.噴灑樹木，以防止有害昆蟲傳播</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="145" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">146.物品瑕疵的檢驗</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="146" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">147.發明一種替代糖</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="147" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">148.遺傳學研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="148" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">149.演奏爵士樂或表演踢踏舞</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="149" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">150.電影導演</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="150" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">151.兒童照顧的工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="151" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">152.企劃和執行殘障人士的參訪活動</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="152" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">153.銷售報紙廣告</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="153" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">154.百貨公司的專櫃工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="154" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">155.登錄租金支付紀錄</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="155" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">156.電腦資料的輸入作業</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="156" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">157.遊艇駕駛</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="157" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">158.鎖匠</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="158" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">159.研究不同國家的政府運作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="159" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">160.研究動物植物</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="160" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // )
    // let newQuestion8 = (
    //     <>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">161.樂團主唱</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="161" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">162.平面媒體之美工設計底地圖繪製</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="162" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">163.醫事助理工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="163" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">164.少年犯的感化輔導工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="164" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">165.汽車銷售</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="165" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">166.經營或管理服飾店</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="166" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">167.維護庫存紀錄</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="167" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">168.維護公司的員工紀錄</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="168" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>                <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">169.設定和操作生產設備</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="169" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">170.森林消防員</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="170" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">171.病理檢驗</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="171" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">172.氣象研究</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="172" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">173.剪輯電影</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="173" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">174.攝影模特兒</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="174" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">175.復健治療師</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="175" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">176.高中教師</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="176" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">177.推銷連鎖餐廳加盟業務</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="177" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">178.3C商品店員</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="178" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">179.從事公司郵件收發工作</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="179" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //         <Grid item container xs={12} alignItems='center' >

    //             <Grid item xs={6}>
    //                 <FormLabel component="legend">180.協助客戶處理銀行交易</FormLabel>
    //             </Grid>
    //             <Grid item xs={6} container justify='space-around'>
    //                 <FormControl component="fieldset" error={error} fullWidth>
    //                     <RadioGroup aria-label="gender" name="180" onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
    //                         <FormControlLabel value="喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不喜歡" control={<Radio size='small' required />} />
    //                         <FormControlLabel value="不確定" control={<Radio size='small' required />} />
    //                     </RadioGroup>
    //                     <FormHelperText>{helperText}</FormHelperText>
    //                 </FormControl>
    //             </Grid>
    //             <Grid item xs={12}>
    //                 <Divider />
    //             </Grid>
    //         </Grid>
    //     </>
    // ),,,