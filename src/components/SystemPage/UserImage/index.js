import React, { useState, useEffect, useRef } from 'react';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import './UserImage.css'

export default function UserImage() {
    let [downLoadImage, setDownLoadImage] = useState('image')

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
                'key': 'memberReadResumeData',
                'JWT': state,
            })
        }).then(res => {
            return res.json()
        }).then(result => {
            console.log('downLoadImage');
            setDownLoadImage(result.結果.照片)
        }).catch(error => console.error(error))

        //dependency 為空就只effect一次，若有監聽變數可用於state改變後在觸發一次
    }, [downLoadImage])

    function imageUpload(e) {
        let cookies = document.cookie.split(';')
        let state = ''
        for (let i = 0; i < cookies.length; i++) {
          if (cookies[i].indexOf('state') >= 0) {
            state = cookies[i].split('=')[1]
          } 
        }
        let image = e.target.files[0]
        if (image) {
            let formData = new FormData()
            formData.append('key', 'userUploadFile')
            formData.append('JWT', state)
            formData.append('File_Data', image)
            formData.append('File_Name', image.name)
            formData.append('File_Type', image.name.split('.')[1])
            formData.append('Upload_Type', '照片')
            fetch('https://demo.fois.online/Fois_Class/Main.php', {
                method: 'POST',
                body: formData
            }).then(res => {
                return res.json();
            }).then(result => {
                // console.log(result);
                setDownLoadImage('重新抓取')//透過改變state去re-render 執行useEffect
            }).catch((error) => console.error('Error:', error))
        }

        console.log(image);
    }

    return (
        <div className='selfUserImageContainer'>

            <Avatar className='selfUserImage' src={`https://demo.fois.online/Fois_Class/${downLoadImage}`} >

            </Avatar>

            <div className='iconButtomContainer'>
                <IconButton
                    className='photoIcon'
                    component="label"
                    aria-label="upload picture"
                    disableRipple='true'>
                    <PhotoCamera />
                    <input
                        onChange={imageUpload}
                        type="file"
                        style={{ display: "none" }}
                        accept=".jpg,.jpeg"
                    />
                </IconButton>
            </div>
        </div>
    )

}

