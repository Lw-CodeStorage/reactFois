import React, { useState,useContext,useEffect } from 'react';
import { MemberRegisterData } from '../MemberRegisterPage'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControlLabel, Checkbox } from '@material-ui/core';

export default function ScrollDialog() {
    let [memberRegisterData, setMemberRegisterData] = useContext(MemberRegisterData);

    const [serviceCheck, setServiceCheck] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen =  () => {
        setOpen(true);
    };

    const handleClose = () => {
        setMemberRegisterData({...memberRegisterData,serviceCheck:serviceCheck})
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    
    useEffect(() => {
        setMemberRegisterData({ ...memberRegisterData, serviceCheck: serviceCheck })
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open,serviceCheck]);


    return (
        <div>
            <FormControlLabel
                control={<Checkbox color="primary" checked={serviceCheck} onChange={() => { setServiceCheck(false); handleClickOpen()}} name="checkedA" />}
                label="同意 服務條款"
            />
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <h5>授權內容</h5>
                        <p> 當您使用本平台服務(以下簡稱「FOIS」)，即表示您已閱讀、瞭解並同意FOIS服務條款之所有內容。
                        本平台有權於任何時間修改或變更FOIS服務條款之內容，建議您隨時注意該等修改或變更。
                        您於任何修改或變更後繼續使用FOIS，即視為您已閱讀、瞭解並同意接受該等變更。
                        若不同意上述服務條款修訂方式，或不接受本服務條款任一規定，您應立即停用FOIS服務。</p>
                        <h5>註冊義務</h5>
                        <ul >
                            <li >
                                依FOIS註冊表之提示提供您本人正確、最新及完整的資料。
                                </li>
                            <li >
                                維護並更新您個人資料，確保其為正確、最新及完整。
                            </li>
                            <li >
                                若您提供任何錯誤或不實的資料，本平台有權暫停或終止您的帳號，並停止您使用FOIS之全部或部分服務。
                            </li>
                        </ul>
                        <h5 >隱私政策</h5>

                        <p>
                            關於您的會員註冊以及其他特定資料依FOIS「隱私權政策」受到保護與規範。
                            當您使用本服務時，您同意FOIS依據「隱私權政策」進行個人資料的蒐集與利用。
                            </p>
                        <h5>資訊安全</h5>
                        <p>
                            完成FOIS註冊程序之後，您將收到一組密碼及帳號。維持密碼及帳號的機密安全，是您的責任。由於網際網路資料的傳輸特性，本平台絕不會在未經同意的電話或電子郵件中詢問您的密碼。
                            您並同意以下事項：
                        </p>
                        <ul>
                            <li>
                                您的密碼或帳號遭到盜用或有其他任何安全問題發生時，您將立即通知本平台管理者，且每次連線完畢，均結束您的帳號使用。
                            </li>
                            <li>
                                您的帳號、密碼及會員權益僅供您本人使用及享有，不得轉借、轉讓他人或與他人使用任何依照規定方法輸入您帳號及密碼與登入資料一致時，無論是否由本人親自輸入，均將推定為您本人所使用。利用該密碼及帳號所進行的一切行動，您本人應負完全責任。
                            </li>
                        </ul>
                        <div>
                            <h5>守法義務</h5>
                            <p>
                                您承諾絕不為任何非法目的或以任何非法方式使用FOIS服務，並承諾遵守台灣相關法規及一切使用網際網路之國際慣例。您若係台灣以外之使用者，並同意遵守所屬國家或地域之法令。
                                您同意並保證不得利用FOIS從事侵害他人權益或違法之行為，包括但不限於：
                            </p>
                            <ul>

                                <li>
                                    上傳、張貼、公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案於FOIS服務。</li>
                                <li >
                                    侵害或毀損FOIS或他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利。</li>
                                <li>
                                    違反依法律或契約所應負之保密義務。 </li>
                                <li >
                                    冒用他人名義使用FOIS服務。</li>
                                <li >
                                    上載、張貼、傳輸或散佈電腦病毒。 </li>
                                <li >
                                    從事未經FOIS事前授權的商業行為、張貼不實之訊息。</li>
                                <li >
                                    濫發垃圾郵件、廣告郵件、連鎖信、違法之多層次傳銷訊息及廣告等。 </li>
                                <li >
                                    其他FOIS有正當理由認為不適當之行為。 </li>

                            </ul>
                            <h5 >服務中止</h5>
                            <p>
                                FOIS於以下各項情況時，有權可以停止或中斷提供服務：
                            </p>
                            <ul >
                                <li >
                                    FOIS網站電子通信設備進行必要之保養及施工。
                                     </li>
                                <li >
                                    發生突發性之電子通信設備故障。
                                    </li>
                                <li>
                                    FOIS網站申請之電子通信服務被停止，無法提供服務。
                                     </li>
                                <li >
                                    由於天災等不可抗力之因素，或其他不可歸責於FOIS致使網站無法提供服務。
                                     </li>
                                <li >
                                    您於使用本服務時宜自行採取防護措施。本公司平台對於您因使用（或無法使用）FOIS而造成的損害，不負任何賠償責任。
                                     </li>
                            </ul>
                            <h5 >服務變更</h5>
                            <p>
                                您同意本公司保留可隨時修改或中斷，暫停或永久終止FOIS服務 (或服務的任何部分) 之權利。如依法或其他相關規定須為通知時，您同意本公司得選擇最適方式告知您。
                            </p>
                            <h5 >收費方式</h5>
                            <ul >

                                <li >
                                    本服務收費標準公告於本公司官方網站，當您申請本服務時，本公司將以網頁公告費率計收。本公司有權調整費率，費率如有調整時，應自調整之日起按新費率計收。
                                     </li>
                                <li >
                                    使用期間內您可隨時停止使用服務，然FOIS屬雲端服務，不提供退款服務，亦不得要求照比例計算退款。您可以隨時連絡我們取消服務之後續續約，然已繳款的期間無法退費。
                                     </li>
                                <li>
                                    本公司在您申請本服務後，將依與您約定繳費方式向您收取費用。本公司有權調整費率，費率如有調整時，應自調整之日起按新費率計收。
                                     </li>

                            </ul>
                            <h5 >授權內容</h5>
                            <p>
                                對於會員上載、傳送、輸入或提供之資料，您同意FOIS網站得於合理之範圍內蒐集、處理、保存、傳遞及使用該等資料， 以提供使用者其他資訊或服務、或作成會員統計資料、或進行關於網路行為之調查或研究，或為任何之合法使用。
                                若您無合法權利得授權他人使用、修改、重製、公開播送、改作、散布、發行、公開發表某資料，並將前述權利轉授權第三人，請勿擅自將該資料上載、傳送、輸入或提供至FOIS。
                                任何資料一經會員上載、傳送、輸入或提供至FOIS時，視為會員已允FOIS無條件使用、修改、重製、公開播送、改作、散布、發行、公開發表該等資料，並得將前述權利轉授權他人。
                                您並應保證FOIS使用、修改、重製、公開播送、改作、散布、發行、公開發表、轉授權該等資料，不致侵害任何第三人之智慧財產權。
                            </p>
                            <h5>智財保護</h5>
                            <p>
                                FOIS所使用之軟體或程式、網站上所有內容，包括但不限於著作、圖片、檔案、資訊、資料、網站架構、網站畫面的安排、網頁設計、會員內容等， 均由FOIS或其他權利人依法擁有其智慧財產權，包括但不限於商標權、專利權、著作權、營業秘密與專有技術等。
                                任何人不得逕自使用、修改、重製、公開播送、公開傳輸、公開演出、改作、散布、發行、公開發表、進行還原工程、解編或反向組譯。
                                若您欲引用或轉載前述軟體、程式或網站內容， 除明確為法律所許可者外，必須依法取得本公司或其他權利人的事前書面同意。
                            </p>
                            <h5 >終止服務</h5>
                            <p>
                                您同意本公司得依其判斷因任何安全之考量，包含但不限於帳號於一定期間內無活動、無法預期之技術或安全因素或問題、您所為詐欺或違法行為、未依約支付費用，或其他本公司認為您已經違反FOIS條款的明文規定及精神，於通知或未通知的情況下，隨時終止或限制您使用FOIS服務或其他任何部分，並將公司與會員帳號加以移除並刪除。
                                此外，您同意若FOIS之使用被終止或限制時，本公司對您或任何第三人均不承擔責任。
                           </p>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" onClick={()=>{setServiceCheck(true); handleClose()}}>
                        同意服務條款
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
