import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
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
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
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
import Hidden from '@material-ui/core/Hidden';
import StepLabel from '@material-ui/core/StepLabel';
import Badge from '@material-ui/core/Badge';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Slide from "@material-ui/core/Slide";
import Skeleton from '@material-ui/lab/Skeleton';
import { ExpandMore, ExpandLess, Done } from '@material-ui/icons';
import InfiniteScroll from "react-infinite-scroll-component";//滑動載入
import WorkInterestBackground from '../../img/WorkInterestBackground.jpg'
import Chart from 'react-apexcharts'
import JobDescription from '../JobDescription/JobDescription' //sub頁面
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";//DnD
import { set } from 'date-fns';
import { FlareSharp } from '@material-ui/icons';
import theme from '../../theme';

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
        // 2: "不喜歡",
        // 3: "不喜歡",
        // 4: "不喜歡",
        // 5: "不確定",
        // 6: "不確定",
        // 7: "不喜歡",
        // 8: "不喜歡",
        // 9: "不確定",
        // 10: "不喜歡",
        // 11: "不喜歡",
        // 12: "不喜歡",
        // 13: "不喜歡",
        // 14: "不喜歡",
        // 15: "不喜歡",
        // 16: "不確定",
        // 17: "不確定",
        // 18: "不喜歡",
        // 19: "不喜歡",
        // 20: "不喜歡",
        // 21: "不喜歡",
        // 22: "不喜歡",
        // 23: "不喜歡",
        // 24: "不喜歡",
        // 25: "不喜歡",
        // 26: "不確定",
        // 27: "喜歡",
        // 28: "喜歡",
        // 29: "不確定",
        // 30: "不喜歡",
        // 31: "不喜歡",
        // 32: "不喜歡",
        // 33: "不喜歡",
        // 34: "不確定",
        // 35: "不喜歡",
        // 36: "不確定",
        // 37: "不喜歡",
        // 38: "不喜歡",
        // 39: "不喜歡",
        // 40: "不確定",
        // 41: "不確定",
        // 42: "喜歡",
        // 43: "不喜歡",
        // 44: "不喜歡",
        // 45: "不喜歡",
        // 46: "不喜歡",
        // 47: "不喜歡",
        // 48: "不喜歡",
        // 49: "不喜歡",
        // 50: "不喜歡",
        // 51: "不喜歡",
        // 52: "不喜歡",
        // 53: "不確定",
        // 54: "不確定",
        // 55: "不喜歡",
        // 56: "不喜歡",
        // 57: "不喜歡",
        // 58: "不喜歡",
        // 59: "不喜歡",
        // 60: "喜歡",
        // 61: "喜歡",
        // 62: "不喜歡",
        // 63: "不喜歡",
        // 64: "喜歡",
        // 65: "喜歡",
        // 66: "不確定",
        // 67: "不喜歡",
        // 68: "不喜歡",
        // 69: "不喜歡",
        // 70: "不喜歡",
        // 71: "不喜歡",
        // 72: "不喜歡",
        // 73: "不喜歡",
        // 74: "不確定",
        // 75: "不確定",
        // 76: "不確定",
        // 77: "不確定",
        // 78: "不確定",
        // 79: "不喜歡",
        // 80: "不喜歡",
        // 81: "不喜歡",
        // 82: "不喜歡",
        // 83: "不確定",
        // 84: "不確定",
        // 85: "不確定",
        // 86: "不喜歡",
        // 87: "不喜歡",
        // 88: "不確定",
        // 89: "喜歡",
        // 90: "喜歡",
        // 91: "不喜歡",
        // 92: "不喜歡",
        // 93: "不確定",
        // 94: "不喜歡",
        // 95: "不喜歡",
        // 96: "不喜歡",
        // 97: "不喜歡",
        // 98: "不喜歡",
        // 99: "喜歡",
        // 100: "不確定",
        // 101: "不確定",
        // 102: "不確定",
        // 103: "不喜歡",
        // 104: "不喜歡",
        // 105: "不喜歡",
        // 106: "不喜歡",
        // 107: "不喜歡",
        // 108: "不喜歡",
        // 109: "不確定",
        // 110: "不喜歡",
        // 111: "不喜歡",
        // 112: "不喜歡",
        // 113: "不喜歡",
        // 114: "不確定",
        // 115: "不喜歡",
        // 116: "不喜歡",
        // 117: "不確定",
        // 118: "不喜歡",
        // 119: "不喜歡",
        // 120: "不喜歡",
        // 121: "不喜歡",
        // 122: "不喜歡",
        // 123: "不確定",
        // 124: "喜歡",
        // 125: "喜歡",
        // 126: "喜歡",
        // 127: "不喜歡",
        // 128: "不喜歡",
        // 129: "不確定",
        // 130: "不喜歡",
        // 131: "不喜歡",
        // 132: "不喜歡",
        // 133: "不喜歡",
        // 134: "不喜歡",
        // 135: "喜歡",
        // 136: "不確定",
        // 137: "喜歡",
        // 138: "喜歡",
        // 139: "不喜歡",
        // 140: "喜歡",
        // 141: "不確定",
        // 142: "不喜歡",
        // 143: "不喜歡",
        // 144: "不喜歡",
        // 145: "不喜歡",
        // 146: "不喜歡",
        // 147: "不確定",
        // 148: "不確定",
        // 149: "不喜歡",
        // 150: "喜歡",
        // 151: "不喜歡",
        // 152: "不喜歡",
        // 153: "不喜歡",
        // 154: "不喜歡",
        // 155: "不喜歡",
        // 156: "不喜歡",
        // 157: "不喜歡",
        // 158: "不喜歡",
        // 159: "不喜歡",
        // 160: "不喜歡",
        // 161: "喜歡",
        // 162: "不確定",
        // 163: "不喜歡",
        // 164: "不喜歡",
        // 165: "不喜歡",
        // 166: "不喜歡",
        // 167: "不確定",
        // 168: "不喜歡",
        // 169: "不確定",
        // 170: "不喜歡",
        // 171: "不喜歡",
        // 172: "喜歡",
        // 173: "喜歡",
        // 174: "不喜歡",
        // 175: "不喜歡",
        // 176: "不喜歡",
        // 177: "不喜歡",
        // 178: "不喜歡",
        // 179: "不喜歡",
        // 180: "不喜歡",
    })
    let [alertState, setAlertState] = useState({
        text: '',
        severity: 'error',
        open: false
    });
    let [Data, setData] = useContext(SurveyData)//原始資料
    let [error, setError] = useState(false); //有沒填的錯誤state 目前沒用到
    let [helperText, setHelperText] = useState('');//error state 的text
    let [activeStep, setActiveStep] = useState(2);  //step的狀態
    let steptText = ['測評介紹', '測評開始', '測評結果']//step的文字
    let ansTmp = {} // 答案暫存區
    let [surveyResult, setSurveyResult] = useState()//測驗結果說明

    let [onet, setOnet] = useState()//onet資料
    let [onetCollapse, setOnetCollapse] = useState(false)//onet外層收折展開
    let [selectOnet, setSelectOnet] = useState(null)//選擇查看Onet工作說明書
    let selectOnetID = React.useRef(null)//選擇查看的onetID

    let [taiwan, setTaiwan] = useState()//台灣資料
    let [taiwanCollapse, setTaiwanCollapse] = useState(false)//taiwan展開
    let [selectTaiwan, setSelectTaiwan] = useState()//選擇查看台灣資料
    let selectTaiwanID = React.useRef(null)//選擇查看的onetID

    let [chart, setChart] = useState()

    let [jobDescripOpen, setJobDescripOpen] = useState(false)//subpage開起


    let ansSelect = e => {
      //  console.log('ansSelect');
        ansTmp = { ...ansTmp, [e.target.name]: e.target.value }
    }
    let onetCollapseHandle = () => {
        setOnetCollapse(!onetCollapse)
        setTaiwanCollapse(false)
    }
    let taiwanCollapseHandle = () => {
        setTaiwanCollapse(!taiwanCollapse)
        setOnetCollapse(false)
    }
    //onet前往工作說明書
    let handleOpen = onetID => e => {
        setJobDescripOpen(!jobDescripOpen)//工作說明書開啟
        setSelectOnet(onet[onetID])//給工作說明書以選到的資訊
        selectOnetID.current = onetID//給工作說明說已選到的OnetID
    }
    //前往台灣工作說明書
    let taiwanOpen = (taiwanIndustry, taiwanSixId) => e => {
        setJobDescripOpen(!jobDescripOpen)//工作說明書開啟
        setSelectTaiwan({ 職位描述: taiwan[taiwanIndustry][taiwanSixId]['四碼職位描述'], 台灣職位名稱: taiwan[taiwanIndustry][taiwanSixId]['六碼職位名稱'], 職位工作內容: taiwan[taiwanIndustry][taiwanSixId]['四碼職位工作內容'] })
        selectTaiwanID.current = taiwanSixId
    }

    let [q, setQ] = useState(['1.裝修櫥櫃', '2.運鈔車保全', '3.太空旅行研究', '4.海底地圖繪製', '5.參與樂團演出', '6.出版品寫作', '7.教導他人例行工作', '8.從事醫護性工作', '9.股票和債券買賣', '10.管理零售商店', '11.使用電腦試算表軟體', '12.文書資料校對', '13.從事農牧相關工作', '14.砌磚或鋪瓦相關工作', '15.歷史文化的研究', '16.動物行為的研究', '17.戲劇導演', '18.為表演編舞', '19.施行CPR救人', '20.協助他人處理情緒問題', '21.銷售電信設備', '22.經營美容或美髮店', '23.使用電腦軟體處理客戶訂單與帳款', '24.處理工作的會議排程', '25.監看工廠生產線的組裝作業', '26.維修家用電器', '27.開發新的設備', '28.計畫一項研究', '29.編寫劇本', '30.演奏樂器'])
    let q1 = ['31.教導兒童閱讀', '32.協助智能障礙兒童學習', '33.電話行銷', '34.經營平面媒體', '35.處理應付帳款或應收賬款', '36.安裝電腦軟體', '37.計程車司機', '38.裝設地板', '39.水污染防治研究', '40.醫學療程的研究', '41.在觀眾面前表演喜劇', '42.電影、戲劇、或電視節目的客串演出', '43.小學教師', '44.職涯諮商', '45.產品銷售之業務簡報', '46.土地買賣', '47.使用電腦進行銀行轉帳作業', '48.辦公室會議的組織與排程', '49.水產品養殖', '50.鋪設道路', '51.確定某種新的疾病感染率', '52.礦石研究', '53.評論出版品或表演節目', '54.音樂創作', '55.主辦兒童夏令營', '56.協助他人解決家庭問題', '57.銷售音樂光碟', '58.經營或管理玩具店', '59.使用電腦文書軟體', '60.電子計算機使用']
    let q2 = ['61.組裝電子零件或設備', '62.快遞或物流運輸的工作', '63.診斷和治療病畜或寵物', '64.研究世界各地領導人的個性', '65.電影或電視演員', '66.舞台劇演員', '67.協助復健治療', '68.從事非營利組織的志工', '69.經營或管理旅館', '70.從事房屋仲介的工作', '71.從事公司總機工作', '72.從事辦公室的檔案管理工作', '73.油漆或粉刷房間', '74.執法性的工作', '75.化學實驗', '76.生物研究', '77.繪畫', '78.歌唱表演', '79.老人照護', '80.兒童體育教練', '81.夜市或活動擺攤', '82.經營或管理超商', '83.處理數字資料', '84.公司薪資發放的查驗工作', '85.操作工廠的生產機械', '86.在離岸的鑽油平台工作', '87.城市人口成長研究', '88.海洋生物研究', '89.電影或電視節目的特技表演', '90.電影特效製作']
    let q3 = ['91.教導殘障人士生活技能', '92.教導聽障人士手語', '93.擔任公司部門主管', '94.銷售飲料產品給商店或餐廳', '95.會議記錄', '96.文件收發紀錄', '97.車輛租賃服務', '98.生產線之產品租裝工作', '99.犯罪調查', '100.天文研究', '101.合唱表演', '102.舞台表演', '103.協助他人戒斷毒癮', '104.團體諮商工作', '105.在電影院銷售零嘴點心', '106.向髮廊推銷美髮商品', '107.薪資計算工作', '108.協助會計師執行記帳工作', '109.上漁船捕魚', '110.翻新家具', '111.使用顯微鏡檢驗血液樣本', '112.調查火災事故的原因', '113.舞台道具的準備與佈置', '114.面試歌手與樂手', '115.照顧病患的親人', '116.替他人按摩推拿', '117.自己創業當老闆', '118.合約議價', '119.處理包裹的寄送', '120.使用物流設備處理庫存資材']
    let q4 = ['121.修復壞掉的水龍頭', '122.清洗或維護保養相關工作', '123.人體組織與功能的研究', '124.犯罪心理的研究', '125.戲劇製作', '126.電台節目的製播', '127.協助殘疾病人復健', '128.心理或生理疾病的諮商輔導', '129.法律訴訟協助', '130.職業經紀人', '131.公司文件的檔案管理', '132.公司財會相關作業紀錄', '133.整理公園的草皮', '134.操作生產線上的機台', '135.研究提高預報氣象準確度的方法', '136.在生物實驗室工作', '137.邊寫電影或電視節目劇本', '138.歌曲的作詞作曲', '139.訓練殘障人士工作與生活', '140.企劃和執行遊樂活動', '141.負責公司的營運', '142.行銷新款衣飾商品', '143.處理客戶的請款資料', '144.處理影印工作', '145.噴灑樹木，以防止有害昆蟲傳播', '146.物品瑕疵的檢驗', '147.發明一種替代糖', '148.遺傳學研究', '149.演奏爵士樂或表演踢踏舞', '150.電影導演']
    let q5 = ['151.兒童照顧的工作', '152.企劃和執行殘障人士的參訪活動', '153.銷售報紙廣告', '154.百貨公司的專櫃工作', '155.登錄租金支付紀錄', '156.電腦資料的輸入作業', '157.遊艇駕駛', '158.鎖匠', '159.研究不同國家的政府運作', '160.研究動物植物', '161.樂團主唱', '162.平面媒體之美工設計', '163.醫事助理工作', '164.少年犯的感化輔導工作', '165.汽車銷售', '166.經營或管理服飾店', '167.維護庫存紀錄', '168.維護公司的員工紀錄', '169.設定和操作生產設備', '170.森林消防員', '171.病理檢驗', '172.氣象研究', '173.剪輯電影', '174.攝影模特兒', '175.復健治療師', '176.高中教師', '177.推銷連鎖餐廳加盟業務', '178.3C商品店員', '179.從事公司郵件收發工作', '180.協助客戶處理銀行交易']
    //因為radio有required,外層有form的onSubmit會去偵測必填的有沒有填
    //這裡是處理form送出的事件
    let handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit');
        setAns({ ...ans, ...ansTmp })
    }
    let handleCheckBox = () => {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
            }
        }
        //由於Data是從上層傳下來,因此必須將check的資料在設定給上層，若是內部設定換TAB還是會抓到上層舊資料
        setData({ ...Data, 結果: { ...Data['結果'], 已做問卷結果: { ...Data['結果']['已做問卷結果'], 職業興趣: { ...Data['結果']['已做問卷結果']['職業興趣'], Onet職位: onet } } } })

        //已被選到的onet 因API需求重組
        let checkOnetID = []
        Object.keys(onet).map((onetID, index) => {
            if (Number(onet[onetID]['標註'] == 1)) {
                checkOnetID.push(onetID)
            }
        })

        fetch('https://demo.fois.online/Fois_Class/Main.php', {
            method: 'POST',
            body: JSON.stringify({
                'key': 'memberSaveMarkData',
                'JWT': state,
                '問卷名稱': '職業興趣',
                '標記資料': checkOnetID,
            }),
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.狀態 == '儲存成功') {

                setAlertState({ severity: 'success', text: result.狀態, open: true })
            } else {
                setAlertState({ severity: 'error', text: result.errorCode, open: true })
            }

        }).catch((error) => console.error('Error:', error))
    }
    //  滑動載入部分問卷
    let fetchMoreData = () => {
        if (q.length <= 30) {
            setQ([...q, ...q1])
            setAns({ ...ans, ...ansTmp }) //問卷滑動載入時由於setQ改變Q的state，會導致rerender必須先將tmp值存起來
        }
        if (q.length > 30 && q.length <= 60) {
            setQ([...q, ...q2])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 60 && q.length <= 90) {
            setQ([...q, ...q3])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 90 && q.length <= 120) {
            setQ([...q, ...q4])
            setAns({ ...ans, ...ansTmp })
        }
        if (q.length > 120 && q.length <= 150) {
            setQ([...q, ...q5])
            setAns({ ...ans, ...ansTmp })
        }

    }
    //test
    useEffect(() => {
        // console.log(selectTaiwan);
        // console.log(Data);
        // console.log(taiwan);
    })
    //ans 
    useEffect(() => {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
            }
        }
        //console.log(ans);
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

                } else {
                    setAlertState({ severity: 'error', text: result.errorCode, open: true })
                }
            }).then(() => {
                //當資料儲存成功，重新抓取資料並更改useContext的值，觸發頁面initEffect刷新資料
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
                        setData(result)
                        setActiveStep(2)
                    }
                })
            }).catch((error) => console.error('Error:', error))
        }
    }, [ans])
    //init
    useEffect(() => {

        if (Data) {
            if (Data.結果.已做問卷.indexOf('職業興趣') != (-1)) {

                setSurveyResult(Data.結果.已做問卷結果.職業興趣.測驗結果說明)
                setChart({
                    series: [{
                        name: 'Series 1',
                        data: [Data.結果.已做問卷結果.職業興趣.各項分數['R'], Data.結果.已做問卷結果.職業興趣.各項分數['I'], Data.結果.已做問卷結果.職業興趣.各項分數['A'], Data.結果.已做問卷結果.職業興趣.各項分數['S'], Data.結果.已做問卷結果.職業興趣.各項分數['E'], Data.結果.已做問卷結果.職業興趣.各項分數['C']]
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
                setOnet(Data.結果.已做問卷結果.職業興趣.Onet職位)
                setTaiwan(Data.結果.已做問卷結果.職業興趣.台灣職位)
            } else {
                setActiveStep(0)
            }
        }
    }, [Data])
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
                        <Stepper activeStep={activeStep} className={classes.SteperBackground} style={{ paddingTop: 0, paddingBottom: 0 }}>
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
                                                        <Grid item xs={12}><Typography variant='h6' color='primary'>測評圖表</Typography></Grid>
                                                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                        <Grid item container justify='center' alignItems='center' xs={12}>
                                                            {chart ?
                                                                <Chart
                                                                    options={chart.options}
                                                                    series={chart.series}
                                                                    type="radar"
                                                                    width="100%"
                                                                    height='auto'
                                                                /> : null}
                                                        </Grid>
                                                        <Grid item container justify='center' xs={12}> 雷達圖分析</Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={6} >
                                                    <Box width='100%' mb={2} >
                                                        <Typography variant='h6' color='primary'>類型定義</Typography>
                                                        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>R</Typography> </Grid>
                                                            <Grid item xs={4} > 實作型 (Realistic) </Grid>
                                                            <Grid item xs={7} > 喜歡具體的、實用的、動手做的和操作性的工作。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>I</Typography> </Grid>
                                                            <Grid item xs={4} > 研究型(Investigate)</Grid>
                                                            <Grid item xs={7} > 喜歡透過系統性觀察、大量思考和動腦筋尋找解答的工作。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>A</Typography> </Grid>
                                                            <Grid item xs={4} > 藝術型(Artistic) </Grid>
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
                                                        <Typography variant='h6' color='primary'>測評結果</Typography>
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
                                                    <Typography variant='h6' color='primary'>適合職位分析</Typography>
                                                    <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                    <Box width='100%' mb={2} >
                                                        <ListItem dense button style={{ paddingLeft: 0 }} onClick={onetCollapseHandle}>
                                                            <ListItemText>
                                                                <Typography component='p' variant='subtitle1' color='primary'>* Onet 適配職類</Typography>
                                                            </ListItemText>
                                                            {onetCollapse ? <ExpandLess /> : <ExpandMore />}
                                                        </ListItem>
                                                        <Collapse in={onetCollapse} timeout="auto" unmountOnExit >
                                                            <Grid item container xs={12} >
                                                                <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                                {
                                                                    onet ?
                                                                        Object.keys(onet).map(onetID =>
                                                                            <List style={{ width: '100%' }}>
                                                                                <ListItem dense button divider onClick={handleOpen(onetID)}>

                                                                                    <ListItemText primary={onet[onetID].職位名稱} secondary={`${onetID} - (${onet[onetID].傾向})`}></ListItemText>
                                                                                    {onet[onetID]['問卷重複'][0] ? <Badge badgeContent={onet[onetID]['問卷重複'].length} color="error" style={{ transform: 'scale(0.8)' }} /> : null}
                                                                                    <ListItemSecondaryAction>
                                                                                        <Checkbox
                                                                                            edge="end"
                                                                                            checked={Number(onet[onetID]['標註'])}
                                                                                            onChange={() => {
                                                                                                //資料是字串'0'先轉number 但因為!反向會變布林還需再轉一次Number                                                                                            
                                                                                                setOnet({ ...onet, [onetID]: { ...onet[onetID], 標註: Number(!Number(onet[onetID]['標註'])) } })
                                                                                                console.log('123');
                                                                                            }}
                                                                                        />
                                                                                    </ListItemSecondaryAction>

                                                                                </ListItem>
                                                                            </List>

                                                                        ) : <Typography component='p' variant='subtitle1' color='primary'>(無匹配資料)</Typography>
                                                                }
                                                                {/* 不放在回圈裡面 避免產生很多的jobdescription */}
                                                                <JobDescription selectID={selectOnetID.current} select={selectOnet} Open={jobDescripOpen} setOpen={setJobDescripOpen} trigger={'onet'} />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button fullWidth variant="contained" color="secondary"
                                                                    onClick={handleCheckBox}
                                                                >儲存標記</Button>
                                                            </Grid>
                                                        </Collapse>
                                                        <ListItem dense button style={{ paddingLeft: 0 }} onClick={taiwanCollapseHandle}>
                                                            <ListItemText>
                                                                <Typography component='p' variant='subtitle1' color='primary'>* 臺灣 適配職類</Typography>
                                                            </ListItemText>
                                                            {taiwanCollapse ? <ExpandLess /> : <ExpandMore />}
                                                        </ListItem>
                                                        <Collapse in={taiwanCollapse} timeout="auto" unmountOnExit >
                                                            {
                                                                taiwan ? Object.keys(taiwan).map(taiwanIndustry =>
                                                                    <>
                                                                        <List dense>
                                                                            <ListSubheader color='primary'>
                                                                                {taiwanIndustry}
                                                                                <Divider light />
                                                                            </ListSubheader>
                                                                            {Object.keys(taiwan[taiwanIndustry]).map(taiwanSixId =>
                                                                                <ListItem dense button onClick={taiwanOpen(taiwanIndustry, taiwanSixId)}>
                                                                                    <ListItemText secondary={`$ ${taiwan[taiwanIndustry][taiwanSixId]['台灣薪資']}`}>
                                                                                        <Typography>
                                                                                            {taiwan[taiwanIndustry][taiwanSixId]['六碼職位名稱']}
                                                                                        </Typography>
                                                                                    </ListItemText>
                                                                                    <ChevronRight />
                                                                                </ListItem>
                                                                            )}
                                                                        </List>
                                                                    </>
                                                                ) : <Typography component='p' style={{}} variant='subtitle1' color='primary'>(無匹配資料)</Typography>
                                                            }
                                                            <JobDescription selectID={selectTaiwanID.current} select={selectTaiwan} Open={jobDescripOpen} setOpen={setJobDescripOpen} trigger={'taiwan'} />
                                                        </Collapse>
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
function WorkStyle() {
    let classes = useStyles()
    //問卷選擇結果
    let [ans, setAns] = useState({})
    let [alertState, setAlertState] = useState({
        text: '',
        severity: 'error',
        open: false
    });
    let [Data, setData] = useContext(SurveyData)
    let [error, setError] = useState(false); //有沒填的錯誤state 目前沒用到
    let [helperText, setHelperText] = useState('');//error state 的text
    let [activeStep, setActiveStep] = useState(2);  //step的狀態
    let steptText = ['測評介紹', '測評開始', '測評結果']//step的文字
    let ansTmp = {} // 答案暫存區
    let [surveyResult, setSurveyResult] = useState()//測驗結果說明

    let [onet, setOnet] = useState()//onet資料
    let [onetCollapse, setOnetCollapse] = useState(false)//onet展開
    let [selectOnet, setSelectOnet] = useState(null)//選擇查看Onet工作說明書
    let selectOnetID = React.useRef(null)

    let [taiwan, setTaiwan] = useState()//台灣資料
    let [taiwanCollapse, setTaiwanCollapse] = useState(false)//taiwan展開
    let [selectTaiwan, setSelectTaiwan] = useState(null)//選擇查看台灣資料
    let selectTaiwanID = React.useRef(null)

    let [chart, setChart] = useState()

    let [jobDescripOpen, setJobDescripOpen] = useState(false)//subpage開起


    let ansSelect = e => {
        //console.log('ansSelect');
        ansTmp = { ...ansTmp, [e.target.name]: e.target.value }
    }
    let onetCollapseHandle = () => {
        setOnetCollapse(!onetCollapse)
        setTaiwanCollapse(false)
        
    }
    let taiwanCollapseHandle = () => {
        setTaiwanCollapse(!taiwanCollapse)
        setOnetCollapse(false)
    }
    //onet前往工作說明書
    let handleOpen = onetID => e => {
        setJobDescripOpen(!jobDescripOpen)//工作說明書開啟
        setSelectOnet(onet[onetID])//給工作說明書以選到的資訊
        selectOnetID.current = onetID
    }
    //台灣onet前往工作說明書
    let taiwanOpen = (taiwanIndustry, taiwanSixId) => e => {
        setJobDescripOpen(!jobDescripOpen)//工作說明書開啟
        setSelectTaiwan({ 職位描述: taiwan[taiwanIndustry][taiwanSixId]['四碼職位描述'], 台灣職位名稱: taiwan[taiwanIndustry][taiwanSixId]['六碼職位名稱'], 職位工作內容: taiwan[taiwanIndustry][taiwanSixId]['四碼職位工作內容'] })
        selectTaiwanID.current = taiwanSixId
        //console.log(taiwanIndustry,taiwanSixId);
    }

    let [q, setQ] = useState(['1.我不是一個會擔心東擔心西的人', '2.我喜歡有人圍繞身旁的感覺', '3.我喜歡發揮想像力去探索夢想的可行性，並試著去實現它', '4.我會想要禮貌的去對待他人', '5.我會將自己的事物整理得井然有序', '6.我有時會有不滿和抱怨', '7.我是一個很容易高興的人', '8.我喜歡學習新的事物或發展個人興趣', '9.我會軟硬兼施的讓人們依照我的方法做事', '10.我懂得調整自己的節奏與步伐，以使工作順利完成', '11.當壓力太大時，我會感到很不舒服', '12.我喜歡在不用麻煩別人的情況下獨立完成工作', '13.我經常被自然界展現的或藝術創作的美所吸引', '14.有些人會認為我是一個自私和自負的人', '15.我經常會有沒有做好充分準備的問題與困擾', '16.我很少感到孤獨或鬱悶', '17.我喜歡與人交談或聊天', '18.我認為不應該讓學生去聽有爭議的言論，因為這可能會誤導他們或令他們感到困惑', '19.如果有人對我動手，我一定會反擊', '20.我會認真的完成所有上級指派給我的工作或任務', '21.我經常感到緊張不安', '22.我是一個有行動力的人', '23.我對所謂藝術沒什麼感覺', '24.我認為我比一般人優秀', '25.我有清楚的生涯目標，並能朝向生涯目標穩定前進', '26.我有時會覺得自己一無是處', '27.我不喜歡人多的地方', '28.我不太懂得創意思考', '29.我會試著去原諒和寬恕傷害我的人', '30.在開始執行工作任務之前，我通常需要時間做準備'])
    let q1 = ['31.我很少會感到恐懼或焦慮', '32.我是一個精力充沛的人', '33.我不太會去在意自己的心情感受', '34.我認為人性本善', '35.我總是能夠達成自己所設定的目標', '36.我經常會因別人對待我的方式而感到生氣', '37.我是一個正向開朗的人', '38.我有豐富的情緒或情感體驗', '39.有些人會認為我是一個精明計較的人', '40.我總是能夠為自己做出承諾並堅持到底', '41.當遇到事情不順利時，我會感到氣餒並想要放棄', '42.我不喜歡與他人閒談或聊天', '43.我懂得欣賞詩詞與藝術之美', '44.我不會憐憫或同情弱勢者', '45.我覺得自己不是那麼穩健可靠', '46.我很少會感到悲傷或沮喪', '47.我的生活節奏與步調是快的', '48.我對於探究真理與人類發展沒什麼興趣', '49.我是一個能夠體貼與關懷他人的人', '50.我是一個能夠順利完成工作的有績效的人', '51.我有時會有無力感並期待有人可以幫我解決問題', '52.我是一個積極活躍的人', '53.我的求知慾與好奇心強', '54.如果我不喜歡一個人，我一定會讓他知道', '55.我不太能夠將工作或事情處理得有條不紊', '56.我有時會感到羞愧並想要逃避或躲避', '57.我只願做好自己的工作而不願領導他人工作', '58.我喜歡思考理論性或抽象性的概念', '59.如果有必要，我會利用手段得到自己想要的東西', '60.我對於自己所做的每一件事都盡力做到最好']
    //因為radio有required,外層有form的onSubmit會去偵測必填的有沒有填
    //這裡是處理form送出的事件
    let handleSubmit = (event) => {
        event.preventDefault();
        setAns({ ...ans, ...ansTmp })
    }
    let handleCheckBox = () => {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
            }
        }
        //由於Data是從上層傳下來,因此必須將check的資料在設定給上層，若是內部設定換TAB還是會抓到上層舊資料
        setData({ ...Data, 結果: { ...Data['結果'], 已做問卷結果: { ...Data['結果']['已做問卷結果'], 人格特質: { ...Data['結果']['已做問卷結果']['人格特質'], Onet職位: onet } } } })

        //已被選到的onet 因API需求重組
        let checkOnetID = []
        Object.keys(onet).map((onetID, index) => {
            if (Number(onet[onetID]['標註'] == 1)) {
                checkOnetID.push(onetID)
            }
        })

        fetch('https://demo.fois.online/Fois_Class/Main.php', {
            method: 'POST',
            body: JSON.stringify({
                'key': 'memberSaveMarkData',
                'JWT': state,
                '問卷名稱': '人格特質',
                '標記資料': checkOnetID,
            }),
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.狀態 == '儲存成功') {

                setAlertState({ severity: 'success', text: result.狀態, open: true })
            } else {
                setAlertState({ severity: 'error', text: result.errorCode, open: true })
            }

        }).catch((error) => console.error('Error:', error))
    }
    //  滑動載入部分問卷
    let fetchMoreData = () => {
        if (q.length <= 30) {
            setQ([...q, ...q1])
            setAns({ ...ans, ...ansTmp }) //問卷滑動載入時由於setQ改變Q的state，會導致rerender必須先將tmp值存起來
        }
    }
    //ans 
    useEffect(() => {
        // console.log(ans);
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
            }
        }
        //console.log(ans);
        if (Object.keys(ans).length == 60) {
            fetch('https://demo.fois.online/Fois_Class/Main.php', {
                method: 'POST',
                body: JSON.stringify({
                    'key': 'memberSaveFitnessAssessmentAnswer',
                    'JWT': state,
                    '問卷名稱': '人格特質',
                    '答題結果': ans
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                //console.log(result);
                if (result.狀態 == '儲存成功') {
                    setAlertState({ severity: 'success', text: result.狀態, open: true })
                } else {
                    setAlertState({ severity: 'error', text: result.errorCode, open: true })
                }
            }).then(() => {
                //當資料儲存成功，重新抓取資料並更改useContext的值，觸發頁面initEffect刷新資料
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
                        setData(result)
                        setActiveStep(2)
                    }
                })
            }).catch((error) => console.error('Error:', error))
        }
    }, [ans])
    //init
    useEffect(() => {
        if (Data) {
            console.log('人格特質init')
            if (Data.結果.已做問卷.indexOf('人格特質') != (-1)) {
                setSurveyResult(Data.結果.已做問卷結果.人格特質.測驗結果說明)
                setChart({
                    series: [{
                        name: 'Series 1',
                        data: [Data.結果.已做問卷結果.人格特質.各項分數['N'], Data.結果.已做問卷結果.人格特質.各項分數['E'], Data.結果.已做問卷結果.人格特質.各項分數['O'], Data.結果.已做問卷結果.人格特質.各項分數['A'], Data.結果.已做問卷結果.人格特質.各項分數['C']]
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
                            categories: ['N', 'E', 'O', 'A', 'C']
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
                setOnet(Data.結果.已做問卷結果.人格特質.Onet職位)
                setTaiwan(Data.結果.已做問卷結果.人格特質.台灣職位)
            } else {
                setActiveStep(0)
            }
        }

    }, [Data])
    // 滑動載入部分問卷
    useEffect(()=>{
        console.log(taiwan);
    })
    let questions = (q.map(value =>
        <Grid item container xs={12} alignItems='center' >

            <Grid item xs={12} md={6}>
                <FormLabel component="legend">
                    <Grid container >
                        <Grid item xs={1} style={{ flexBasis: 20 }}>{value.split('.')[0]}.</Grid>
                        <Grid item xs={11}> {value.split('.')[1]} </Grid>
                    </Grid>
                </FormLabel>
            </Grid>
            <Grid item xs={12} md={6} container justify='space-around'>
                <FormControl component="fieldset" error={error} fullWidth>
                    <Hidden smDown>
                        <RadioGroup aria-label="gender" name={value.split('.')[0]} onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
                            <FormControlLabel value="非常像我" control={<Radio size='small' required required />} />
                            <FormControlLabel value="像我" control={<Radio size='small' required required />} />
                            <FormControlLabel value="有點像又有點不像我" control={<Radio size='small' required />} />
                            <FormControlLabel value="不像我" control={<Radio size='small' required />} />
                            <FormControlLabel value="非常不像我" control={<Radio size='small' required />} />
                        </RadioGroup>
                    </Hidden>
                    <Hidden smUp>
                        <RadioGroup aria-label="gender" name={value.split('.')[0]} onChange={ansSelect} fullWidth row style={{ paddingLeft: '12px' }}>
                            <FormControlLabel value="非常像我" control={<Radio size='small' required />} label="非常像我" style={{ width: '100%', marginBottom: '0px' }} />
                            <FormControlLabel value="像我" control={<Radio size='small' required />} label="像我" style={{ width: '100%', marginBottom: '0px' }} />
                            <FormControlLabel value="有點像又有點不像我" control={<Radio size='small' required />} label="有點像又有點不像我" style={{ width: '100%', marginBottom: '0px' }} />
                            <FormControlLabel value="不像我" control={<Radio size='small' required />} label="不像我" style={{ width: '100%', marginBottom: '0px' }} />
                            <FormControlLabel value="非常不像我" control={<Radio size='small' required />} label="非常不像我" style={{ width: '100%', marginBottom: '0px' }} />
                        </RadioGroup>
                    </Hidden>
                    <FormHelperText>{helperText}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Divider style={{ marginBottom: 10 }} />
            </Grid>
        </Grid>
    ))

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stepper activeStep={activeStep} className={classes.SteperBackground} style={{ paddingTop: 0, paddingBottom: 0 }}>
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
                                                <Typography variant='body1'>本測評共有60道答題，請分別在每一道答題中，選出「非常像我」、「像我」、「有以點相又有點不像我」、「不像我」、「非常不像我」五種；請選擇一種作答。 接下來，請按〔下一頁〕按鈕，開始進行測評！</Typography>
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
                                        <Grid container spacing={1} >
                                            <Grid item xs={12} md={6}>題目</Grid>
                                            <Hidden smDown>
                                                <Grid container item xs={12} md={6} justify='space-around' wrap='nowrap'>
                                                    <Grid item>非常像我</Grid>
                                                    <Grid item>像我</Grid>
                                                    <Grid item>有點像又有點不像我</Grid>
                                                    <Grid item>不像我</Grid>
                                                    <Grid item>非常不像我</Grid>
                                                </Grid>
                                            </Hidden>
                                            <Grid item xs={12}>
                                                <Divider style={{ marginBottom: 10 }} />
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
                                                        <Grid item xs={12}><Typography variant='h6' color='primary'>測評圖表</Typography></Grid>
                                                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                        <Grid item container justify='center' alignItems='center' xs={12}>
                                                            {chart ?
                                                                <Chart
                                                                    options={chart.options}
                                                                    series={chart.series}
                                                                    type="radar"
                                                                    width="100%"
                                                                    height='auto'
                                                                /> : null}
                                                        </Grid>
                                                        <Grid item container justify='center' xs={12}> 雷達圖分析</Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={6} >
                                                    <Box width='100%' mb={2} >
                                                        <Typography variant='h6' color='primary'>類型定義</Typography>
                                                        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>E</Typography> </Grid>
                                                            <Grid item xs={4} >
                                                                外向性(Extraversion) </Grid>
                                                            <Grid item xs={7} > 能勝任本職工作，並能在工作中主動追求工作目標的達成。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>A</Typography> </Grid>
                                                            <Grid item xs={4} >
                                                                親和性(Agreeableness)</Grid>
                                                            <Grid item xs={7} > 能注重工作上的合作性與人際關係，易於與不同組織成員共事。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>N</Typography> </Grid>
                                                            <Grid item xs={4} > 穩定性(Emotional Stability)</Grid>
                                                            <Grid item xs={7} > 能因應工作上的負面情緒，並具備成熟、穩重和自我克制之人格特質。</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>C</Typography> </Grid>
                                                            <Grid item xs={4} > 盡責性(Conscientiousness)</Grid>
                                                            <Grid item xs={7} > 能對工作有所承諾並確保能完成任務，並具備值得信賴、負責任、注重細節之人格特質。 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>O</Typography> </Grid>
                                                            <Grid item xs={4} > 開放性(Openness)</Grid>
                                                            <Grid item xs={7} >能夠主動積極的利用個人專業能力，以開放性的態度獨立自主的完成工作任務。</Grid>


                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Box width='100%' mb={2}>
                                                        <Typography variant='h6' color='primary'>測評結果</Typography>
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
                                                    <Typography variant='h6' color='primary'>適合職位分析</Typography>
                                                    <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                    <Box width='100%' mb={2} >
                                                        <ListItem dense button style={{ paddingLeft: 0 }} onClick={onetCollapseHandle}>
                                                            <ListItemText>
                                                                <Typography component='p' variant='subtitle1' color='primary'>* Onet 適配職類</Typography>
                                                            </ListItemText>
                                                            {onetCollapse ? <ExpandLess /> : <ExpandMore />}
                                                        </ListItem>
                                                        <Collapse in={onetCollapse} timeout="auto" unmountOnExit >
                                                            <Grid item container xs={12} >
                                                                <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                                {
                                                                    onet ?
                                                                        Object.keys(onet).map(onetID =>
                                                                            <List style={{ width: '100%' }}>
                                                                                <ListItem dense button divider onClick={handleOpen(onetID)}>

                                                                                    <ListItemText primary={onet[onetID].職位名稱} secondary={`${onetID} - (${onet[onetID].傾向})`}></ListItemText>
                                                                                    {onet[onetID]['問卷重複'][0] ? <Badge badgeContent={onet[onetID]['問卷重複'].length} color="error" style={{ transform: 'scale(0.8)' }} /> : null}
                                                                                    <ListItemSecondaryAction>
                                                                                        <Checkbox
                                                                                            edge="end"
                                                                                            checked={Number(onet[onetID]['標註'])}
                                                                                            onChange={() => {
                                                                                                //資料是字串'0'先轉number 但因為!反向會變布林還需再轉一次Number
                                                                                                setOnet({ ...onet, [onetID]: { ...onet[onetID], 標註: Number(!Number(onet[onetID]['標註'])) } })
                                                                                                console.log('123');
                                                                                            }}
                                                                                        />
                                                                                    </ListItemSecondaryAction>

                                                                                </ListItem>
                                                                            </List>

                                                                        ) : null
                                                                }
                                                                {/* 不放在回圈裡面 避免產生很多的jobdescription */}
                                                                <JobDescription selectID={selectOnetID.current} select={selectOnet} Open={jobDescripOpen} setOpen={setJobDescripOpen} trigger={'onet'} />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button fullWidth variant="contained" color="secondary"
                                                                    onClick={handleCheckBox}
                                                                >儲存標記</Button>
                                                            </Grid>
                                                        </Collapse>
                                                        <ListItem dense button style={{ paddingLeft: 0 }} onClick={taiwanCollapseHandle}>
                                                            <ListItemText>
                                                                <Typography component='p' variant='subtitle1' color='primary'>* 臺灣 適配職類</Typography>
                                                            </ListItemText>
                                                            {taiwanCollapse ? <ExpandLess /> : <ExpandMore />}
                                                        </ListItem>
                                                        <Collapse in={taiwanCollapse} timeout="auto" unmountOnExit >
                                                            {
                                                                taiwan ? Object.keys(taiwan).map(taiwanIndustry =>
                                                                    <>
                                                                        <List dense>
                                                                            <ListSubheader color='primary'>
                                                                                {taiwanIndustry}
                                                                                <Divider light />
                                                                            </ListSubheader>

                                                                            {Object.keys(taiwan[taiwanIndustry]).map(taiwanSixId =>
                                                                                <ListItem dense button onClick={taiwanOpen(taiwanIndustry, taiwanSixId)}>
                                                                                    <ListItemText secondary={`$ ${taiwan[taiwanIndustry][taiwanSixId]['台灣薪資']}`}>
                                                                                        <Typography>
                                                                                            {taiwan[taiwanIndustry][taiwanSixId]['六碼職位名稱']}

                                                                                        </Typography>
                                                                                    </ListItemText>
                                                                                    <ChevronRight />
                                                                                </ListItem>
                                                                            )}
                                                                        </List>
                                                                    </>
                                                                ) : <Typography component='p' variant='subtitle1' color='primary'>(無匹配資料)</Typography>
                                                            }
                                                            <JobDescription selectID={selectTaiwanID.current} select={selectTaiwan} Open={jobDescripOpen} setOpen={setJobDescripOpen} trigger={'taiwan'} />
                                                        </Collapse>
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
function WorkValue() {

    let classes = useStyles()
    //問卷選擇結果
    let [ans, setAns] = useState({})
    let [alertState, setAlertState] = useState({
        text: '',
        severity: 'error',
        open: false
    });
    let [Data, setData] = useContext(SurveyData)
    let [error, setError] = useState(false); //有沒填的錯誤state 目前沒用到
    let [helperText, setHelperText] = useState('');//error state 的text
    let [activeStep, setActiveStep] = useState(2);  //step的狀態
    let steptText = ['測評介紹', '測評開始', '測評結果']//step的文字
    let ansTmp = {} // 答案暫存區
    let [surveyResult, setSurveyResult] = useState()//測驗結果說明

    let [onet, setOnet] = useState()//onet資料
    let [onetCollapse, setOnetCollapse] = useState(false)//onet展開
    let [selectOnet, setSelectOnet] = useState(null)//選擇查看Onet工作說明書
    let selectOnetID = React.useRef(null)

    let [taiwan, setTaiwan] = useState()//台灣資料
    let [taiwanCollapse, setTaiwanCollapse] = useState(false)//taiwan展開
    let [selectTaiwan, setSelectTaiwan] = useState(null)//選擇查看台灣資料
    let selectTaiwanID = React.useRef(null)

    let [chart, setChart] = useState()

    let [jobDescripOpen, setJobDescripOpen] = useState(false)//subpage開起

    let onetCollapseHandle = () => {
        setOnetCollapse(!onetCollapse)
        setTaiwanCollapse(false)
    }
    let taiwanCollapseHandle = () => {
        setTaiwanCollapse(!taiwanCollapse)
        setOnetCollapse(false)
    }
    //onet前往工作說明書
    let handleOpen = onetID => e => {
        setJobDescripOpen(!jobDescripOpen)//工作說明書開啟
        setSelectOnet(onet[onetID])//給工作說明書以選到的資訊
        selectOnetID.current = onetID
    }
    //台灣前往工作說明書
    let taiwanOpen = (taiwanIndustry, taiwanSixId) => e => {
        setJobDescripOpen(!jobDescripOpen)//工作說明書開啟
        setSelectTaiwan({ 職位描述: taiwan[taiwanIndustry][taiwanSixId]['四碼職位描述'], 台灣職位名稱: taiwan[taiwanIndustry][taiwanSixId]['六碼職位名稱'], 職位工作內容: taiwan[taiwanIndustry][taiwanSixId]['四碼職位工作內容'] })
        selectTaiwanID.current = taiwanSixId
        //console.log(taiwanIndustry,taiwanSixId);
    }
    //目前介面都完成，問題在於叫出介面更改排序後資料並未更新
    //可能是為用state所以資料是舊的
    let [q, setQ] = React.useState({
        1: [{ id: '1', content: '(G)我的工作待遇能夠比別人好' }, { id: '2', content: '(I)我能夠在工作中嘗試自己的創意想法' }, { id: '3', content: '(C)我的工作忙碌是有意義的' }, { id: '4', content: '(D)我能夠在工作中獲得升遷的機會' }, { id: '5', content: '(O)我能夠在工作中服務或幫助他人' }],
        2: [{ id: '1', content: '(F)我能夠在工作獲得成就感' }, { id: '2', content: '(B)我能夠在工作中受到公平對待' }, { id: '3', content: '(R)我能夠在工作中嘗試不同或新的事物' }, { id: '4', content: '(Q)我的主管能夠給我良好的教育訓練' }, { id: '5', content: '(O)我能夠在工作中服務或幫助他人' }],
        3: [{ id: '1', content: '(A)我能夠在工作中發揮自己的能力' }, { id: '2', content: '(F)我能夠在工作中獲得成就感' }, { id: '3', content: '(C)我的工作忙碌是有意義的' }, { id: '4', content: '(K)我的工作不會讓我有不合理的心理壓力' }, { id: '5', content: '(S)我能夠在良好的工作環境中工作' }],
        4: [{ id: '1', content: '(A)我能夠在工作中發揮自己的能力' }, { id: '2', content: '(N)我的工作能提供穩定的保障' }, { id: '3', content: '(H)我的工作同事好相處' }, { id: '4', content: '(E)我能夠在工作中指導他人' }, { id: '5', content: '(O)我能夠在工作中服務或幫助他人' }],
        5: [{ id: '1', content: '(I)我能夠在工作中嘗試自己的創意想法' }, { id: '2', content: '(N)我的工作能提供穩定的保障' }, { id: '3', content: '(T)我能夠在工作中自主的規劃工作(不需主管太多的督導)' }, { id: '4', content: '(R)我能夠在工作中嘗試不同或新的事物' }, { id: '5', content: '(S)我能夠在良好的工作環境中工作' }],
        6: [{ id: '1', content: '(A)我能夠在工作中發揮自己的能力' }, { id: '2', content: '(J)我能夠獨立自主的工作' }, { id: '3', content: '(T)我能夠在工作中自主的規劃工作(不需主管太多的督導)' }, { id: '4', content: '(D)我能夠在工作中獲得升遷的機會' }, { id: '5', content: '(Q)我的主管能夠給我良好的教育訓練' }],
        7: [{ id: '1', content: '(D)我能夠在工作中獲得升遷的機會' }, { id: '2', content: '(K)我的工作不會讓我有不合理的心理壓力' }, { id: '3', content: '(P)我的主管能夠給我工作上的支持' }, { id: '4', content: '(H)我的工作同事好相處' }, { id: '5', content: '(R)我能夠在工作中嘗試不同的或新的事物' }],
        8: [{ id: '1', content: '(I)我能夠在工作中嘗試自己的創意想法' }, { id: '2', content: '(M)我能夠在工作中自己做決定' }, { id: '3', content: '(A)我能夠在工作中發揮自己的能力' }, { id: '4', content: '(B)我能夠在工作中受到公平對待' }, { id: '5', content: '(P)我的主管能夠給我工作上的支持' }],
        9: [{ id: '1', content: '(L)我能夠在工作中獲得肯定' }, { id: '2', content: '(J)我能夠獨立自主的工作' }, { id: '3', content: '(S)我能夠在良好的工作環境中工作' }, { id: '4', content: '(P)我的主管能夠給我工作上的支持' }, { id: '5', content: '(O)我能夠在工作中服務或幫助他人' }],
        10: [{ id: '1', content: '(L)我的工作能讓我受到他人尊敬' }, { id: '2', content: '(K)我的工作不會讓我有不合理的心理壓力' }, { id: '3', content: '(M)我能夠在工作中自己做決定' }, { id: '4', content: '(T)我能夠在工作中自主的規劃工作(不需主管太多的督導)' }, { id: '5', content: '(O)我能夠在工作中服務或幫助他人' }],
        11: [{ id: '1', content: '(L)我的工作能讓我受到他人尊敬' }, { id: '2', content: '(N)我的工作能提供穩定的保障' }, { id: '3', content: '(C)我的工作忙碌是有意義的' }, { id: '4', content: '(P)我的主管能夠給我工作上的支持' }, { id: '5', content: '(Q)我的主管能夠給我良好的教育訓練' }],
        12: [{ id: '1', content: '(G)我的工作待遇能夠比別人好' }, { id: '2', content: '(F)我能夠在工作中獲得成就感' }, { id: '3', content: '(T)我能夠在工作中自主的規劃工作(不需主管太多的督導)' }, { id: '4', content: '(P)我的主管能夠給我工作上的支持' }, { id: '5', content: '(E)我能夠在工作中指導他人' }],
        13: [{ id: '1', content: '(L)我的工作能讓我受到他人尊敬' }, { id: '2', content: '(G)我的工作待遇能夠比別人好' }, { id: '3', content: '(L)我能夠在工作中獲得肯定' }, { id: '4', content: '(A)我能夠在工作中發揮自己的能力' }, { id: '5', content: '(R)我能夠在工作中嘗試不同的或新的事物' }],
        14: [{ id: '1', content: '(M)我能夠在工作中自己做決定' }, { id: '2', content: '(C)我的工作忙碌是有意義的' }, { id: '3', content: '(J)我能夠獨立自主的工作' }, { id: '4', content: '(H)我的工作同事好相處' }, { id: '5', content: '(R)我能夠在工作中嘗試不同的或新的事物' }],
        15: [{ id: '1', content: '(L)我的工作能讓我受到他人的尊敬' }, { id: '2', content: '(F)我能夠在工作中獲得成就感' }, { id: '3', content: '(I)我能夠在工作中嘗試自己的創意想法' }, { id: '4', content: '(J)我能夠獨立自主的工作' }, { id: '5', content: '(E)我能夠在工作中指導他人' }],
        16: [{ id: '1', content: '(G)我的工作待遇能夠比別人好' }, { id: '2', content: '(S)我能夠在良好的工作環境中工作' }, { id: '3', content: '(Q)我的主管能夠給我良好的教育訓練' }, { id: '4', content: '(M)我能夠在工作中自己做決定' }, { id: '5', content: '(E)我能夠在工作中指導他人' }],
        17: [{ id: '1', content: '(L)我能夠在工作中獲得肯定' }, { id: '2', content: '(C)我的工作忙碌是有意義的' }, { id: '3', content: '(B)我能夠在工作中受到公平對待' }, { id: '4', content: '(T)我能夠在工作中自主的規劃工作(不需主管太多的督導)' }, { id: '5', content: '(E)我能夠在工作中指導他人' }],
        18: [{ id: '1', content: '(L)我的工作能讓我受到他人的尊敬' }, { id: '2', content: '(B)我能夠在工作中受到公平對待' }, { id: '3', content: '(D)我能夠在工作中獲得升遷的機會' }, { id: '4', content: '(S)我能夠在良好的工作環境中工作' }, { id: '5', content: '(H)我的工作同事好相處' }],
        19: [{ id: '1', content: '(F)我能夠在工作中獲得成就感' }, { id: '2', content: '(N)我的工作能提供穩定的保障' }, { id: '3', content: '(L)我能夠在工作中獲得肯定' }, { id: '4', content: '(D)我能夠在工作中獲得升遷的機會' }, { id: '5', content: '(M)我能夠在工作中自己做決定' }],
        20: [{ id: '1', content: '(G)我的工作待遇能夠比別人好' }, { id: '2', content: '(K)我的工作不會讓我有不合理的心理壓力' }, { id: '3', content: '(N)我的工作能提供穩定的保障' }, { id: '4', content: '(B)我能夠在工作中受到公平的對待' }, { id: '5', content: '(J)我能夠獨立自主的工作' }],
        21: [{ id: '1', content: '(L)我能夠在工作中獲得肯定' }, { id: '2', content: '(K)我的工作不會讓我有不合理的心理壓力' }, { id: '3', content: '(I)我能夠在工作中嘗試自己的創意想法' }, { id: '4', content: '(H)我的工作同事好相處' }, { id: '5', content: '(Q)我的主管能夠給我良好的教育訓練' }],
    })
    //更換排列處理器
    let onDragEnd = num => result => {
        //console.log(num)
        //排列更換
        let reorder = (result, startIndex, endIndex) => {
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed); //拼接 （起始,0代表都不刪,要插入的值）
            return result;
        };
        let items = reorder(
            q[num],
            result.source.index,
            result.destination.index
        );
        // setQ({q})
        // q[num] = items
        //console.log(q[0]);
    }
    //送出資料整理
    let handleSubmit = (event) => {
        event.preventDefault();
        console.log(openCount);
        //暫存 資料準備好才setState
        let qTmp = {}
        Object.keys(q).forEach(index => {
            qTmp[index] = q[index].map((obj) => {
                return obj.content
            })
        })
        if (Object.keys(openCount).length >= 21) {
            //console.log('都勾了');
            //console.log(qTmp);

            setAns(qTmp)
        } else {
            setAlertState({ severity: 'error', text: '請完成所有題目', open: true })
        }

    }
    //IDP mark儲存
    let handleCheckBox = () => {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
            }
        }
        //由於Data是從上層傳下來,因此必須將check的資料在設定給上層，若是內部設定換TAB還是會抓到上層舊資料
        setData({ ...Data, 結果: { ...Data['結果'], 已做問卷結果: { ...Data['結果']['已做問卷結果'], 工作價值觀: { ...Data['結果']['已做問卷結果']['工作價值觀'], Onet職位: onet } } } })

        //已被選到的onet 因API需求重組
        let checkOnetID = []
        Object.keys(onet).map((onetID, index) => {
            if (Number(onet[onetID]['標註'] == 1)) {
                checkOnetID.push(onetID)
            }
        })

        fetch('https://demo.fois.online/Fois_Class/Main.php', {
            method: 'POST',
            body: JSON.stringify({
                'key': 'memberSaveMarkData',
                'JWT': state,
                '問卷名稱': '工作價值觀',
                '標記資料': checkOnetID,
            }),
        }).then(res => {
            return res.json();
        }).then(result => {
            if (result.狀態 == '儲存成功') {

                setAlertState({ severity: 'success', text: result.狀態, open: true })
            } else {
                setAlertState({ severity: 'error', text: result.errorCode, open: true })
            }

        }).catch((error) => console.error('Error:', error))
    }
    //ans 改變時觸發
    useEffect(() => {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].indexOf('state') >= 0) {
                state = cookies[i].split('=')[1]
            }
        }

        if (Object.keys(ans).length == 21) {
            fetch('https://demo.fois.online/Fois_Class/Main.php', {
                method: 'POST',
                body: JSON.stringify({
                    'key': 'memberSaveFitnessAssessmentAnswer',
                    'JWT': state,
                    '問卷名稱': '工作價值觀',
                    '答題結果': ans
                }),
            }).then(res => {
                return res.json();
            }).then(result => {
                //console.log(result);
                if (result.狀態 == '儲存成功') {
                    setAlertState({ severity: 'success', text: result.狀態, open: true })

                } else {
                    setAlertState({ severity: 'error', text: result.errorCode, open: true })
                }
            }).then(() => {
                //當資料儲存成功，重新抓取資料並更改useContext的值，觸發頁面initEffect刷新資料
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
                        setData(result)
                        setActiveStep(2)
                    }
                })
            }).catch((error) => console.error('Error:', error))
        }

    }, [ans])
    //init
    useEffect(() => {
        if (Data) {
            //console.log(result.結果.已做問卷結果)
            if (Data.結果.已做問卷.indexOf('工作價值觀') != (-1)) {
                setSurveyResult(Data.結果.已做問卷結果.工作價值觀.測驗結果說明)
                setChart({
                    series: [{
                        name: 'Series 1',
                        data: [Data.結果.已做問卷結果.工作價值觀.各項分數['Achievement'], Data.結果.已做問卷結果.工作價值觀.各項分數['Independence'], Data.結果.已做問卷結果.工作價值觀.各項分數['Recognition'], Data.結果.已做問卷結果.工作價值觀.各項分數['Relationships'], Data.結果.已做問卷結果.工作價值觀.各項分數['Support'], Data.結果.已做問卷結果.工作價值觀.各項分數['WorkingConditions']]
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
                            categories: ['A', 'I', 'Rc', 'R', 'S', 'W']
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
                setOnet(Data.結果.已做問卷結果.工作價值觀.Onet職位)
                setTaiwan(Data.結果.已做問卷結果.工作價值觀.台灣職位)
            } else {
                setActiveStep(0)
            }
        }

    }, [Data])
    //題目彈窗
    let [open, setOpen] = React.useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
        14: false,
        15: false,
        16: false,
        17: false,
        18: false,
        19: false,
        20: false,
        21: false,
    })
    //有點擊過的視窗
    let [openCount, setOpenCount] = React.useState({})
    let controlOpen = id => e => {
        setOpen({ ...open, [id]: !open[id] })
        setOpenCount({ ...openCount, [id]: true })
    }
    useEffect(() => {
        // console.log(openCount);
    })
    let questions = (
        <>
            {Object.keys(q).map(index =>
                <>
                    <List dense component="div" role="list" style={{ width: '100%' }}>
                        <ListItem dense button divider onClick={controlOpen(index)}>
                            <ListItemText primary={`第${index}組`} secondary='依您自己認定的重要性來排序，越往上排表示越重要' />
                            {openCount[index] ? <Done color='primary' /> : null}
                        </ListItem>
                    </List>
                    <Dialog maxWidth="xs" open={open[index]} >
                        <DialogTitle id="confirmation-dialog-title">{`第${index}組`}</DialogTitle>
                        <DialogContent>
                            <Grid item xs={12} >
                                <DragDropContext onDragEnd={onDragEnd(index)}>
                                    <Droppable droppableId="droppable">
                                        {(provided, snapshot) => (

                                            <Box p={1}>

                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {q[index].map((obj, index) => (
                                                        <Draggable key={obj.id} draggableId={obj.id} index={index}>
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={snapshot.isDragging ? {
                                                                        background: '#ffffff',
                                                                        padding: 10,
                                                                        marginTop: 10,
                                                                        marginBottom: 10,
                                                                        borderRadius: 5,
                                                                        ...provided.draggableProps.style
                                                                    } : {
                                                                            padding: 10,
                                                                            marginTop: 10,
                                                                            marginBottom: 10,
                                                                            borderRadius: 5,
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                >
                                                                    {obj.content}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </Box>

                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </Grid>
                        </DialogContent>
                        <DialogActions >
                            <Button color="primary" onClick={controlOpen(index)}>
                                Ok
                          </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )
            }
        </>

    )

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Stepper activeStep={activeStep} className={classes.SteperBackground} style={{ paddingTop: 12, paddingBottom: 12 }}>
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
                                                <Typography variant='body1'>本測評共有60道答題，請分別在每一道答題中，選出「非常像我」、「像我」、「有以點相又有點不像我」、「不像我」、「非常不像我」五種；請選擇一種作答。 接下來，請按〔下一頁〕按鈕，開始進行測評！</Typography>
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
                                <Box id="scrollableDiv" >
                                    <Grid container spacing={1} >
                                        <Grid item xs={12} md={6}>請點擊下列列表作答題目。</Grid>
                                        <Grid item xs={12}>
                                            <Divider style={{ marginBottom: 10 }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} spacing={2} >
                                        {questions}

                                    </Grid>

                                </Box>

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
                                                        <Grid item xs={12}><Typography variant='h6' color='primary'>測評圖表</Typography></Grid>
                                                        <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                        <Grid item container justify='center' alignItems='center' xs={12}>
                                                            {chart ?
                                                                <Chart
                                                                    options={chart.options}
                                                                    series={chart.series}
                                                                    type="radar"
                                                                    width="100%"
                                                                    height='auto'
                                                                /> : null}
                                                        </Grid>
                                                        <Grid item container justify='center' xs={12}> 雷達圖分析</Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} md={6} >
                                                    <Box width='100%' mb={2} >
                                                        <Typography variant='h6' color='primary'>類型定義</Typography>
                                                        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>A</Typography> </Grid>
                                                            <Grid item xs={4} > 成就導向(Achievement)</Grid>
                                                            <Grid item xs={7} > 能夠發揮本身專長完成工作並獲得成就與肯定 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>I</Typography> </Grid>
                                                            <Grid item xs={4} > 獨立自主(Independence)</Grid>
                                                            <Grid item xs={7} > 能夠獨立自主工作並在責任範圍內自主決策 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>Rc</Typography> </Grid>
                                                            <Grid item xs={4} > 認同肯定(Recognition)</Grid>
                                                            <Grid item xs={7} > 能夠在工作上被認同肯定而且有升遷機會</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>R</Typography> </Grid>
                                                            <Grid item xs={4} > 友善關係(Relationships)</Grid>
                                                            <Grid item xs={7} > 能夠在互助合作之友善工作環境中工作</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>S</Typography> </Grid>
                                                            <Grid item xs={4} > 上級支持(Support)</Grid>
                                                            <Grid item xs={7} > 公司與上級主管能提供工作上的協助與支援</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>W</Typography> </Grid>
                                                            <Grid item xs={4} > 工作條件(Working Conditions)</Grid>
                                                            <Grid item xs={7} > 公司制度良好並能提供穩定的工作保障</Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Box width='100%' mb={2}>
                                                        <Typography variant='h6' color='primary'>測評結果</Typography>
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
                                                    <Typography variant='h6' color='primary'>適合職位分析</Typography>
                                                    <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                    <Box width='100%' mb={2} >
                                                        <ListItem dense button style={{ paddingLeft: 0 }} onClick={onetCollapseHandle}>
                                                            <ListItemText>
                                                                <Typography component='p' variant='subtitle1' color='primary'>* Onet 適配職類</Typography>
                                                            </ListItemText>
                                                            {onetCollapse ? <ExpandLess /> : <ExpandMore />}
                                                        </ListItem>
                                                        <Collapse in={onetCollapse} timeout="auto" unmountOnExit >
                                                            <Grid item container xs={12} >
                                                                <Grid item xs={12}><Divider style={{ marginTop: 5, marginBottom: 10 }} /> </Grid>
                                                                {
                                                                    onet ?
                                                                        Object.keys(onet).map(onetID =>
                                                                   
                                                                            <List style={{ width: '100%' }}>
                                                                                <ListItem dense button divider onClick={handleOpen(onetID)}>

                                                                                    <ListItemText primary={onet[onetID].職位名稱} secondary={`${onetID} - (${onet[onetID].傾向})`}></ListItemText>
                                                                                    {onet[onetID]['問卷重複'][0] ? <Badge badgeContent={onet[onetID]['問卷重複'].length} color="error" style={{ transform: 'scale(0.8)' }} /> : null}
                                                                                    <ListItemSecondaryAction>
                                                                                        <Checkbox
                                                                                            edge="end"
                                                                                            checked={Number(onet[onetID]['標註'])}
                                                                                            onChange={() => {
                                                                                                //資料是字串'0'先轉number 但因為!反向會變布林還需再轉一次Number
                                                                                                setOnet({ ...onet, [onetID]: { ...onet[onetID], 標註: Number(!Number(onet[onetID]['標註'])) } })
                                                                                                console.log('123');
                                                                                            }}
                                                                                        />
                                                                                    </ListItemSecondaryAction>

                                                                                </ListItem>
                                                                            </List>

                                                                        ) : null
                                                                }
                                                                {/* 不放在回圈裡面 避免產生很多的jobdescription */}
                                                                <JobDescription selectID={selectOnetID.current} select={selectOnet} Open={jobDescripOpen} setOpen={setJobDescripOpen} trigger={'onet'} />
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Button fullWidth variant="contained" color="secondary"
                                                                    onClick={handleCheckBox}
                                                                >儲存標記</Button>
                                                            </Grid>
                                                        </Collapse>
                                                        <ListItem dense button style={{ paddingLeft: 0 }} onClick={taiwanCollapseHandle}>
                                                            <ListItemText>
                                                                <Typography component='p' variant='subtitle1' color='primary'>* 臺灣 適配職類</Typography>
                                                            </ListItemText>
                                                            {taiwanCollapse ? <ExpandLess /> : <ExpandMore />}
                                                        </ListItem>
                                                        <Collapse in={taiwanCollapse} timeout="auto" unmountOnExit >
                                                            {
                                                                taiwan ? Object.keys(taiwan).map(taiwanIndustry =>
                                                                    <>
                                                                        <List dense>
                                                                            <ListSubheader color='primary'>
                                                                                {taiwanIndustry}
                                                                                <Divider light />
                                                                            </ListSubheader>

                                                                            {Object.keys(taiwan[taiwanIndustry]).map(taiwanSixId =>
                                                                                <ListItem dense button onClick={taiwanOpen(taiwanIndustry, taiwanSixId)}>
                                                                                    <ListItemText secondary={`$ ${taiwan[taiwanIndustry][taiwanSixId]['台灣薪資']}`}>
                                                                                        <Typography>
                                                                                            {taiwan[taiwanIndustry][taiwanSixId]['六碼職位名稱']}

                                                                                        </Typography>
                                                                                    </ListItemText>
                                                                                    <ChevronRight />
                                                                                </ListItem>
                                                                            )}
                                                                        </List>
                                                                    </>
                                                                ) : <Typography component='p' variant='subtitle1' color='primary'>(無匹配資料)</Typography>
                                                            }
                                                            <JobDescription selectID={selectTaiwanID.current} select={selectTaiwan} Open={jobDescripOpen} setOpen={setJobDescripOpen} trigger={'taiwan'} />
                                                        </Collapse>
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
//tabs的時候 載入資料 透過context往下傳
export const SurveyData = React.createContext(null);//宣告Context
export default function PersonalSurvey() {
    const classes = useStyles();

    let [Data, setData] = useState(null);
    let { path, url } = useRouteMatch();
    let history = useHistory()
    let [open, setOpen] = useState(true)
    const [value, setValue] = React.useState(0); //tabs
    const handleChange = (event, newValue) => {

        setValue(newValue);
    };//tabs
    //init 第一次會做之後看DATA有變化才做
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
                console.log(result);
                setData(result)
            }
        }).catch((error) => console.error('Error:', error))
    }, [])
    // useEffect(() => {
    //     console.log('外層DATA被改變了');
    // }, [Data])

    return (
        <>
            <SurveyData.Provider value={[Data, setData]}>
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
                            <Tab label="職業興趣" component={Link} to={`${url}/測評01`} />
                            <Tab label="人格特質" component={Link} to={`${url}/測評02`} />
                            <Tab label="工作價值觀" component={Link} to={`${url}/測評03`} />
                        </Tabs>

                    </Paper>
                </Box>

                <Switch>
                    <Route path={`${path}/測評01`} component={WorkInterest} />
                    <Route path={`${path}/測評02`} component={WorkStyle} />
                    <Route path={`${path}/測評03`} component={WorkValue} />
                </Switch>


            </SurveyData.Provider >
        </>
    )
}
