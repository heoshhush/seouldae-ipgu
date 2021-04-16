import React, { useEffect, useState } from 'react';
import Styles from './header.module.css'
import logo from '../../common/logo/logo_transparent.png'
import User from '../user/user';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Header = ({ firebaseAuth, userId, displayName, getMainUserId, getMainDisplayName }) => {
    const [userClick, setUserClick] = useState(false);
    const history = useHistory();

    const [headerUserId, setUserId] = useState(userId);
    const [headerDisplayName, setDisplayName] = useState(displayName);

    console.log(`header: ${headerUserId}`)
    console.log(`headerdisplayName : ${headerDisplayName}`)
    console.log(`in header, displayName props : ${displayName}`)

    console.log(firebaseAuth.getUserInfo())

    useEffect(() => {
        if(!userId){
        firebaseAuth.authChanged(
            user => {
                setUserId(user.uid)
                setDisplayName(user.displayName)
            }
        )
    }
    }, [])


    const onClickLogo = () => {
        history.push({
            pathname:'/main',
            state:{
                id: headerUserId,
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
                id: headerUserId,
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