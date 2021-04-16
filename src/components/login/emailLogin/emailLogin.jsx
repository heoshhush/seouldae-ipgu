import React, { useRef } from 'react';
import Styles from './emailLogin.module.css';

const EmailLogin = ({ onClickCancel, firebaseAuth }) => {
    const emailRef = useRef();
    const pwRef = useRef();
    const onClickCancelBtn = () => {
        onClickCancel();
    }

    const onClickComplete = (event) => {
        event.preventDefault();
        const emailVal = emailRef.current.value;
        const pwVal = pwRef.current.value;
        firebaseAuth.signInWithEmail(emailVal, pwVal, (error) => alert(error))
    }

    return(
        <div className={Styles.container}>
            <div className={Styles.cancel}>
                <button 
                    onClick={onClickCancelBtn}
                    className={Styles.cancelBtn}>
                    <i className={`fas fa-times ${Styles.cancelIcon}`}></i>
                </button>
            </div>
            <div className={Styles.title}>로그인</div>
            <form className={Styles.signForm}>
                이메일 <input className={Styles.email} ref={emailRef} type="text"/>
                비밀번호 <input className={Styles.pw} ref={pwRef} type="password" />
                
                <div className={Styles.complete}>
                    <button
                    className={Styles.completeBtn}
                    onClick={onClickComplete}>
                        로그인 완료
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EmailLogin;