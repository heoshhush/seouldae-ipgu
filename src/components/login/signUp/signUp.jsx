import React, { useEffect, useRef } from 'react';
import Styles from './signUp.module.css';

const SignUp = ({ onClickCancel, firebaseAuth }) => {
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
           return alert('패스워드가 일치하지 않습니다')
        } else if (pwVal.length < 6){
            return alert('패스워드는 6자 이상이어야합니다')
        } else if (!emailVal.includes('@') || !emailVal.includes('.')){
            return alert('올바른 이메일 형식이 아닙니다')
        }
        

        firebaseAuth.signUp(emailVal, pwVal)
    }

    return (
        <div className={Styles.container}>
            <div className={Styles.cancel}>
                <button 
                    onClick={onClickCancelBtn}
                    className={Styles.cancelBtn}>
                    취소
                </button>
            </div>
            <div className={Styles.title}>회원가입</div>
            <form className={Styles.signForm}>
                이메일 <input ref={emailRef} type="text"/>
                비밀번호 <input ref={pwRef} type="password" />
                비밀번호 확인 <input ref={pw2Ref} type="password" />
                <button
                onClick={onClickComplete}>
                    가입 완료
                </button>
            </form>
        </div>
    )
}

export default SignUp;