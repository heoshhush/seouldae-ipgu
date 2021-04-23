import React from 'react';
import Styles from './leftside.module.css'
import ProfileImg from './profileImg/profileImg';

const Leftside = ({firebaseAuth, proImg, displayName, updateUserProfile, imageUploader }) =>{
    
    const onClickUpdateDisplayName = () => {
        updateUserProfile(null)
    }
    
    return(
        <div className={Styles.leftSide}>
            <div className={Styles.titleAndBtn}>
                <div className={Styles.title}>안녕하세요, {displayName} 님! </div>
                <button onClick={onClickUpdateDisplayName} className={Styles.cancelBtn}>
                    <i className={`fas fa-times ${Styles.cancelIcon}`}></i>
                </button>
            </div>
            <div className={Styles.profileImg}>
                <ProfileImg 
                    proImg={proImg}
                    firebaseAuth={firebaseAuth}
                    imageUploader={imageUploader}
                />
            </div>

        </div>
    )
}
export default Leftside;