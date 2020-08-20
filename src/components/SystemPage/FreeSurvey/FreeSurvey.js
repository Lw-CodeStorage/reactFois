import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';


import Badge from '@material-ui/core/Badge';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import { ExpandMore, ExpandLess, Done, ChevronRight } from '@material-ui/icons';

import JobDescription from '../JobDescription/JobDescription.js' //sub頁面
import InfiniteScroll from "react-infinite-scroll-component";//滑動載入
import WorkInterestBackground from '../../img/WorkInterestBackground.jpg'
import Chart from 'react-apexcharts'
//ref可作為react的變數 一般的變數會因為state re-render 導致一般變數重新走過定義 
export default function FreeSurvey() {
    let [alertState, setAlertState] = useState({
        text: '',
        severity: 'error',
        open: false
    });
    let [activeStep, setActiveStep] = useState(0);  //step的狀態
    let steptText = ['測評介紹', '測評開始', '測評結果']//step的文字
    let [loadText, setLoadText] = React.useState({ 1: true, 2: true, 3: true })//加載文字，但目前沒什麼用
    let [loadState, setLoadState] = React.useState(0)
    let [quation, setQuation] = React.useState(['1.修理電器', '2.修理汽車', '3.修理機械', '4.在戶外工作', '5.做木工的東西', '6.技職相關課程', '7.機械相關課程', '8.木工相關課程', '9.汽車相關課程', '10.操作機器或設備', '11.與專業技術人員一同工作', '12.閱讀科學文獻或相關書籍', '13.在實驗室或研發單位工作', '14.參與科學相關的專案工作', '15.研究科學理論', '16.化學相關工作', '17.用數學解決問題', '18.物理相關課程', '19.化學相關課程', '20.數學相關課程', '21.生物相關課程', '22.探討學術或研究技術', '23.素描、製圖或繪畫', '24.設計家具、服裝或海報', '25.參與樂團表演', '26.演練樂器', '27.雕塑或攝影', '28.寫小說或戲劇演出', '29.藝術相關課程', '30.音樂相關工作', '31.與藝術家、作家或雕塑家工作', '32.參與舞蹈、唱歌或戲劇等表演 ', '33.閱讀藝術、文學或音樂相關文章'])
    let q1 = ['34.教育或諮商輔導相關工作', '35.閱讀社會學文章或相關書籍', '36.參與慈善工作', '37.幫助他人解決問題', '38.研究青少年犯罪問題', '39.閱讀心理學文章或相關書籍', '40.人際關係相關課程', '41.學校教育相關工作', '42.精神疾患輔導相關工作', '43.成人教育相關工作', '44.參與志工相關工作', '45.學習商業經營策略', '46.經營管理自己的事業', '47.參與業務與行銷研討', '48.領導力相關課程', '49.擔任公職', '50.督導他人完成工作', '51.管理與領導相關工作', '52.領導團隊達成目標', '53.參與政治運動', '54.企管顧問相關工作', '55.閱讀商業雜誌或文章', '56.稅務相關工作', '57.與數字計算有關的工作', '58.操作辦公事務設備', '59.費用帳務管控工作', '60.作業監控與紀錄保存系統建構', '61.會計相關課程', '62.財務相關課程', '63.倉儲或物流管理相關工作', '64.檢查作業失誤或產品瑕疵', '65.記錄更新或文件檔案管理', '66.在辦公室工作']
    let [ableQuation, setAbleQuation] = React.useState(['67.我曾經操作過電動木工工具，例如電鋸、木工車床或磨光機等', '68.我能夠為汽車或機車換輪胎或機油', '69.我能夠畫出示意圖或比例圖來', '70.我曾經操作過電動機械工具，例如鑽床、磨床或縫紉機等', '71.我會維修家具與一些木製用品', '72.我會維修簡單的電器用品', '73.我可以修復損壞的家具', '74.我會使用許多的木工工具', '75.我能夠做簡單的水管維修', '76.我能夠製作簡單的木工作品', '77.我能夠油漆房子或房間', '78.我能夠以代數來解決數學問題', '79.我能夠進行科學實驗或相關研究', '80.我能夠理解放射性元素的半衰期', '81.我會使用數學對數表', '82.我能夠使用電腦進行科學研究', '83.我能夠說明白血球的功能', '84.我能夠解釋簡單的化學公式', '85.我能夠理解為何人造衛星不會掉下來', '86.我能夠寫出一份科學研究報告或論文', '87.我能夠理解宇宙「大爆炸」的理論', '88.我能夠理解DNA在遺傳學上的作用', '89.我會演奏樂器', '90.我可以參與兩部或四部合唱', '91.我能夠完成一場音樂獨奏演出', '92.我會演戲或舞台劇', '93.我能夠進行詮釋性閱讀', '94.我會繪畫或雕塑', '95.我能夠安排音樂製作相關工作', '96.我會設計服裝、海報或家具', '97.我能夠寫出一篇故事或創作詩詞', '98.我能夠寫出一篇正式的演講稿或報告來', '99.我能夠拍出引人注目的相片來'])
    let q2 = ['100.我能夠與各種類型的人溝通', '101.我善於解讀事物並說明給他人了解', '102.我是好鄰居，也是一個好的社區工作者', '103.我周遭的人會找我討論他們遭遇的困難', '104.我能夠教導兒童', '105.我能夠教導成人', '106.我擅於幫助人克服不安情緒或情緒困擾', '107.我能夠理解複雜的社會關係', '108.我擅於教導他人', '109.我擅於讓別人感到安心', '110.我能夠與不同人們互動合作', '111.我知道如何成為一個有效的領導者', '112.我能夠公眾演說', '113.我能夠管理業務行銷活動', '114.我能夠組織他人完成工作', '115.我是一個有抱負和自信的人', '116.我能夠引導他人依我的方法完成工作', '117.我能夠行銷', '118.我能夠辯論', '119.我有說服力', '120.我有企劃能力', '121.我有領導技能', '122.我能夠做好文書檔案管理', '123.我能夠做好內勤工作', '124.我會使用工作場所中的事務設備', '125.我能夠在時間內完成指定的文書工作', '126.我能夠使用簡單的數據處理設備', '127.我能夠處理與財務和會計有關的報表', '128.我能夠掌握與金錢交易有關的記錄', '129.我能夠操作與工作有關的電腦軟體', '130.我會寫正式的商務信函', '131.我能夠執行規律性的日常事務工作', '132.我是一個謹慎且工作有序的人']
    let [likeQuation, setLikeQuation] = React.useState(['133.飛機技師', '134.汽車技師', '135.木匠', '136.貨運司機', '137.市場調查員/民調員', '138.工地監工', '139.通訊技師', '140.火車技師', '141.機械技師', '142.電工技師', '143.電子技師', '144.飛行員', '145.焊接技師', '146.園藝工作者或農夫', '147.氣象學家', '148.生物學家', '149.天文學家', '150.醫學實驗室技術人員', '151.人類學家', '152.化學家', '153.獨立研究科學家', '154.科普作家', '155.地質學家', '156.植物學家', '157.物理學家', '158.社會科學研究者', '159.環境學家', '160.科學研究工作者', '161.詩人', '162.音樂工作者', '163.小說作家', '164.演員 ', '165.自由作家 ', '166.音樂編曲 '])
    let q3 = ['167.記者', '168.藝術家', '169.歌手', '170.作曲家', '171.雕塑家或雕刻家', '172.編劇或劇作家', '173.漫畫或動畫工作者', '174.演藝人員', '175.職業諮商師', '176.社會學家', '177.高中教師', '178.藥物戒斷輔導員', '179.青少年犯罪專家', '180.語言治療師', '181.婚姻顧問', '182.臨床心理師', '183.社會科學教師', '184.個人教練', '185.社工人員', '186.復健師', '187.遊樂場工作者', '188.公益活動主辦', '189.採購人員', '190.行銷廣告主管', '191.業務代表', '192.企業主管', '193.活動主持人或會議司儀', '194.業務人員或銷售人員', '195.房地產經紀人', '196.賣場主管', '197.業務主管', '198.公共關係主管', '199.媒體單位主管', '200.中小企業主', '201.立法委員', '202.機場櫃檯主管', '203.會計人員', '204.預算審查人員', '205.會計師', '206.徵信訪查員', '207.出納人員', '208.稅務人員', '209.倉管人員', '210.電腦操作員', '211.財務分析師', '212.成本估算人員', '213.薪資核算人員', '214.銀行人員', '215.會計人員', '216.稽核人員']
    let [quation4, setQuation4] = React.useState(['217.機械能力', '218.科學能力', '219.藝術能力', '220.教學能力', '221.業務能力', '222.文書能力', '223.手工技能', '224.數學能力', '225.音樂能力', '226.了解他人的能力', '227.管理能力', '228.辦公技能'])

    let ans = React.useRef(null)
    let ansSelect = e => {
        // //1
        if (e.target.name >= 1 && e.target.name <= 11) {
            ans.current = { ...ans.current, [e.target.name]: `R_${e.target.value}` }
        } else {

        }
        if (e.target.name >= 12 && e.target.name <= 22) {
            ans.current = { ...ans.current, [e.target.name]: `I_${e.target.value}` }
        }
        if (e.target.name >= 23 && e.target.name <= 33) {
            ans.current = { ...ans.current, [e.target.name]: `A_${e.target.value}` }
        }
        if (e.target.name >= 34 && e.target.name <= 44) {
            ans.current = { ...ans.current, [e.target.name]: `S_${e.target.value}` }
        }
        if (e.target.name >= 45 && e.target.name <= 55) {
            ans.current = { ...ans.current, [e.target.name]: `E_${e.target.value}` }
        }
        if (e.target.name >= 56 && e.target.name <= 66) {
            ans.current = { ...ans.current, [e.target.name]: `C_${e.target.value}` }
        }
        // //2
        if (e.target.name >= 67 && e.target.name <= 77) {
            ans.current = { ...ans.current, [e.target.name]: `R_${e.target.value}` }
        }
        if (e.target.name >= 78 && e.target.name <= 88) {
            ans.current = { ...ans.current, [e.target.name]: `I_${e.target.value}` }
        }
        if (e.target.name >= 89 && e.target.name <= 99) {
            ans.current = { ...ans.current, [e.target.name]: `A_${e.target.value}` }
        }
        if (e.target.name >= 100 && e.target.name <= 110) {
            ans.current = { ...ans.current, [e.target.name]: `S_${e.target.value}` }
        }
        if (e.target.name >= 111 && e.target.name <= 121) {
            ans.current = { ...ans.current, [e.target.name]: `E_${e.target.value}` }
        }
        if (e.target.name >= 122 && e.target.name <= 132) {
            ans.current = { ...ans.current, [e.target.name]: `C_${e.target.value}` }
        }
        // //3
        if (e.target.name >= 133 && e.target.name <= 146) {
            ans.current = { ...ans.current, [e.target.name]: `R_${e.target.value}` }
        }
        if (e.target.name >= 147 && e.target.name <= 166) {
            ans.current = { ...ans.current, [e.target.name]: `I_${e.target.value}` }
        }
        if (e.target.name >= 167 && e.target.name <= 174) {
            ans.current = { ...ans.current, [e.target.name]: `A_${e.target.value}` }
        }
        if (e.target.name >= 175 && e.target.name <= 188) {
            ans.current = { ...ans.current, [e.target.name]: `S_${e.target.value}` }
        }
        if (e.target.name >= 189 && e.target.name <= 202) {
            ans.current = { ...ans.current, [e.target.name]: `E_${e.target.value}` }
        }
        if (e.target.name >= 203 && e.target.name <= 216) {
            ans.current = { ...ans.current, [e.target.name]: `C_${e.target.value}` }
        }
        //4
        if (e.target.name == 217) {
            ans.current = { ...ans.current, [e.target.name]: `R_${e.target.value}` }
        }
        if (e.target.name == 218) {
            ans.current = { ...ans.current, [e.target.name]: `I_${e.target.value}` }
        }
        if (e.target.name == 219) {
            ans.current = { ...ans.current, [e.target.name]: `A_${e.target.value}` }
        }
        if (e.target.name == 220) {
            ans.current = { ...ans.current, [e.target.name]: `S_${e.target.value}` }
        }
        if (e.target.name == 221) {
            ans.current = { ...ans.current, [e.target.name]: `E_${e.target.value}` }
        }
        if (e.target.name == 222) {
            ans.current = { ...ans.current, [e.target.name]: `C_${e.target.value}` }
        }
        if (e.target.name == 223) {
            ans.current = { ...ans.current, [e.target.name]: `R_${e.target.value}` }
        }
        if (e.target.name == 224) {
            ans.current = { ...ans.current, [e.target.name]: `I_${e.target.value}` }
        }
        if (e.target.name == 225) {
            ans.current = { ...ans.current, [e.target.name]: `A_${e.target.value}` }
        }
        if (e.target.name == 226) {
            ans.current = { ...ans.current, [e.target.name]: `S_${e.target.value}` }
        }
        if (e.target.name == 227) {
            ans.current = { ...ans.current, [e.target.name]: `E_${e.target.value}` }
        }
        if (e.target.name == 228) {
            ans.current = { ...ans.current, [e.target.name]: `C_${e.target.value}` }
        }
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit');
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
                'key': 'memberSaveFitnessAssessmentAnswer',
                'JWT': state,
                '問卷名稱': '職業興趣免費版',
                '答題結果': ans.current
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
                    console.log(result);
            
                        if (result.結果.已做問卷.indexOf('職業興趣免費版') != (-1)) {
                            setActiveStep(2)
                            setSurveyResult(result.結果.已做問卷結果.職業興趣免費版.測驗結果說明)
                            setChart({
                                series: [{
                                    name: 'Series 1',
                                    data: [result.結果.已做問卷結果.職業興趣免費版.各項分數['R'], result.結果.已做問卷結果.職業興趣免費版.各項分數['I'], result.結果.已做問卷結果.職業興趣免費版.各項分數['A'], result.結果.已做問卷結果.職業興趣免費版.各項分數['S'], result.結果.已做問卷結果.職業興趣免費版.各項分數['E'], result.結果.已做問卷結果.職業興趣免費版.各項分數['C']]
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
                            setOnet(result.結果.已做問卷結果.職業興趣免費版.Onet職位)
                            setTaiwan(result.結果.已做問卷結果.職業興趣免費版.台灣職位)
                        } 
                }
                
            })
        
        }).catch((error) => console.error('Error:', error))
    }
    let fetchMoreData = () => {
        //  第一次加載
        setLoadState(1)
        if (quation.length <= 33) {
            setQuation([...quation, ...q1])
            setLoadText({ ...loadText, 1: false })
        }
    }
    let fetchMoreDate2 = () => {
        setLoadState(2)
        if (ableQuation.length <= 33) {
            setAbleQuation([...ableQuation, ...q2])
            setLoadText({ ...loadText, 2: false })
        }
    }
    let fetchMoreDate3 = () => {
        setLoadState(3)
        if (likeQuation.length <= 34) {
            setLikeQuation([...likeQuation, ...q3])
            setLoadText({ ...loadText, 3: false })
        }
    }

    let [surveyResult, setSurveyResult] = useState(null)//測驗結果說明

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
    let onetCollapseHandle = () => {
        setOnetCollapse(!onetCollapse)
        setTaiwanCollapse(false)
    }
    let taiwanCollapseHandle = () => {
        setTaiwanCollapse(!taiwanCollapse)
        setOnetCollapse(false)
    }
    let handleCheckBox = () => {
        // let cookies = document.cookie.split(';')
        // let state = ''
        // for (let i = 0; i < cookies.length; i++) {
        //     if (cookies[i].indexOf('state') >= 0) {
        //         state = cookies[i].split('=')[1]
        //     }
        // }
        // //由於Data是從上層傳下來,因此必須將check的資料在設定給上層，若是內部設定換TAB還是會抓到上層舊資料
        // setData({ ...Data, 結果: { ...Data['結果'], 已做問卷結果: { ...Data['結果']['已做問卷結果'], 職業興趣: { ...Data['結果']['已做問卷結果']['職業興趣'], Onet職位: onet } } } })

        // //已被選到的onet 因API需求重組
        // let checkOnetID = []
        // Object.keys(onet).map((onetID, index) => {
        //     if (Number(onet[onetID]['標註'] == 1)) {
        //         checkOnetID.push(onetID)
        //     }
        // })

        // fetch('https://demo.fois.online/Fois_Class/Main.php', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'key': 'memberSaveMarkData',
        //         'JWT': state,
        //         '問卷名稱': '職業興趣',
        //         '標記資料': checkOnetID,
        //     }),
        // }).then(res => {
        //     return res.json();
        // }).then(result => {
        //     if (result.狀態 == '儲存成功') {

        //         setAlertState({ severity: 'success', text: result.狀態, open: true })
        //     } else {
        //         setAlertState({ severity: 'error', text: result.errorCode, open: true })
        //     }

        // }).catch((error) => console.error('Error:', error))
    }
    React.useEffect(() => {
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
                if (result.結果.已做問卷.indexOf('職業興趣免費版') != (-1)) {
                    setActiveStep(2)
                    setSurveyResult(result.結果.已做問卷結果.職業興趣免費版.測驗結果說明)
                    setChart({
                        series: [{
                            name: 'Series 1',
                            data: [result.結果.已做問卷結果.職業興趣免費版.各項分數['R'], result.結果.已做問卷結果.職業興趣免費版.各項分數['I'], result.結果.已做問卷結果.職業興趣免費版.各項分數['A'], result.結果.已做問卷結果.職業興趣免費版.各項分數['S'], result.結果.已做問卷結果.職業興趣免費版.各項分數['E'], result.結果.已做問卷結果.職業興趣免費版.各項分數['C']]
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
                    setOnet(result.結果.已做問卷結果.職業興趣免費版.Onet職位)
                    setTaiwan(result.結果.已做問卷結果.職業興趣免費版.台灣職位)
                }else{
                    setActiveStep(0)
                }
                //console.log(result);
            }
        })
    }, [])
    return (
        <>
            <Grid container >
                <Grid item xs={12} style={{marginTop:20,marginBottom:20}}>
                    <Stepper activeStep={activeStep} style={{ paddingTop: 0, paddingBottom: 0, background: 'none' }}>
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
                                            <img src={WorkInterestBackground} style={{ height: 'auto', width: '100%' }} />
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
                        <Grid item xs={12}style={{marginTop:20}}>
                            <Button fullWidth variant="contained" color="secondary"
                                onClick={() => { setActiveStep(1) }}
                            >開始</Button>
                        </Grid>
                    </>
                    : null
                }
                {activeStep == 1 ?
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>

                        <Box pb={2}>
                            <Typography color='primary'>
                                1.請在以下題目中選出您喜歡或不喜歡做的事。如果這是您喜歡做的事，請在「喜歡」欄內打勾；如果這是您不喜歡做的事，請在「不喜歡」欄內打勾；如果您無法確定這是不是您所喜歡做的事，請在「?」欄內打勾。
                            </Typography>
                        </Box>
                        <Paper  >
                            <Box p={2} id="scrollableDiv" style={{ height: '70vh', overflow: "auto" }} >
                                <Grid container>
                                    <Grid item xs={6}>題目</Grid>
                                    <Grid item xs={6} container justify='space-around' wrap='nowrap'>
                                        <Grid item>喜歡</Grid>
                                        <Grid item>不確定</Grid>
                                        <Grid item>不喜歡</Grid>
                                    </Grid>
                                </Grid>
                                <InfiniteScroll
                                    style={{ width: '100%' }}
                                    dataLength={quation.length}
                                    next={fetchMoreData}
                                    hasMore={true}
                                    scrollableTarget="scrollableDiv"
                                    loader={loadText['1'] ? <Typography>載入中...</Typography> : null}
                                >
                                    {
                                        //JSX若是一個html陣列 會自動解開執行
                                        //map回傳的為一個html陣列
                                        quation.map(item =>
                                            <Box pt={2}>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <FormLabel component="legend">{item}</FormLabel>
                                                    </Grid>
                                                    <Grid item xs={6} container justify='space-around'>
                                                        <FormControl component="fieldset" fullWidth>
                                                            <RadioGroup aria-label="gender" name={item.split('.')[0]} onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
                                                                <FormControlLabel value="1" control={<Radio size='small' required />} />
                                                                <FormControlLabel value="?" control={<Radio size='small' required />} />
                                                                <FormControlLabel value="0" control={<Radio size='small' required />} />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        )
                                    }
                                </InfiniteScroll>
                            </Box>
                        </Paper>
                        {(loadState >= 1) ?
                            <>
                                <Box pt={4} pb={2}>
                                    <Typography variant='subtitle1' color='primary'>
                                        2.請在以下題目中選出您有能力或沒有能力做的事。如果這是您有能力做的事，請在 「有能力」欄內打勾；如果這是您沒有能力做的事，請在「沒能力」欄內打勾；如果您無法確定這是不是您有能力做的事，請在「?」欄內打勾。
                             </Typography>
                                </Box>
                                <Paper style={{ width: '100%' }}>
                                    <Box p={2} id='scrollableDiv2' style={{ height: '70vh', overflow: "auto" }}>
                                        <Grid container>
                                            <Grid item xs={6}>題目</Grid>
                                            <Grid item xs={6} container justify='space-around' wrap='nowrap'>
                                                <Grid item>有能力</Grid>
                                                <Grid item>?</Grid>
                                                <Grid item>沒能力</Grid>
                                            </Grid>
                                        </Grid>
                                        <InfiniteScroll
                                            style={{ width: '100%' }}
                                            dataLength={ableQuation.length}
                                            next={fetchMoreDate2}
                                            hasMore={true}
                                            scrollableTarget="scrollableDiv2"
                                            loader={loadText['2'] ? <Typography>載入中...</Typography> : null}
                                        >
                                            {
                                                //JSX若是一個html陣列 會自動解開執行
                                                //map回傳的為一個html陣列
                                                ableQuation.map(item =>
                                                    <Box pt={2}>
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <FormLabel component="legend">{item}</FormLabel>
                                                            </Grid>
                                                            <Grid item xs={6} container justify='space-around'>
                                                                <FormControl component="fieldset" fullWidth>
                                                                    <RadioGroup aria-label="gender" onChange={ansSelect} name={item.split('.')[0]} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
                                                                        <FormControlLabel value="1" control={<Radio size='small' required />} />
                                                                        <FormControlLabel value="?" control={<Radio size='small' required />} />
                                                                        <FormControlLabel value="0" control={<Radio size='small' required />} />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Divider />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                )
                                            }
                                        </InfiniteScroll>
                                    </Box>

                                </Paper>
                            </> : null
                        }
                        {(loadState >= 2) ?
                            <>
                                <Box pt={4} pb={2}>
                                    <Typography variant='subtitle1' color='primary'>
                                        3.請在以下題目中選出您喜歡或不喜歡做的職業。如果這是您喜歡做的職業，請在「喜歡」欄內打勾；如果這是您不喜歡做的職業，請在「不喜歡」欄內打勾；如果您無法確定這是不是您所喜歡做的職業，請在「?」欄內打勾。
                             </Typography>
                                </Box>
                                <Paper style={{ width: '100%' }}>
                                    <Box p={2} id='scrollableDiv3' style={{ height: '70vh', overflow: "auto" }}>
                                        <Grid container>
                                            <Grid item xs={6}>題目</Grid>
                                            <Grid item xs={6} container justify='space-around' wrap='nowrap'>
                                                <Grid item>喜歡</Grid>
                                                <Grid item>?</Grid>
                                                <Grid item>不喜歡</Grid>
                                            </Grid>
                                        </Grid>
                                        <InfiniteScroll
                                            style={{ width: '100%' }}
                                            dataLength={likeQuation.length}
                                            next={fetchMoreDate3}
                                            hasMore={true}
                                            scrollableTarget="scrollableDiv3"
                                            loader={loadText['3'] ? <Typography>載入中...</Typography> : null}
                                        >
                                            {
                                                //JSX若是一個html陣列 會自動解開執行
                                                //map回傳的為一個html陣列
                                                likeQuation.map(item =>
                                                    <Box pt={2}>
                                                        <Grid container>
                                                            <Grid item xs={6}>
                                                                <FormLabel component="legend">{item}</FormLabel>
                                                            </Grid>
                                                            <Grid item xs={6} container justify='space-around'>
                                                                <FormControl component="fieldset" fullWidth>
                                                                    <RadioGroup aria-label="gender" onChange={ansSelect} name={item.split('.')[0]} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
                                                                        <FormControlLabel value="1" control={<Radio size='small' required />} />
                                                                        <FormControlLabel value="?" control={<Radio size='small' required />} />
                                                                        <FormControlLabel value="0" control={<Radio size='small' required />} />
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <Divider />
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                )
                                            }
                                        </InfiniteScroll>
                                    </Box>

                                </Paper>
                            </> : null
                        }
                        {(loadState >= 3) ?
                            <>
                                <Box pt={4} pb={2}>
                                    <Typography variant='subtitle1' color='primary'>
                                        4. 請在以下題目中，勾選您自認為自己的能力高低程度，7代表最高，1代表最低。      此評分只是自我主觀的評量，並不代表您的真實能力程度。
                             </Typography>
                                </Box>
                                <Paper style={{ width: '100%' }}>
                                    <Box p={2} id='scrollableDiv4' style={{ height: '70vh', overflow: "auto" }}>
                                        {
                                            //JSX若是一個html陣列 會自動解開執行
                                            //map回傳的為一個html陣列
                                            quation4.map(item =>
                                                <Box pt={2}>
                                                    <Grid container>
                                                        <Grid item xs={12} md={6}>
                                                            <FormLabel component="legend">{item}</FormLabel>
                                                        </Grid>
                                                        <Grid item xs={12} md={6} container justify='space-around'>
                                                            <FormControl component="fieldset" fullWidth>
                                                                <RadioGroup aria-label="gender" onChange={ansSelect} name={item.split('.')[0]} fullWidth row style={{ justifyContent: 'space-around' }}>
                                                                    <FormControlLabel value="7" control={<Radio size='small' required />} label="7" style={{ marginRight: 8 }} />
                                                                    <FormControlLabel value="6" control={<Radio size='small' required />} label="6" style={{ marginRight: 8 }} />
                                                                    <FormControlLabel value="5" control={<Radio size='small' required />} label="5" style={{ marginRight: 8 }} />
                                                                    <FormControlLabel value="4" control={<Radio size='small' required />} label="4" style={{ marginRight: 8 }} />
                                                                    <FormControlLabel value="3" control={<Radio size='small' required />} label="3" style={{ marginRight: 8 }} />
                                                                    <FormControlLabel value="2" control={<Radio size='small' required />} label="2" style={{ marginRight: 8 }} />
                                                                    <FormControlLabel value="1" control={<Radio size='small' required />} label="1" style={{ marginRight: 8 }} />

                                                                </RadioGroup>
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Divider />
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            )
                                        }
                                    </Box>
                                </Paper>

                            </> : null
                        }
                        <Button type='submit' fullWidth variant="contained" color="secondary"  style={{ marginTop: 20 }}>送出</Button>

                    </form>
                    : null}
                {activeStep == 2 ?
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
                                                                    {/* <ListItemSecondaryAction>
                                                                        <Checkbox
                                                                            edge="end"
                                                                            checked={Number(onet[onetID]['標註'])}
                                                                            onChange={() => {
                                                                                //資料是字串'0'先轉number 但因為!反向會變布林還需再轉一次Number
                                                                                setOnet({ ...onet, [onetID]: { ...onet[onetID], 標註: Number(!Number(onet[onetID]['標註'])) } })
                                                                                console.log('123');
                                                                            }}
                                                                        />
                                                                    </ListItemSecondaryAction> */}

                                                                </ListItem>
                                                            </List>

                                                        ) : null
                                                }
                                                {/* 不放在回圈裡面 避免產生很多的jobdescription */}
                                                <JobDescription selectID={selectOnetID.current} select={selectOnet} Open={jobDescripOpen} setOpen={setJobDescripOpen} trigger={'onet'} />
                                            </Grid>
                                            {/* IDP按鈕 */}
                                            {/* <Grid item xs={12}>
                                                <Button fullWidth variant="contained" color="secondary"
                                                    onClick={handleCheckBox}
                                                >儲存標記</Button>
                                            </Grid> */}
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

                    : null}

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
        </>
    )
}