import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import Styles from './settingUserInfo.module.css'

const SettingUserInfo = ({ updateUserProfile, userId, displayName }) => {
    const history = useHistory();
    const inputRef= useRef();
    const warnRef= useRef();


    const onClick = (event) => {
        event.preventDefault();
        const value = inputRef.current.value;
   
        if(value.length < 2){
            warnRef.current.innerText = '닉네임은 2글자 이상이어야합니다'
        } else if(value.legth > 8){
            warnRef.current.innerText = '닉네임은 8글자 이하여야합니다'
        } else if(value.includes(' ')){
            warnRef.current.innerText = '닉네임은 공백을 포함할 수 없습니다'
        }
        
        
        else {
        updateUserProfile(value);
        }
        // history.push({
        //     pathname:'/main',
        //     state: {
        //     id: userId,
        //     displayName: displayName
        //     }
        // })
    }


    return(
        <div className={Styles.setUserNameBg}>
            <div className={Styles.setUserName}>
                <div className={Styles.title}>
                    <div className={Styles.titleFirst}>환영합니다 </div>
                    <div className={Styles.titleSecond}>먼저, 닉네임을 설정해주세요!</div>
                </div>
                <form className={Styles.userInfoInputs}>
                    <input ref={inputRef} className={Styles.displayNameInput} type="text"/>
                    <div ref={warnRef} className={Styles.warn}></div>
                    <button onClick={onClick} className={Styles.displayNameSubmit}>이걸로 할게요!</button>
                </form>
            </div>
        </div>  
    )
};

export default SettingUserInfo;