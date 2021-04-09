import React, { useState } from 'react';
import Styles from './header.module.css'
import logo from '../../common/logo/logo_transparent.png'
import User from '../user/user';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Header = ({ firebaseAuth, userId, displayName }) => {
    const [userClick, setUserClick] = useState(false);
    console.log(`header: ${userId}`)
    console.log(`header displayName : ${displayName}`)

    const history = useHistory();

    const onClickLogo = () => {
        history.push({
            pathname:'/main',
            state:{
                id: userId,
                displayName: displayName
            }})
    } 

    const clickUserBtn =
        () => {
            userClick=== true ? setUserClick(false) : setUserClick(true);
    };

    const movePage = (event) => {
        history.push({
            pathname:`/${event.currentTarget.name}`,
            state: {
                id: userId,
                displayName: displayName,
            }
        })
    }
    


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