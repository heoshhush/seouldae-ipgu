import React, { useCallback, useState } from 'react';
import Styles from './header.module.css'
import logo from '../../common/logo/logo_transparent.png'
import User from '../user/user';

const Header = ({ firebaseAuth }) => {
    const [userClick, setUserClick] = useState(false);
    
    const clickUserBtn = useCallback(
        () => {
            // if(userClick=== false){
            //     setUserClick(true);
            // } else if(userClick=== true){
            //     setUserClick(false);
            // }
            userClick=== true ? setUserClick(false) : setUserClick(true);
    }
    );


    return(
        <header className={Styles.header}>
            <img className={Styles.logo} src={logo} alt="logo"/>
            <div className={Styles.menu}>
                <button className={Styles.menuBtn}>인기글</button>
                <button className={Styles.boardBtn}>게시판</button>
                <button className={Styles.dishBtn}>맛집</button>
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