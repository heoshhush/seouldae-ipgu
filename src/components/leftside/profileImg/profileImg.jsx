import React, { useEffect, useRef, useState } from 'react';
import Styles from './profileImg.module.css';

const ProfileImg = ({ firebaseAuth, imageUploader }) => {
    const [profileImg, setProfileImg] = useState(firebaseAuth.getUser() && firebaseAuth.getUser.photoURL)
    const inputRef = useRef();

    const onFileUpload = async (event) => {
        const files = event.target.files[0];
        const uploaded = await imageUploader.upload(files);
        firebaseAuth.updateUser({
            photoURL:uploaded.url
        })
        setProfileImg(uploaded.url);
    }

    const onClick = () => {
        inputRef.current.click();
    }

    useEffect(() => {
        firebaseAuth.authChanged((user) => {
            setProfileImg(user.photoURL)
        })
    },[])

    return (
        <div className={Styles.container}>
            <img className={Styles.profileImg} src={profileImg} alt=""/>
            <button onClick={onClick} className={Styles.uploadProImgBtn}>
                <input 
                onChange={onFileUpload}
                className={Styles.imgInput} ref={inputRef} type="file"/>
                프로필 이미지 설정
            </button>
        </div>
    )
}

export default ProfileImg;