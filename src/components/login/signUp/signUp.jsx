import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Styles from './signUp.module.css';

const SignUp = ({ onClickCancel, firebaseAuth }) => {
    // const [completeSignUp, setCompleteSignUp] = useState(false);
    const emailRef = useRef();
    const pwRef = useRef();
    const pw2Ref = useRef();
    const onClickCancelBtn = () => {
        onClickCancel();
    }

    const onClickComplete = (event) => {
        event.preventDefault();
        const emailVal = emailRef.current.value;
        const pwVal = pwRef.current.value;
        const pw2Val = pw2Ref.current.value;
        if(pwVal !== pw2Val){
           pw2Ref.current.focus();
           return alert('패스워드가 일치하지 않습니다')
        } else{
            firebaseAuth.signUp(emailVal, pwVal)
        }
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.cancel}>
                <button 
                    onClick={onClickCancelBtn}
                    className={Styles.cancelBtn}>
                    <i className={`fas fa-times ${Styles.cancelIcon}`}></i>
                </button>
            </div>
            <div className={Styles.title}>회원가입</div>
            <form className={Styles.signForm}>
                이메일 <input className={Styles.email} ref={emailRef} type="text"/>
                비밀번호 <input className={Styles.pw} ref={pwRef} type="password" />
                비밀번호 확인 <input className={Styles.pwConfirm} ref={pw2Ref} type="password" />
                
                <div className={Styles.complete}>
                    <button
                    className={Styles.completeBtn}
                    onClick={onClickComplete}>
                        가입 완료
                    </button>
                </div>
            </form>

            {/* {completeSignUp && 
            <div className={Styles.completeMessageBg}>
                <div className={Styles.completeMessage}>
                    <p>가입이 완료되었습니다!</p>
                    잠시 후 페이지를 이동합니다.
                </div>
            </div>
            } */}
        </div>
    )
}

export default SignUp;