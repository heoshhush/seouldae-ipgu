import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
import Styles from './login.module.css';
import logo from '../../common/logo/logo_transparent.png'
import Footer from '../footer/footer';

const Login = ({ firebaseAuth }) => {

    const aboutRef = useRef();
    const history = useHistory();

    const onClick = (event) => {
        const provider = firebaseAuth.getProvider(event.currentTarget.textContent);
        firebaseAuth.login(provider);
    }

    useEffect(() => {
        firebaseAuth.authChanged(user => {
            if(user){
                history.push({
                    pathname:"/main",
                    state:{
                        id:user.uid
                    }
                })
            }
        }) 
    }
    , [history, firebaseAuth])

    aboutRef&&console.dir(aboutRef.current)


    return(
        <div className={Styles.container}>
                
                    <div className={Styles.loginHeader}>
                        <img className={Styles.logo} src={logo} alt="logo"/>
                        <div className={Styles.headerBtns}>
                            <button className={Styles.headerAboutBtn}>About</button>
                        </div>
                    </div>
                    <div className={Styles.innerContainer}>
                        <div className={Styles.title}>
                            서울대입구에 산다면,
                        </div>
                        <section className={Styles.login}>
                            <div className={Styles.loginTitle}>Login With</div>
                            <div className={Styles.loginBtns}>
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
                        <div ref={aboutRef} className={Styles.aboutPageTitle}>About</div>
                    </div>

            <Footer />
        </div>
    )
}

export default Login;