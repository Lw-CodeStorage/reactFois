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
function WorkStyle() {
    let classes = useStyles()
    //問卷選擇結果

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
    let [chart2, setChart2] = useState()
    let [jobDescripOpen, setJobDescripOpen] = useState(false)//subpage開起

    let ans = React.useRef(null)
    let ansSelect = e => {
        //  console.log('ansSelect');
        ans.current = { ...ans.current, [e.target.name]: e.target.value }
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

    let [q, setQ] = useState({
        'A1': ['1.我是一個使命必達的人', '2.我會給自己設下挑戰性的目標', '3.我經常會做出超出他人的成果', '4.我是一個自我要求比較高的人', '5.我會為工作無法如期完成而感到焦慮', '6.我的工作績效通常比別人高', '7.我總是會全心全力的投入工作', '8.我做事通常會做得超乎他人期待', '9.當我在學校就學時，我總是會如期完成老師指派的作業', '10.我通常能夠同時處理多件工作任務'],
        'A2': ['11.當我有太多工作做不完時，我會感到沮喪', '12.當工作無法如期交差時，並不會影響我的情緒', '13.當我發現無法如期完成工作時，我只能盡力而為', '14.我不太喜歡設定工作目標'],
        'B1': ['15.我會持續不斷的精進自己的工作技能', '16.我會自願優先的接受新工作任務的派任', '17.我樂於接受工作上所必須承擔的責任', '18.我樂於接受新工作任務的挑戰', '19.我樂於學習關於我工作領域的知識與技能', '20.我會主動探尋並發現新的學習機會', '21.我會積極維持自己工作專業領域的領先', '22.我會主動發現工作問題並尋求解決的方法'],
        'B2': ['23.通常要有人告訴我工作期限我才會去注意', '24.我經常會有不能如期完成工作任務的問題', '25.我需要有主管的激勵才會有比較好的工作表現', '26.我通常不會為了維持專業上的領先而付出太多心力', '27.我通常不會主動接受新的工作任務派任', '28.我不會因為工作職位的升遷，而受到激勵'],
        'C1': ['29.儘管遭受挑戰或打擊，我仍不會輕言放棄', '30.我自認為自己是一個能夠凡事堅持到底的人', '31.儘管我因初次嘗試而遭遇失敗，但我仍會持續努力', '32.儘管工作不如己意，但我仍會堅持不懈的完成它', '33.只要是我相信和認同的事，我便會去實踐', '34.只要接受一項工作任務，我便會心無旁鶩的完成它', '35.我不是一個遇到阻礙就輕言放棄的人', '36.我不會因為工作遭遇阻礙而停止前進', '37.我做事有始有終，不會虎頭蛇尾', '38.我會主動加班完成一項無法如期完成之工作任務'],
        'C2': ['39.當我嘗試學習新技能時，我會因為遭遇失敗而選擇放棄', '40.當工作任務看起來太過困難時，我通常會選擇放棄', '41.我會因為遭遇一些困難或問題的挑戰而改變初衷', '42.我會因為遇到某些困難或問題的挑戰而放棄努力',],
    })
    let quation1 = {
        'D1': ['43.我自認為自己是一個行事果斷的人', '44.我的同事與朋友說我是一個有自信的人', '45.我自認為自己是一個對自己有信心的人', '46.我能夠自信的質疑或挑戰他人的觀點', '47.我周遭的朋友說我是一個有意志力的人', '48.一旦做出決定，我便不會三心二意、猶豫不決', '49.我自認為自己是一個有自信心的人', '50.我對於自己的工作表現十分有信心', '51.我總是能夠綜觀全局並順利完成工作任務'],
        'D2': ['52.我對於自己的能力表現不是很有自信', '53:我不喜歡向他人表達自己內心的想法', '54:我經常覺得別人總是聽不懂我在說什麼', '55.表達自己內心的想法會讓我覺得不自在', '56.通常要將工作細節說明清楚我才能把工作做好'],
        'E1': ['57.我樂於帶領工作團隊完成工作任務', '58.我能夠在我的工作領域中展現領導才能', '59.我認為自己當領導者可以做得比當跟隨者好', '60.我樂於擔任領導性的職位工作', '61.我對於自己的管理才能有自信', '62.我可以毫不猶豫的表達自己的觀點和想法', '63.經常有人會向我詢問建議、意見或看法', '64.我喜歡被視為領導者或被當作領導者對待'],
        'E2': ['65.領導別人對我來說不是一件好差事', '66.我不喜歡做管理人的事', '67.參加工作相關會議時，我總是習慣於躲在角落', '68.我覺得主持工作任務是一件很有挑戰性的事', '69.我不喜歡參與重要決策，我傾向於讓別人做決定', '70.我不喜歡做帶領工作團隊的事'],
        'F1': ['71.我相當滿意自己能夠樂於幫助他人', '72.我喜歡和團隊成員有團隊合作的感覺', '73.如果團隊合作產生衝突時，我能夠與團隊成員進行溝通協調', '74.我能夠順暢在團隊中分工並協力合作達成共同目標', '75.當一同工作的團隊有傲人成就時，我也會與有榮焉的感到驕傲', '76.當有需要他人協助時，我能夠自在且毫不遲疑的尋求協助', '77.我能夠與他人順暢的協力合作'],
        'F2': ['78.我認為與同事們友善相處並不是一件多麼重要的事', '79.我通常不和工作上平庸或失敗的同事打交道', '80.我對工作的滿意程度並不會受到同事相處是否融洽的影響', '81.我認為同事彼此相處是否融洽並不重要，重要的是他們有沒有做好工作', '82.我有時會覺得要與工作上的同事相處融洽是一件困難的事', '83.我覺得指導和教導工作績效低落的同事是一件十分困難的事', '84.我有時會覺得不太容易和不同的團隊成員協力合作'],
    }
    let quation2 = {
        'G1': ['85.周遭的同事和朋友都說我是一個關懷他人有同情心的人', '86.關懷他人和付出同情心，對我來說不是一件困難的事', '87.只要有機會為同事和朋友爭取福利，我都會去做', '88.同理心體會和瞭解他人的感受，對我來說不難', '89.我自認為自己是一個善解人意的人', '90.我可以接受失誤並願意給別人機會', '91.我自認為自己是一個善於傾聽的人', '92.我樂於協助他人達成工作目標'],
        'G2': ['93.關懷他人和付出同情心，對我來說是不太可能的事', '94.我周遭的同事和朋友會說我麻木不仁', '95.聽聞和討論他人的隱私之事會讓我感到不自在', '96.我不喜歡和同事聊一些關於個人的私事', '97.我通常會用評判的方式去品評一個人', '98.瞭解他人的感受不是我擅長的事'],
        'H1': ['99.我自認為自己是一個樂於交朋友的人', '100.我認為能在工作中營造“像一家人”的感覺是有價值的', '101.我喜歡認識新同事或新朋友', '102.交朋友對來說是一件簡單的事', '103.我的朋友都說我是一個善於社交的人', '104.我自認為自己是一個外向的人', '105.我喜歡很多人聚在一起的熱鬧和熱絡感覺', '106.認識每位一同工作的同事對我來說很重要', '107.與其一個人獨自工作，我比較喜歡許多人在一起工作的感覺'],
        'H2': ['108.在團隊工作中，我比較喜歡從事和他人互動較少的工作', '109.我對於一同工作的同事不會有太多情感', '110.我比較喜歡獨自工作，因為這樣比較不會受干擾', '111.結交新朋友對我來說有點挑戰性', '112.我在社交場合中有時會感到不自在'],
        'I1': ['113.我能夠在不爭論的情況表達不同意他人觀點或論述', '114.周遭的同事和朋友經常說我是一個心平氣和的人', '115.我自認為自己是一個不容易被激怒的人'],
        'I2': ['116.在壓力的工作環境中工作通常會讓我有情緒反應', '117.我有時會在工作環境中情緒失控', '118.當我被某些人激怒後不會很快恢復平靜，因為這對我來說有些困難', '119.我周遭的同事和朋友會說我是一個易怒的人', '120.我自認為自己是一個容易被惹惱怒的人', '121.我有時會和同事說一些之後自己會感到後悔的事', '122.我很難掩飾自己對某些人失望的感覺', '123.我自認為自己是一個沒有耐性容易不耐煩的人', '124.我總是會先做出反應，然後再去收拾反應的後果', '125.我通常不會太去留意自己某些行為可能產生的後果', '126.我的工作效能容易受到自己的心情或情緒影響'],
    }
    let quation3 = {
        'J1': ['127.我自認為自己能夠妥適的忍受壓力', '128.我的同事說我是一個能夠冷靜處理工作壓的人', '129.我自認為自己是一個能接受批評並迅速採取改善行動的人', '130.我在壓力的工作情境下仍然能夠保持鎮定並沉著應對'],
        'J2': ['131.我覺得我是一個容易感到壓力的人', '132.我不喜歡處理一些壓力大的工作問題', '133.我的同事和朋友說我是一個容易擔心和憂慮的人', '134.與工作同事相比，我覺得自己比較容易緊張和焦慮', '135.經過一整天的緊張工作之後，我會很難放輕鬆', '136.當我的工作開始出現壓力時，我會有失眠的問題', '137.如果我知道有很多工作要做，我會覺得焦慮和緊繃', '138.我不太能夠接受別人對我的批評', '139.我覺得自己是一個容易感到憂慮的人', '140.我覺得我的生活和工作充滿壓力'],
        'K1': ['141.我周遭的同事和朋友都說我是一個隨和的人', '142.我喜歡不斷嘗試新鮮的事物', '143.我可以很快速的轉換到不同的工作任務上', '144.我可以快速適應新的工作環境或工作任務', '145.我自認為自己可以跳脫自己的舒適圈工作'],
        'K2': ['146.當工作常規改變，我會感到非常有壓力', '147.當我接手一份不熟悉的工作任務時，我會感到十分焦慮', '148.我比較能適應公司政策和工作程序不變動的工作環境', '149.我比較喜歡依循既定的工作程序', '150.我認為改變做事的方式通常會讓事情變得更糟', '151.我比較喜歡從事自己熟悉的工作', '152.一旦我下定決定後，我通常不會去改變它', '153.當工作計畫擬定後，我通常不太願意去改變它', '154.我不太喜歡嘗試去學習新的技能'],
        'L1': ['155.我的同事都說我是一個值得信賴的工作夥伴', '156.我通常都能兌現我自己提出的承諾', '157.我的工作夥伴通常都能信任我說的話', '158.我自認為自己是一個可靠可信的人', '159.我自認為自己是一個負責守信的人', '160.我通常都會如期完成約定的工作', '161.我通常不會遲到或是錯過約定的時間', '162.當我無法履行我自己提出的承諾時，會讓我感挫折', '163.我很少延誤工作或校作業的繳交時程'],
        'L2': ['164.我有時候會漏掉一些我應該完成的工作任務', '165.我覺得守信守約是一件困難且不易做到的事', '166.我會作出一些自己做不到的承諾', '167.我經常會忘記自己所提出的承諾', '168.我並不在意自己是否有沒有100%履行自己提出的承諾'],
    }
    let quation4 = {
        'M1': ['169.我在工作上，會特別注意可能疏忽的細節', '170.我對於工作的細節十分的講究，甚至有點龜毛', '171.我通常能夠發現其他人忽略和遺漏的瑕疵', '172.我擅長於執行要求嚴謹的工作任務', '173.我自認為自己是一個完美主義者', '174.我十分在意自己的工作產出是否完美無瑕', '175.在送出作品之前，我總是會檢查我的作品是否有瑕疵'],
        'M2': ['176.我通常不會花太多時間重複或仔細檢查我的工作產出或作品', '177.我覺得要將工作維持得井然有序是一件苦差事', '178.我不喜歡從事需要太多複雜細節的工作任務', '179.我有時候會放手讓一些事情混過去', '180.我通常要經過一番掙扎才能使自己的工作有條不紊', '181.我有時候會疏忽或忘記檢查我的作品是否有瑕疵', '182.我的工作產出或作品經常有不合格或不良品的狀況'],
        'N1': ['183.誠實守信用的品格對我而言非常重要', '184.我的同事或朋友說我是一個誠實守信用的人', '185.我無法接受偷工減料和偷斤減兩的行為', '186.我總是會遵守規則或規定'],
        'N2': ['187.只要能夠不被抓包，我偶而也會違規', '188.我有時會撒謊', '189.我曾經有過作弊的經歷', '190.如果有必要，我有時候會刻意曲解一些規定', '191.為了讓工作能更順利的執行，有時候我會違反一些規定', '192.有時為了節省時間，我會跳過一些冗長的作業', '193.我偶而會不遵守工作場域中的一些麻煩規定', '194.我不喜歡在過於嚴格的規定或規範下工作', '195.我曾經為了找到自己想要的工作而提供不實的履歷資訊', '196.我曾經將他人的功勞據為己有'],
        'O1': ['197.我總是會將自己的工作區域維持整潔', '198.我不喜歡遲到或不準時', '199.我周遭同事經常說我是個有生產力的工作夥伴', '200.我自認為自己是個重視且遵守倫理道德的人', '201.每當執行重要的工作任務時，我總是會小心謹慎不犯錯', '202.我對於自己能夠穩健有條理的完成工作任務感到滿意'],
        'O2': ['203.我周遭同事或朋友經常說我是一個粗心大意的人', '204.每當轉換新的工作時，我並不是很容易進入新工作狀況', '205.我不太喜歡事先做計劃', '206.我時常會忘記歸還向別人借的東西', '207.我在玩遊戲時偶而會作弊', '208.我經常會將自己的工作區域搞得有點亂', '209.我記性不是很好，經常會找不到東西', '210.我經常會在工作上犯錯'],
    }
    let quation5 = {
        'P1': ['211.我認為自己可以不需他人監督的自主完成工作任務', '212.我認為可以靠自己的力量達成個人職涯發展目標', '213.只要給我足夠的彈性和自主空間，我便能夠發揮工作效能', '214.我不需要有太多的監督或督導才能完成工作任務', '215.我比較傾向於能夠獨立自主的完成工作任務', '216.我覺得不要有太多的監督，反而可以賦予自己更大的工作能量'],
        'P2': ['217.我覺得獨立自主完成工作任務對我而言是困難的', '218.我覺得工作是需要有主管監督和督導才能做得好', '219.我總是需要參考他人的相關意見和建議才能做出決定', '220.我總是需要有人看過我的工作產出，才能確認是否可以結束', '221.每當要做重要決定時，我總是會探詢其他人的看法', '222.我需要有人不時提醒我關於我的工作績效狀況', '223.我習慣於讓別人替我做決定', '224.我需要有適切的監督時和督導才能把工作做得好'],
        'Q1': ['225.我喜歡從事或參與需要創意思考的工作或活動', '226.我喜歡提出一些創意的想法或點子', '227.我有滿腦子的創新創意點子', '228.我有能力提出解決工作問題的創新解決方案', '229.我喜歡從事需要想像力的工作任務', '230.我可以做到跳出框框思考', '231.我喜歡嘗試新的方法處理工作上的問題', '232.我認為自己是一個有好奇心的人', '233.經常會有些人來詢問我對某些事物的觀點或看法', '234.我總是能夠自己找到完成工作任務的方法'],
        'Q2': ['235.我不覺得自己具有任何創意才能', '236.我不喜歡從事或參與需要另類創意思考的工作或活動', '237.我覺得從事需要創意思考的工作是一件十分困難的事', '238.我覺得要自己能提出原創想法是一件十分困難的事'],
        'R1': ['239.當遇到問題時，我通常會仔細梳理各種可能發生的原因', '240.我樂於分析工作問題並找出有效的解決方法', '241.我擅於解決工作上的問題並排除故障', '242.我能夠綜合歸納工作文件並整理相關資訊以作出結論', '243.我能夠進行邏輯性的思考', '244.我擅於處理工作上需要動腦筋解決的難題', '245.我擅於分析與我工作相關的複雜問題', '246.我可以有條不紊地解決問題', '247.我喜歡從事解決問題的思考性工作'],
        'R2': ['248.我不認為大部分工作問題可以從邏輯上去解決', '249.我比較傾向於透過直覺而不是基於事實來做決定', '250.當有太多因素糾葛不清時，我通常無法做出決定', '251.我比較傾向於依靠別人來解決問題', '252.當嘗試解決複雜的工作問題時，我有時會迷失在問題的細節裡']
    }
    //因為radio有required,外層有form的onSubmit會去偵測必填的有沒有填
    //這裡是處理form送出的事件
    let handleSubmit = (event) => {
        event.preventDefault();
        console.log(Object.keys(ans.current).length)
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
                '問卷名稱': '工作風格',
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
                    setData(result)
                    setActiveStep(2)
                }
            })
        }).catch((error) => console.error('Error:', error))
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
        setData({ ...Data, 結果: { ...Data['結果'], 已做問卷結果: { ...Data['結果']['已做問卷結果'], 工作風格: { ...Data['結果']['已做問卷結果']['工作風格'], Onet職位: onet } } } })

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
                '問卷名稱': '工作風格',
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
        console.log(Object.keys(q).length);
        if (Object.keys(q).length == 6) {
            setQ({ ...q, ...quation1 })
        }
        if (Object.keys(q).length == 12) {
            setQ({ ...q, ...quation2 })
        }
        if (Object.keys(q).length == 18) {
            setQ({ ...q, ...quation3 })
        }
        if (Object.keys(q).length == 24) {
            setQ({ ...q, ...quation4 })
        }
        if (Object.keys(q).length == 30) {
            setQ({ ...q, ...quation5 })
        }
    }
    let dataLength = () => {
        //靠邀這裡要給 但什麼都不用寫就會加載
        // let val = Object.values(q)
        // console.log(val);
    }

    //init
    useEffect(() => {

        if (Data) {
            if (Data.結果.已做問卷.indexOf('工作風格') != (-1)) {

                setSurveyResult(Data.結果.已做問卷結果.工作風格.測驗結果說明)
                setChart({
                    series: [{
                        name: 'Series 1',
                        data: [20, 30, 40, 50, 60]
                    }],
                    options: {
                        chart: {
                            type: 'radar',
                            toolbar: {
                                show: false
                            },
                        },
                        title: {
                            // text: 'Basic Radar Chart'
                        },
                        xaxis: {
                            categories: ['D', 'IS', 'A', 'R', 'PSS']
                        }
                        , responsive: [{
                            breakpoint: 500,
                            options: {
                                chart: {
                                    width: 300,
                                    height: 200
                                }
                            },
                        }]
                    },

                })
                setChart2({
                    series: [{
                        data: [8, 8, 9, 7, 6, 8, 8, 6, 8, 3, 9, 7, 6, 5, 6, 7, 6, 7]
                    }],
                    options: {
                        chart: {
                            type: 'bar',
                            width: '300px',

                            toolbar: {
                                show: false
                            },

                        },
                        plotOptions: {
                            bar: {
                                barHeight: '100%',
                                distributed: true,
                                horizontal: true,
                                dataLabels: {
                                    position: 'bottom'
                                },
                            }
                        },
                        colors: ['#546E7A', '#546E7A', '#546E7A', '#546E7A', '#A5978B', '#A5978B', '#A5978B', '#A5978B',
                            '#f48024', '#f48024', '#f48024', '#546E7A', '#546E7A', '#546E7A', '#546E7A', '#2b908f', '#2b908f', '#2b908f'
                        ],
                        dataLabels: {
                            enabled: true,
                            textAnchor: 'start',
                            style: {
                                colors: ['#fff']
                            },
                            formatter: function (val, opt) {
                                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
                            },
                            offsetX: 0,
                            dropShadow: {
                                enabled: true
                            }
                        },
                        stroke: {
                            width: 1,
                            colors: ['#fff']
                        },
                        xaxis: {

                            categories: ['追求成就', '主動積極', '堅持到底', '高自信心', '領導風範', '協同合作', '關懷他人', '社會取向',
                                '自我管理', '壓力容忍', '彈性適應', '信賴可靠', '注重細節', '誠信正直', '負責盡職', '獨立自主', '創新導向', '分析思維'
                            ],
                        },
                        yaxis: {
                            labels: {
                                show: false
                            }
                        },
                        // title: {
                        //     text: 'Custom DataLabels',
                        //     align: 'center',
                        //     floating: true
                        // },
                        tooltip: {
                            theme: 'dark',
                            x: {
                                show: false
                            },
                            y: {
                                title: {
                                    formatter: function () {
                                        return ''
                                    }
                                }
                            }
                        },

                        responsive: [{
                            breakpoint: 500,
                            options: {
                                chart: {
                                    width: 300,
                                    height: 600
                                },
                                xaxis: {
                                    labels: {
                                        show: false
                                    }
                                },
                            },
                        }],
                        legend: {
                            show: false
                        }
                    }
                })
                setOnet(Data.結果.已做問卷結果.工作風格.Onet職位)
                setTaiwan(Data.結果.已做問卷結果.工作風格.台灣職位)
            } else {
                setActiveStep(0)
            }
        }
    }, [Data])
    // 滑動載入部分問卷
    let questions = (Object.keys(q).map(key =>

        q[key].map(value =>
            <ListItem button dense divider>
                <Grid item container xs={12} alignItems='center' >

                    <Grid item xs={6}>
                        <FormLabel component="legend">{value}</FormLabel>
                    </Grid>
                    <Grid item xs={6} container justify='space-around'>
                        <FormControl component="fieldset" error={error} fullWidth>
                            <RadioGroup aria-label="gender" name={value.split('.')[0]} onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', paddingLeft: '20px' }}>
                                <FormControlLabel value={`T${key}`} control={<Radio size='small' required />} />
                                <FormControlLabel value={`F${key}`} control={<Radio size='small' required />} />

                            </RadioGroup>
                            <FormHelperText>{helperText}</FormHelperText>
                        </FormControl>
                    </Grid>


                </Grid>
            </ListItem>
        )


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
                                                <Grid item>同意</Grid>
                                                <Grid item>不同意</Grid>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <Divider />
                                            </Grid>
                                        </Grid>

                                        <InfiniteScroll
                                            style={{ width: '100%' }}
                                            dataLength={dataLength}
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

                                                    <Typography variant='h6' color='primary'>測評圖表</Typography>
                                                    <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                    <Grid item container justify='center' alignContent='center'>
                                                        {/* chart 在jsx上設定是未RWD的的長寬，RWD長寬在初始化斷點裡面設定*/}
                                                        {chart ?
                                                            <Chart
                                                                options={chart.options}
                                                                series={chart.series}
                                                                type="radar"
                                                                width='100%'
                                                                height='600px'
                                                            /> : null}
                                                    </Grid>
                                                    {/* <Grid item container justify='center' xs={12}> 雷達圖分析</Grid> */}
                                                </Grid>
                                                <Grid item xs={12} md={6} >
                                                    <Typography variant='h6' color='primary'>測評解析</Typography>
                                                    <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                    <Box >
                                                        {chart2 ?
                                                            <Chart

                                                                options={chart2.options}
                                                                series={chart2.series}
                                                                type="bar"
                                                                width='100%'
                                                                height='600px'
                                                            /> : null}
                                                    </Box>

                                                </Grid>
                                                <Grid item xs={12}  >
                                                    <Box width='100%' mb={2} p={2}>
                                                        <Typography variant='h6' color='primary'>類型定義</Typography>
                                                        <Divider style={{ marginTop: 5, marginBottom: 10 }} />
                                                        <Grid container spacing={2}>

                                                            <Grid item xs={12} md={4}> <Typography variant='body1' color='secondary'>使命必達型 (Drive)</Typography> </Grid>
                                                            <Grid item xs={12} md={8}> 屬於此類型之人，具有使命必達的工作風格，他們會因受到激勵而積極、主動、負責的完成自己的工作。 此外，此類型人通常會給自己設定比較高的工作標準，而且通常比較不會因為遇到阻礙而輕易放棄自己設定之目標。由於此類型人對自我和工作的要求比較高， 他們比較會主動表達自己在工作上的意見、看法和要求，因此和這類人一同工作會比較有壓力。 使命必達型之工作風格包含「追求成就」、「堅持到底」、「主動積極」、「高自信心」等四項工作特質。</Grid>

                                                            <Grid item xs={12} md={4}> <Typography variant='body1' color='secondary'>人際關係型 (Interpersonal Skill)</Typography> </Grid>
                                                            <Grid item xs={12} md={8}> 屬於此類型之人，重視人際與同事和諧的關係經營，他們對於他人的情感和工作需求比較貼心和敏感。 此外，此類型人樂於團隊合作並能與他人協力合作完成團隊工作任務；由於此類型人重視人際與同事和諧關係的經營，因此他們會比較願意表現出領導風範並參與重要的工作決策。 人際關係型之工作風格包含「領導風範」、「協同合作」、「關懷他人」、「社會取向」等四項工作特質。 </Grid>

                                                            <Grid item xs={12} md={4}> <Typography variant='body1' color='secondary'>隨遇而安型 (Adjustment)</Typography> </Grid>
                                                            <Grid item xs={12} md={8}> 屬於此類型之人，比較能夠適應高壓力的工作環境，他們能在壓力下以穩定的情緒平靜安穩完成工作任務。 此外，此類型人對於工作環境的變化適應良好，而且不會讓工作壓力對他們的個人生活產生負面影響。 由於此類型人比較能夠覺察和適應工作環境的變化，因此他們會比較願意接受工作上的建設性批評並考慮相關行動的後果。 隨遇而安型之工作風格包含「自我管理」、「壓力容忍」、「彈性適應」等三項工作特質。</Grid>

                                                            <Grid item xs={12} md={4}> <Typography variant='body1' color='secondary'>負責盡職型 (Responsibility)</Typography> </Grid>
                                                            <Grid item xs={12} md={8}> 屬於此類型之人，會盡力遵守自己在工作上的承諾，他們言行可靠且值得信賴。 此外，此類型人會誠實的遵守工作場所的相關規定，他們對於自己的工作產出品質十分重視，而且通常會盡力做到完美無瑕疵。 負責盡職型之工作風格包含「信賴可靠」、「注重細節」、「誠信正直」、「負責盡職」等四項工作特質。 </Grid>

                                                            <Grid item md={12} md={4}> <Typography variant='body1' color='secondary'>問題解決型 (Problem-Solving Skill)</Typography> </Grid>
                                                            <Grid item md={12} md={8}> 屬於此類型之人，不僅能夠為自己負責之多項工作任務排定合理的優先順序，也擅長以合乎邏輯的方式處理和解決工作上的複雜問題。 此外，此類型人通常不喜歡他人為他們做決定，他們喜歡以自己的方式來解決工作上的問題；由於此類型人比較喜歡”跳脫框框”解決問題，不喜歡太多工作上限制，因此他們通常能夠在最小的監督下有效完成工作任務。 問題解決型之工作風格包含「獨立自主」、「創新導向」、「分析性思維」等三項工作特質。</Grid>


                                                        </Grid>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Box width='100%' mb={2}>
                                                        <Typography variant='h6' color='primary'>測評結果</Typography>
                                                        <Divider style={{ marginTop: 5, marginBottom: 10 }} />

                                                        {surveyResult ? surveyResult.map((result, index) =>
                                                            <>
                                                                <Box width='100%' p={2} >


                                                                    <Grid container spacing={1}>
                                                                        <Grid item xs={12}><Typography variant='subtitle1' color='secondary'>{`${result['名稱']}-${result['分數']}`}</Typography></Grid>
                                                                        <Grid item xs={12}>{result['描述']}</Grid>


                                                                        {result['細項'].map(detailValue =>
                                                                            <>
                                                                                <Grid item xs={12}> <Typography variant='subtitle2' color='secondary'>{`- ${detailValue['名稱']}-${detailValue['分數']}`}</Typography> </Grid>
                                                                                <Grid item xs={12}>{detailValue['描述']}</Grid>
                                                                            </>
                                                                        )}
                                                                    </Grid>
                                                                    <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>



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
function WorkValue2() {
    let classes = useStyles()
    //問卷選擇結果

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
    let [chart2, setChart2] = useState()
    let [jobDescripOpen, setJobDescripOpen] = useState(false)//subpage開起

    let ans = React.useRef(null)
    let ansSelect = e => {
        //  console.log('ansSelect');
        ans.current = { ...ans.current, [e.target.name]: e.target.value }
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

    let [q, setQ] = useState(['1.能夠在工作中發揮自己的才能', '2.能夠在工作中發展自己的專業能力', '3.能夠使用自己擅長的技能完成工作', '4.能夠在工作中充分利用自己的專長技能', '5.能夠持續在工作中提升個人工作效能', '6.能夠在工作中達成自己設定的職涯目標', '7.能夠在工作中獲得滿足感', '8.能夠在工作中獲得成就感', '9.能夠在工作中達成自己的短期工作目標', '10.能夠在工作中實現自己的長期職涯目標', '11.能夠以最少的督導完成自己的日常工作', '12.能夠在工作中充分展現自己的專業能力', '13.能夠不須主管督導的自主完成工作任務', '14.能夠在被信任的環境中獨立自主完成工作', '15.能夠不被主管經常關切自己的工作執行狀況', '16.能夠評估自己的工作負荷並自主安排工作順序', '17.能夠自主規劃和安排自己的日常工作進度', '18.能夠自主設定與自己工作相關的工作目標', '19.對夠自己為影響自己工作效能的決定負責', '20.能夠在工作中自己承擔執行工作的成敗責任', '21.能夠在重視工作與生活平衡的環境中工作', '22.能夠在重視員工個別需求的環境中工作', '23.我的直屬主管能夠給我工作上的支持', '24.能夠在工作中受到公平的對待', '25.能夠在重視員工健康的環境中工作', '26.工作主管能夠主動關心自己工作上的相關需求', '27.工作主管能夠主動提供適切的工作教導', '28.工作主管能夠提供清楚且可行的工作指導', '29.我的直屬主管能夠提供工作上支援與協助', '30.我的直屬主管能夠為我規畫足夠教育訓練'])
    let q2 = ['31.能夠在友善的工作環境中工作', '32.能夠在重視學習成長的工作環境中工作', '33.能夠在重視分享和學習的工作環境中工作', '34.能夠與有經驗且受人敬重的同事協同工作', '35.能夠在讓我有歸屬感的工作環境中工作', '36.能夠在同事間願意彼此幫忙的工作環境中工作', '37.能夠與工作同事偕力合作達成工作任務', '38.能夠在重視團隊合作的工作環境中工作', '39.能夠以分工合作的方式與同事偕同工作', '40.能夠與不同他人合作共同達成團隊目標', '41.能夠從事忙碌且有意義的工作', '42.能夠在每天都有工作可做的環境中工作', '43.能夠在有重要的多工任務環境中工作', '44.能夠在有變化且具挑戰性的環境中工作', '45.能夠在工作中嘗試不同的或新的事物', '46.能夠在有升遷和加薪機會的環境中工作', '47.能夠在財務穩健的工作環境中工作', '48.能夠在有發展潛力的工作環境中工作', '49.能夠在穩定發展的產業環境中工作', '50.能夠在穩定健康的工作環境中工作', '51.能夠在工作中獲得肯定和尊重', '52.我的工作成就能夠獲得主管的認可', '53.我的工作表現能夠獲得主管的認可', '54.我的工作成就能夠獲得同事們的認可', '55.我的工作績效表現能夠獲得公司認可', '56.能夠有機會參與公司重要決策的制定', '57.能夠有機會領導工作團隊完成公司專案', '58.能夠在公司未來發展方向發揮個人影響力', '59.能夠有機會為公司未來發展提供建言', '60.自己提出的建言能夠被決策者所聆聽']
    //因為radio有required,外層有form的onSubmit會去偵測必填的有沒有填m
    //這裡是處理form送出的事件
    let handleSubmit = (event) => {
        event.preventDefault();
        console.log(Object.keys(ans.current).length)
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
                '問卷名稱': '工作價值觀2版',
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
                    setData(result)
                    setActiveStep(2)
                }
            })
        }).catch((error) => console.error('Error:', error))
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
        setData({ ...Data, 結果: { ...Data['結果'], 已做問卷結果: { ...Data['結果']['已做問卷結果'], 工作價值觀2版: { ...Data['結果']['已做問卷結果']['工作價值觀2版'], Onet職位: onet } } } })

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
                '問卷名稱': '工作價值觀2版',
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
        console.log(Object.keys(q).length);
        if (q.length <= 30) {
            setQ([...q, ...q2])
        }

    }
    let dataLength = () => {
        //靠邀這裡要給 但什麼都不用寫就會加載
        // let val = Object.values(q)
        // console.log(val);
    }

    let questions = (
        q.map(value =>
            <ListItem button dense divider>
                <Grid item container xs={12} alignItems='center' >

                    <Grid item xs={6} spacing={1}>
                        <FormLabel component="legend">{value}</FormLabel>
                    </Grid>
                    <Grid item xs={6} container justify='space-around' style={{ lineHeight: 18 }}>
                        <FormControl component="fieldset" error={error} fullWidth>
                            <RadioGroup aria-label="gender" name={value.split('.')[0]} onChange={ansSelect} fullWidth row style={{ justifyContent: 'space-around', marginLeft: 40, flexWrap: 'nowrap' }}>
                                {
                                    value.split('.')[0] <= 10 ? <>
                                        <FormControlLabel value={`A_NV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`A_SV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`A_HV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`A_VHV`} control={<Radio size='small' required />} /></> : null
                                }
                                {
                                    value.split('.')[0] >= 11 && value.split('.')[0] <= 20 ? <>
                                        <FormControlLabel value={`I_NV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`I_SV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`I_HV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`I_VHV`} control={<Radio size='small' required />} /></> : null
                                }
                                {
                                    value.split('.')[0] >= 21 && value.split('.')[0] <= 30 ? <>
                                        <FormControlLabel value={`S_NV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`S_SV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`S_HV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`S_VHV`} control={<Radio size='small' required />} /></> : null
                                }
                                {
                                    value.split('.')[0] >= 31 && value.split('.')[0] <= 40 ? <>
                                        <FormControlLabel value={`RL_NV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`RL_SV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`RL_HV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`RL_VHV`} control={<Radio size='small' required />} /></> : null
                                }
                                {
                                    value.split('.')[0] >= 41 && value.split('.')[0] <= 50 ? <>
                                        <FormControlLabel value={`W_NV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`W_SV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`W_HV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`W_VHV`} control={<Radio size='small' required />} /></> : null
                                }
                                {
                                    value.split('.')[0] >= 51 && value.split('.')[0] <= 60 ? <>
                                        <FormControlLabel value={`RC_NV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`RC_SV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`RC_HV`} control={<Radio size='small' required />} />
                                        <FormControlLabel value={`RC_VHV`} control={<Radio size='small' required />} /></> : null
                                }
                            </RadioGroup>
                            <FormHelperText>{helperText}</FormHelperText>
                        </FormControl>
                    </Grid>


                </Grid>
            </ListItem>
        )
    )
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
                if (result.結果.已做問卷.indexOf('工作價值觀2版') != (-1)) {
                    setActiveStep(2)
                    setSurveyResult(result.結果.已做問卷結果.工作價值觀2版.測驗結果說明)
                    setChart({
                        series: [{
                            name: 'Series 1',
                            data: [result.結果.已做問卷結果.工作價值觀2版.各項分數['Achievement']['Total_For_Achievement'], result.結果.已做問卷結果.工作價值觀2版.各項分數['Independence']['Total_For_Independence'], result.結果.已做問卷結果.工作價值觀2版.各項分數['Recognition']['Total_For_Recognition'], result.結果.已做問卷結果.工作價值觀2版.各項分數['Relationships']['Total_For_Relationships'], result.結果.已做問卷結果.工作價值觀2版.各項分數['Support']['Total_For_Support'], result.結果.已做問卷結果.工作價值觀2版.各項分數['Working_Conditions']['Total_For_Working_Conditions']]
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
                    setOnet(result.結果.已做問卷結果.工作價值觀2版.Onet職位)
                    setTaiwan(result.結果.已做問卷結果.工作價值觀2版.台灣職位)
                } else {
                    setActiveStep(0)
                }
                //console.log(result);
            }
        })
    }, [])
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
                                                <Typography variant='body1'>  以下題目中，哪些是您認同的工作價值，請依「沒有價值」、「有些價值」、「很有價值」、「超有價值」之價值等級，給予適切評等。</Typography>
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
                                                <Grid item>1</Grid>
                                                <Grid item>2</Grid>
                                                <Grid item>3</Grid>
                                                <Grid item>4</Grid>
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

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>A</Typography> </Grid>
                                                            <Grid item xs={4} > 成就導向(Achievement) </Grid>
                                                            <Grid item xs={7} > 能夠發揮本身專長完成工作並獲得成就與肯定</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>I</Typography> </Grid>
                                                            <Grid item xs={4} > 獨立自主(Independence)</Grid>
                                                            <Grid item xs={7} > 能夠獨立自主工作並在責任範圍內自主決策</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>Rc</Typography> </Grid>
                                                            <Grid item xs={4} > 認同肯定(Recognition) </Grid>
                                                            <Grid item xs={7} > 能夠在工作上被認同肯定而且有升遷機會</Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>R</Typography> </Grid>
                                                            <Grid item xs={4} > 友善關係(Relationships)</Grid>
                                                            <Grid item xs={7} > 能夠在互助合作之友善工作環境中工作 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>S</Typography> </Grid>
                                                            <Grid item xs={4} > 上級支持(Support)</Grid>
                                                            <Grid item xs={7} > 公司與上級主管能提供工作上的協助與支援 </Grid>

                                                            <Grid item xs={1} > <Typography variant='body1' color='secondary'>W</Typography> </Grid>
                                                            <Grid item xs={4} > 工作條件(Working Conditions) </Grid>
                                                            <Grid item xs={7} > 公司制度良好並能提供穩定的工作保障 </Grid>
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
                                                                    <Grid container xs={12} spacing={1}>
                                                                        <Grid item xs={12} > <Typography variant='body1' color='secondary'>{`${result.名稱} - ${result.分數}`}</Typography> </Grid>
                                                                        <Grid item xs={12}  >{result.描述}</Grid>
                                                                        {result['細項'].map(detailValue =>
                                                                            <>
                                                                                <Grid item xs={12}> <Typography variant='subtitle2' color='secondary'>{`- ${detailValue['名稱']}-${detailValue['分數']}`}</Typography> </Grid>
                                                                                <Grid item xs={12}>{detailValue['描述']}</Grid>
                                                                            </>
                                                                        )}
                                                                    </Grid>
                                                                    <Divider style={{ marginTop: 10, marginBottom: 10 }}></Divider>
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
    )
}
//tabs的時候 載入資料 透過context往下傳
export const SurveyData = React.createContext(null);//宣告Context
export default function ManageSurvey() {
    const classes = useStyles();
    let [Data, setData] = useState(null);
    let { path, url } = useRouteMatch();
    let history = useHistory()
    const [value, setValue] = React.useState(0); //tabs
    const handleChange = (event, newValue) => {
        //console.log(newValue);
        setValue(newValue);
    };//tabs
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
                            <Tab label="人格特質" component={Link} to={`${url}/測評04`} />
                            <Tab label="工作價值觀" component={Link} to={`${url}/測評05`} />

                        </Tabs>
                    </Paper>
                </Box>

                <Switch>

                    <Route path={`${path}/測評04`} component={WorkStyle} />
                    <Route path={`${path}/測評05`} component={WorkValue2} />
                </Switch>
            </SurveyData.Provider>
        </>



    )
}