import React, { useState } from 'react';
import Styles from './header.module.css'
import logo from '../../common/logo/logo_transparent.png'
import User from '../user/user';
import { useHistory } from 'react-router';

const Header = ({ firebaseAuth, userId }) => {
    const [userClick, setUserClick] = useState(false);
    console.log(`header: ${userId}`)

    const history = useHistory();

    const onClickLogo = () => {
        history.push({
            pathname:'/main',
            state:{
                id: userId
            }})
    } 

    const clickUserBtn =
        () => {
            userClick=== true ? setUserClick(false) : setUserClick(true);
    };

    const movePage = (event) => {
        history.push({
            pathname:`${event.currentTarget.name}`,
            state: {
                id: userId
            }
        })
    }

    //멀쩡하던 userId가 갑자기 왜 undefined으로?
    // 로그인 직후까진 괜찮은데,
    // 페이지 옮기자마자 그 로그인 정보가 사라짐.
    console.log(`header: ${userId}`)


    return(
        <header className={Styles.header}>
            <img className={Styles.logo} onClick={onClickLogo} src={logo} alt="logo"/>
            <div className={Styles.menu}>
                <button onClick={movePage} name="popular" className={Styles.menuBtn}>인기글</button>
                <button onClick={movePage} name="board" className={Styles.boardBtn}>게시판</button>
                <button onClick={movePage} name="discuss" className={Styles.discussBtn}>토론</button>
                <button onClick={movePage} name="dish" className={Styles.dishBtn}>맛집</button>
            </div>
            <div className={Styles.userPanel}>
                    <div className={Styles.userBtns}>
                        <button 
                            className={Styles.userBtn} 
                            onClick={clickUserBtn}>
                            <i className={`fas fa-user ${Styles.userIcon}`}></i>
                            User
                        </button>
                    </div>
                    { userClick && 
                    <div className={Styles.hiddenUserPanel}>
                        <div className={Styles.user}>
                            {userClick && <User 
                                firebaseAuth={ firebaseAuth }
                            />}
                        </div>
                    </div>
                    }
            </div>

        </header>
    )
}


export default Header;