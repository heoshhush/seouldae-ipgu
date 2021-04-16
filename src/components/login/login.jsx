import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import Styles from './login.module.css';
import logo from '../../common/logo/logo_transparent.png'
import Footer from '../footer/footer';
import SignUp from './signUp/signUp';
import EmailLogin from './emailLogin/emailLogin';

const Login = ({ firebaseAuth }) => {
    const [signUp, setSignUp] = useState(false);
    const [loginNow, setLoginNow] = useState(false);
    const history = useHistory();

    const onClick = (event) => {
        const provider = firebaseAuth.getProvider(event.currentTarget.textContent);
        firebaseAuth.login(provider);
    }

    const onClickSignUp = () => {
        const sign = signUp ? false : true;
        window.scrollTo(0,0)
        setSignUp(sign); 
    }

    const onClickEmailLogin = () => {
        const login = loginNow ? false : true;
        setLoginNow(login);
    }

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(user){
                history.push({
                    pathname:"/main",
                    state:{
                        id:user.uid,
                        displayName:user.displayName
                    }
                })
            }
        }) 
    }
    , [history, firebaseAuth])

    return(
        <div className={Styles.container}>
                    <div className={Styles.loginHeader}>
                        <img className={Styles.logo} src={logo} alt="logo"/>
                        <div className={Styles.headerBtns}>
                            <button 
                                onClick={onClickSignUp}
                                className={Styles.headerSignUpBtn}>
                                    회원가입
                            </button>
                            <button className={Styles.headerAboutBtn}>about</button>
                        </div>
                    </div>
                    <div className={Styles.innerContainer}>
                        <div className={Styles.title}>
                            서울대입구에 산다면,
                        </div>
                        <section className={Styles.login}>
                            <div className={Styles.loginTitle}>Login With</div>
                            <div className={Styles.loginBtns}>
                                <button onClick={onClickEmailLogin} className={Styles.googleLogin}>
                                    Email 
                                    <i className={`fas fa-envelope-square ${Styles.googleIcon}`}></i>
                                </button>
                                <button onClick={onClick} className={Styles.googleLogin}>
                                    Google
                                    <i className={`fab fa-google ${Styles.googleIcon}`}></i>
                                </button>
                                <button onClick={onClick} className={Styles.githubLogin}>
                                    Github
                                    <i className={`fab fa-github ${Styles.githubIcon}`}></i>
                                </button>
                            </div>
    
                        </section>
                     </div>
                    <div className={Styles.aboutPage}>
                        <div className={Styles.aboutPageTitle}>About</div>
                    </div>
            <Footer />

            {signUp && 
            <div className={Styles.signUpBg}>
                <div className={Styles.signUp}>
                    <SignUp 
                        onClickCancel={onClickSignUp}
                        firebaseAuth={firebaseAuth}
                    />
                </div>
            </div>
            }
            

            {loginNow && 
                <div className={Styles.emailLoginBg}>
                    <div className={Styles.emailLogin}>
                        <EmailLogin 
                            onClickCancel={onClickEmailLogin}
                            firebaseAuth={firebaseAuth}
                        />
                    </div>
                </div>
            }

        </div>
    )
}

export default Login;