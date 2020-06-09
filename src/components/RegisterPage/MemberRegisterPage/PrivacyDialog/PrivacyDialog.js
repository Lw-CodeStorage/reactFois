import React, { useState,useEffect,useContext } from 'react';
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

    const [privacyCheck, setPrivacyCheck] = useState(false);

    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    useEffect(() => {
        setMemberRegisterData({ ...memberRegisterData, privacyCheck: privacyCheck })
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open,privacyCheck]);


    return (
        <div>
            <FormControlLabel
                control={<Checkbox color="primary" checked={privacyCheck} onChange={() => { setPrivacyCheck(false); handleClickOpen() }} name="checkedA" />}
                label="同意 隱私政策"
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
                        <div>
                            <p>
                                為維護個人隱私權，讓您瞭解我們收集個人資料之目的、類別、利用範圍及方式、以及您所得行使之權利等事項，請細心閱讀以下各項說明。
                                如果您對於FOIS的隱私權政策、以下相關告知事項、或與個人資料保護有關之相關事項有任何疑問，可以至「聯絡我們」留言詢問，我們將儘快回覆說明。
                            </p>
                            <h5 >適用範圍</h5>
                            <p>
                                我們隱私權政策及其所包含之告知事項，僅適用於我們所擁有及經營的網站。
                            </p>
                            <h5 >資料收集</h5>
                            <p>
                                在您註冊FOIS帳號、使用FOIS服務、瀏覽FOIS平台網頁或社群網站時，我們會蒐集您的使用資料，也可能會紀錄您電腦和瀏覽器上的資料，進而判斷一些基本設定(例如使網頁或系統語系)，或為您顯示某些適合您的服務。
                                資料收集包括以下項目：
                            </p>
                            <ul >

                                <li >
                                    姓名與聯絡人資料：我們會收集您的姓名、電子郵箱地址、電話等個人資訊。
                                    </li>
                                <li >
                                    公司資料：註冊帳號時，我們會詢問您公司名稱、地址、電話及其他相關資料。
                                    </li>
                                <li >
                                    密碼、密碼提示、用於驗證的或帳戶存取的安全資訊。
                                    </li>
                                <li >
                                    統計資料：例如您的性別、年齡…等。
                                    </li>
                                <li >
                                    付款資料：當您選擇FOIS付費方案時，我們會收集您付款所需的資料，例如信用卡號，以及付款相關的安全認證資料(例如安全認證碼)。
                                    </li>
                                <li >
                                    使用資料：我們收集您如何與我們的服務進行互動的相關資料，包括您使用的功能、瀏覽的紀錄，以及您輸入的搜尋項目。另外也包括與您的裝置和您用來連接我們的服務相關的資料。
                                    </li>
                                <li >
                                    訊息的文字或內容：當您與我們聯絡時，我們會保留通訊紀錄，您可以自由選擇是否提供個人資料給我們。
                                    </li>
                                <li >
                                    個資保護措施：為防止非法入侵FOIS網站資料庫系統，我們已裝設防火牆系統，且擁有SSL標章，並有專人負責資料庫之管理及維護工作。 您填寫的資料及欄位，已經過特殊的編碼，再轉存入資料庫；資料解碼過程無法在非FOIS系統上執行。
                                    </li>

                            </ul>
                            <h5 >守法義務</h5>
                            <p>
                                您承諾絕不為任何非法目的或以任何非法方式使用FOIS服務，並承諾遵守台灣相關法規及一切使用網際網路之國際慣例。您若係台灣以外之使用者，並同意遵守所屬國家或地域之法令。
                                您同意並保證不得利用FOIS從事侵害他人權益或違法之行為，包括但不限於：
                            </p>
                            <ul>

                                <li >
                                    上傳、張貼、公布或傳送任何誹謗、侮辱、具威脅性、攻擊性、不雅、猥褻、不實、違反公共秩序或善良風俗或其他不法之文字、圖片或任何形式的檔案於FOIS服務上。
                                    </li>
                                <li >
                                    侵害或毀損FOIS或他人名譽、隱私權、營業秘密、商標權、著作權、專利權、其他智慧財產權及其他權利。
                                     </li>
                                <li>
                                    違反依法律或契約所應負之保密義務。
                                    </li>
                                <li >
                                    冒用他人名義使用FOIS服務。
                                    </li>
                                <li >
                                    上載、張貼、傳輸或散佈電腦病毒。
                                    </li>
                                <li >
                                    從事未經FOIS事前授權的商業行為、張貼不實之訊息。
                                    </li>
                                <li>
                                    其他FOIS有正當理由認為不適當之行為。
                                     </li>

                            </ul>
                            <h5>資訊安全</h5>
                            <p>
                                FOIS採取合理、符合法規的防護措施，防止資料受到存取、竄改、複製或洩漏等惡意行為。此外，我們也將定期進行實體的安全檢查，以防止儲存資料的系統遭到入侵。
                             </p>
                            <h5 >隱私政策變更</h5>
                            <p>
                                隨著環境改變，FOIS將會不定時變更隱私權政策的內容。使用者若對於FOIS隱私權政策或個人資料的保護有任何疑問，敬請透過聯絡我們詢問我們。
                            </p>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" onClick={() => { setPrivacyCheck(true); handleClose() }}>
                        同意隱私政策
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

